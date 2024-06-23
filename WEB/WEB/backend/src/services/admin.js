const Sirv = require("../functions/Sirv");
const User = require("../schemas/user");
const Car = require("../schemas/car");
const News = require("../schemas/news");
const utilities = require("../functions/utils");
const firebase = require("../functions/firebase");
const CryptoJS = require("crypto-js");
const { Buffer } = require("buffer");
const LiveDiagnostics = require("../schemas/liveDiagnostics");

// var mqtt = require("mqtt");
// var broker = process.env.MQTTBROKER;
// var port = process.env.MQTTPORT;
// var clientId = process.env.MQTTCLIENTID;
// var username = process.env.MQTTUSERNAME;
// var password = process.env.MQTTPASSWORD;
// var topic = process.env.MQTTTOPIC;


//     // Create a client instance
//     var client = mqtt.connect(broker, {
//       port: port,
//       clientId: clientId,
//       username: username,
//       password: password,
//     });

//     // Set callback handlers
//     client.on("connect", function () {
//       console.log("Connected to MQTT broker");
//       // Subscribe to the diagnostic topic
//       client.subscribe(topic);
//     });

//     client.on("message", function (topic, message) {
//       // message is Buffer
//       console.log(
//         "Message received on topic " + topic + ": " + message.toString()
//       );
//       var data = [];
//       const messageString = message.toString();
//       const dataString = messageString.split(";");
//       dataString.forEach((element) => {
//         data.push(element);
//       });
//       var headers = {
//         email: data[0],
//         carId: data[1],
//         diagnostic: data[2],
//       };
//       console.log(headers);
//       // Handle incoming message here
//     });

//     client.on("error", function (err) {
//       console.error("Error:", err);
//     });


const signupProcess = async ({ name, email, password, role, permission }) => {
  if (!name || !email || !password || !role || !permission) {
    return "All fields are required!";
  }
  if (await User.findOne({ where: { email } })) {
    console.error("Email already Taken");
    return "Account Already Exist";
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters!");
    return "Password must be at least 8 characters!";
  }
  if (role !== "admin" && role !== "user" && role !== "member") {
    console.error("Role does not exist!");
    return "Role does not exist!";
  }
  if (permission.length === 0 || !permission) {
    console.error("Permission is required!");
    return "Permission is required!";
  }
  return null;
};

const adminServices = {
  addMember: async ({ name, email, password, role, permission }) => {
    const validationError = await signupProcess({
      name,
      email,
      password,
      role,
      permission,
    });
    if (validationError) {
      return validationError;
      // throw new Error(validationError);
    }
    password = await utilities.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    if (!user) {
      return "Failed to create user!";
    }
    await user.setPermissions(permission);
    // mailer.handleSignup(user.email)
    returnData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    return returnData;
  },
  // Function to get Live Diagnostics   Still in progress
  getDiagnostics: async () => {
    // const data = [];

    // // Create a client instance
    // var client = mqtt.connect(broker, {
    //   port: port,
    //   clientId: clientId,
    //   username: username,
    //   password: password,
    // });

    // // Set callback handlers
    // client.on("connect", function () {
    //   console.log("Connected to MQTT broker");
    //   // Subscribe to the diagnostic topic
    //   client.subscribe(topic);
    // });

    // client.on("message", function (topic, message) {
    //   // message is Buffer
    //   console.log(
    //     "Message received on topic " + topic + ": " + message.toString()
    //   );
    //   const messageString = message.toString();
    //   const dataString = messageString.split(",");
    //   dataString.forEach((element) => {
    //     data.push(element);
    //   });
    //   var headers = {
    //     email: data[0],
    //     carId: data[1],
    //     diagnostic: data[2],
    //   };
    //   console.log(headers);
    //   // Handle incoming message here
    // });

    // client.on("error", function (err) {
    //   console.error("Error:", err);
    // });

    const diag = await LiveDiagnostics.findAll();
    if (!diag || diag.length === 0) {
      return "No diagnostics exists!";
    }
    return diag;
  },

  // Function to upload Car Hex Files
  addCarUpdate: async ({ file, part, car }) => {
    try {
      const existCar = await Car.findOne({
        where: {
          maker: car.maker,
          model: car.model,
          year: car.year,
        },
      });
      // console.log(existCar);
      if (!existCar) {
        return "Car not found";
      }
      if (!file) {
        return "No file uploaded.";
      }
      const binaryData = Buffer.from(file.buffer, "hex");
      const base64Data = binaryData.toString("base64");
      // existCar.hex.push(file.buffer);
      existCar.hex = base64Data;

      await existCar.save();


      const fileData = []
      console.log(binaryData.toString())
      await fileData.push(binaryData.toString().split("\r\n"))
      console.log({"fileData Before":fileData[0]})
      var fileLines = fileData[0].join("\r\n")
      console.log({"fileLines":fileLines})
      console.log(fileLines)
      console.log(fileData[0].length)
      var EncryptedLines = []

      fileData[0].forEach((line)=>{
        var ciphertext = CryptoJS.AES.encrypt(
          line,
          process.env.SECURITY_KEY
        ).toString();
        EncryptedLines.push(ciphertext)
      })

      console.log({"EncryptedLines":EncryptedLines})
      var EncryptedLinesString = EncryptedLines.join("\r\n")
      console.log(EncryptedLinesString)

      // console.log(car);
      // await existCar.save();
      // console.log(existCar.hex.length);

      // console.log(base64Data);
      // console.log({ hex: binaryData });
      // console.log({ "base64Data:": base64Data });
      // function hexToBinary(hexData) {
      // const binaryData2 = Buffer.from(base64Data, 'base64');
      // console.log({"binaryData2": binaryData2})
        // return binaryData;
      // }

      // // Encrypt
      // var ciphertext = CryptoJS.AES.encrypt(
      //   base64Data,
      //   process.env.SECURITY_KEY
      // ).toString();
      // console.log({ Ciphertext: ciphertext });
      // const binaryEncryptedData = Buffer.from(ciphertext, 'base64');
      // console.log({"binaryEncryptedData":binaryEncryptedData})

      // // Decrypt
      // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
      // var originalText = bytes.toString(CryptoJS.enc.Utf8);

      // console.log({"OriginalText":originalText}); // 'my message'
      // // console.log(ciphertext);

       await firebase.uploadCarUpdate_Storage(existCar.maker, existCar.model, existCar.year, existCar.hex.length, EncryptedLinesString);
       await firebase.uploadCarUpdate_RealtimeDB(existCar.maker, existCar.model, existCar.year,part);

      return existCar;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  // Function to upload News
  addNews: async ({ news, image }) => {
    if (!news) {
      return "All fields are required!";
    }
    if (!image || image.length === 0) {
      return "No image uploaded.";
    }
    const imageURL = await Sirv.uploadImage(image.buffer);
    console.log(imageURL);
    const CreatedNews = await News.create({
      news: news,
      image: imageURL,
    });
    // console.log(news);
    return CreatedNews;
  },
  // Function to delete Member
  deleteMember: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return "User not found";
    }
    await user.destroy();
    return "User deleted successfully";
  },
};

module.exports = adminServices;
