const express = require("express");
const Car = require("../models/car");
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../models/user");
const router = new express.Router();

router.get("/cars/make", async (req, res) => {
  try {
    const cars =  await Car.distinct("maker").sort();
    //   console.log(cars);
    res.send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
});
// router.get("/cars/model", async (req,res) =>{
//   try {
//     const cars = await  Car.distinct("model").sort()
//     res.send(cars)
//   } catch (error) {
//     res.status(500).send();
//   }
// })

router.post("/cars/model", async (req, res) => {
  try {
    const cars = await Car.find({ maker: req.body.maker })
      .distinct("model")
      .sort();
    // console.log(cars);
    res.send(cars);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/cars/year", async (req, res) => {
  try {
    const cars = await Car.find({
      maker: req.body.maker,
      model: req.body.model,
    })
      .distinct("year")
      .sort();
    // console.log(cars);
    res.send(cars);
  } catch (error) {
    res.status(500).send();
  }
});

// const upload  = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.hex$/)){
//             return cb(new Error('Please upload an HEX file'))
//         }
//         cb(undefined, true)
//     }
// })

// router.post("/cars/form", async (req,res) =>{
//     try {
//         console.log({"Body": req.body});
//         const car = await Car.find({maker: req.body.maker, model: req.body.model, year: req.body.year})
//         console.log(car);
//         // cars.forEach((car) =>{
//         //     car.hex = req.file.buffer
//         //     car.save()
//         // })
//         res.send(car)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

router.post("/cars/users", async (req, res) => {
  try {
    const car = await Car.findOne({
      maker: req.body.maker,
      model: req.body.model,
      year: req.body.year,
    });
    users_id = car.owner;
    users = await User.find({ _id: users_id });
    res.send(users);

  } catch (error) {
    res.status(500).send({ "Error: ": error });
  }
});

router.get("/cars", auth, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.send(cars);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/cars/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //   const car = await Car.findById(_id)
    const car = await Car.findOne({ _id, owner: req.user._id });
    if (!car) {
      res.status(404).send({
        Message: "Car Not Found!!",
      });
    }
    res.send(car);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/cars", auth, async (req, res) => {
  const car = new Car({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch("/cars/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["model", "year", "make"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const car = await Car.findOne({ _id: req.params.id, owner: req.user._id });

    if (!car) {
      return res.status(404).send({ error: "Car not found!" });
    }
    updates.forEach((update) => {
      car[update] = req.body[update];
    });
    await car.save();
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/cars/:id", auth, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!car) {
      res.status(404).send({ error: "Car not found!" });
    }
    res.send(car);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
