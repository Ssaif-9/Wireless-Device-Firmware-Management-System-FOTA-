const express = require("express");
const User = require("../models/user");
const Car = require("../models/car");
const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');
const mailer = require("../functions/nodemailer");
const firebase = require("../functions/firebase");
const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: true }));


//              Sign Up
router.post("/users", async (req, res) => {
  try {
    // const existEmail = await User.findOne( {email:req.body.email})
    // if (existEmail){
    //   console.error("Email already Taken");
    //   throw new Error("Email already Taken")
    //   res.send({"message":"Email already Taken"})
    // }
    if( await User.findOne( {email:req.body.email} )){
      console.error("Email already Taken");
      throw new Error("Email already Taken")
    }
    if( await User.findOne( {phone:req.body.phone} )){
      console.error("Phone already exists");
      throw new Error("Phone already exists")
    }
    const user = new User(req.body);
    const userCar = await Car.findOne({
      model: req.body.model,
      maker: req.body.maker,
      year: req.body.year,
    });
    mailer.handleSignup(user.email)
    if (!userCar) {
      throw new Error("Car not found");
    }
    userCar.owner.push(user._id);
    await userCar.save();
    user.cars = userCar;
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({"Error":error.message});
  }
});

//              Login

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if(!user){
      console.error("Invalid Email or Password")
      // res.send({"message":"Invalid Email or Password"})
      throw new Error("Invalid Email or Password")
    }
    else{
      if (user.verified == false){
        const createdAt = user.createdAt.getTime()
        const currentTime = new Date().getTime()
        const timeDifferenceInMelliseconds = currentTime - createdAt
        const timeDifferenceInSeconds = timeDifferenceInMelliseconds / 1000;
        const timeDifferenceInMinutes = timeDifferenceInMelliseconds / (1000 * 60);
        const timeDifferenceInHours = timeDifferenceInMelliseconds / (1000 * 60 * 60);
        const timeDifferenceInDays = timeDifferenceInMelliseconds / (1000 * 60 * 60 * 24);
  
        if (timeDifferenceInHours < 3){
            const token = await user.generateAuthToken();
            res.send({ user, token });
          }
          else{
            // Remove the car owner field from the Car Database Then Delete User
            const userCar = user.cars
            console.log(userCar);
            userCar.forEach(async element => {
              const car = await Car.findById(element)
              console.log(car);
              console.log(car.owner);
              car.owner.pop(user._id)
              await car.save()
            });
  
            await User.findByIdAndDelete(user._id)
            res.send({"message":"User Not Found"})
            console.log({"message":"User Not Found"});
          }
      }
      else{
        const token = await user.generateAuthToken();
        res.send({ user, token });
      }
    }
  } catch (e) {
    res.status(400).send({"message":e.message});
  }
});

//             Account Verification
router.post("/users/me/verify",auth,async (req,res) =>{
  try {
    const result = await mailer.verifyCode(req.user.email, req.body.code);
    if (result){
      console.log(req.user.verified);
      req.user.verified = true;
      console.log(req.user.verified);
      await req.user.save();
      res.status(200).send({"message":"Verification successful"});
    } else {
    res.status(500).send({"message":"Invalid verification code"});
  }
} catch (error) {
    res.status(400).send(error);
  }
});

//              Log Out for one User

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//              Logout For All Users (Tokens)

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//              Get Profile

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//              Update User

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//              Delete User

router.delete("/users/me", auth, async (req, res) => {
  try {
    const userCar = req.user.cars
    console.log(userCar);
    userCar.forEach(async element => {
    const car = await Car.findById(element)
    console.log(car);
    console.log(car.owner);
    car.owner.pop(req.user._id)
    await car.save()
  });
    await User.findByIdAndDelete(req.user._id);

    // await req.user.remove()
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//           Get User Owned Cars
router.get("/users/me/cars", auth, async (req, res) => {
  try {
    userCars = req.user.cars;
    const ownedCars = [];
    for (let i = 0; i < userCars.length; i++) {
      const car = await Car.findById(userCars[i]);
      ownedCars.push(car);
    }
    console.log(ownedCars);
    res.send(ownedCars);
  } catch (error) {
    res.status(400).send(error);
  }
});







const uploadImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Please upload an Image file"));
    }
    cb(undefined, true);
  },
});

router.post("/users/me/avatar",auth,uploadImage.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

const uploadHexFile = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(hex)$/)) {
      cb(new Error("Please upload an Hex file"));
    } else {
      cb(null, true);
    }
  },
});

router.post("/admin/upload", uploadHexFile.single("hex"), async (req, res) => {
  try {
    const car = await Car.findOne({
      maker: req.body.maker,
      model: req.body.model,
      year: req.body.year,
    });

    if (!car) {
      return res.status(404).send("Car not found");
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
    const binaryData = Buffer.from(req.file.buffer, 'hex');
    const base64Data = binaryData.toString('base64');
    car.hex.push(req.file.buffer);
    // console.log(car);
    await car.save();
    console.log(car.hex.length);

    await firebase.uploadCarUpdate_Storage(car.maker, car.model, car.year, car.hex.length, base64Data);
    await firebase.uploadCarUpdate_RealtimeDB(car.maker, car.model, car.year);

    res.send(car);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: error.message });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});


module.exports = router;
