const Sirv = require("../functions/Sirv");
const User = require("../schemas/user");
const Car = require("../schemas/car");
const News = require("../schemas/news");
const utilities = require("../functions/utils");
const firebase = require("../functions/firebase");
const CryptoJS = require("crypto-js");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require('crypto-js/enc-base64');
const mailer = require("../functions/nodemailer");

const { Buffer } = require("buffer");
const LiveDiagnostics = require("../schemas/liveDiagnostics");
const { version } = require("os");
const { where } = require("sequelize");

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
  markDiagnostics: async (id) => {
    const diag = await LiveDiagnostics.findOne({ where: { id } });
    if (!diag) {
      return "Diagnostics not found";
    }
    diag.read = true;
    await diag.save();
    return "Diagnostics marked as read!";
  },
  deleteDiagnosticsAfter30Days: async () => {
    const diagnostics = await LiveDiagnostics.findAll();

    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    const currentTime = Date.now();

    diagnostics.forEach(async (diag) => {
      const updatedAtTime = new Date(diag.updatedAt).getTime();

      if (currentTime - updatedAtTime > thirtyDaysInMilliseconds) {
        await LiveDiagnostics.destroy({ where: { id: diag.id } });
        console.log(`Deleted diagnostic with ID: ${diag.id}`);
      }
    });
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
      const version = existCar.version;
    
      const fileData = [];
      console.log(binaryData.toString());
      await fileData.push(binaryData.toString().split("\r\n"));
      console.log({ "fileData Before": fileData[0] });
      var fileLines = fileData[0].join("\r\n");
      console.log({ fileLines: fileLines });
      console.log(fileData[0].length);
      var EncryptedLines = [];

      // console.log({fileData:fileData[0]})

      // const allInLine = []
      // var fileLines2 = fileData[0].join("\n");
      // console.log({fileLines2:fileLines2})
      var allInLine ="";
      fileData[0].forEach((line) => {
        allInLine = allInLine + line;
      });
        // const allInLine = fileLines.replace("\r\n","");
      // fileLines2.forEach(async(line) => {
      //   await allInLine.push(line);
      // });
      console.log({allInLine:allInLine})

      const hmacDigest = CryptoJS.HmacSHA256(allInLine, process.env.SECURITY_KEY).toString();
      
      console.log({hmacDigest:hmacDigest})


// // Define the input line and the key
// var line1 = ":100000000C9473000C94A20B0C94B4060C94CB0BC0";
// var key = 'fotaprojectfotaa';

// // Encrypt the input line
// var encryptedLine = CryptoJS.AES.encrypt(line1, CryptoJS.enc.Utf8.parse(key), {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
// }).toString();

// Print the input and encrypted line
// console.log({line1: line1});
// console.log({encryptedLine: encryptedLine});
      // console.log(fileData[0])
      fileData[0].forEach((line) => {
        var ciphertext = CryptoJS.AES.encrypt(line, CryptoJS.enc.Utf8.parse(process.env.SECURITY_KEY), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      }).toString();
        // console.log({ Ciphertext: ciphertext })
        EncryptedLines.push(ciphertext);
      });

      console.log({ EncryptedLines: EncryptedLines });
      var EncryptedLinesString = EncryptedLines.join("\r\n");
      console.log(EncryptedLinesString);

      // console.log({hmacDigest:CryptoJS.HmacSHA256(":100000000C9473000C94A20B0C94B4060C94CB0BC0\n:100010000C94930D0C94570D0C9490000C9490003C\n:100020000C9490000C9490000C94420C0C942E07AD\n:100030000C9490000C940F0E0C94380E0C94610EDE\n:100040000C9409080C9490000C9490000C9490006F\n:100050000C949000D00099009900990099009900A3\n:1000600099009900990099009900990099009900C8\n:100070009900990099009900AF00F7009900990044\n:10008000AC00B800BE00B500BB0099009900990013\n:1000900099009900990099009900B2009900E30035\n:1000A0001B01ED0009019900990099009900990040\n:1000B0009900990099009900990000019900990010\n:1000C0009900990099009900990099009900990068\n:1000D000990099009900C100990099009900E800E1\n:1000E0002001F200120111241FBECFE5D8E0DEBFCF\n:00000001FF", process.env.SECURITY_KEY).toString()})
      // const hmacDigest = Base64.stringify(hmacSHA256(binaryData, process.env.SECURITY_KEY));
      // console.log({ hmacDigest: hmacDigest });



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

      await firebase.uploadDigest_Storage(
        existCar.maker,
        existCar.model,
        existCar.year,
        hmacDigest
      );

      await firebase.uploadCarUpdate_Storage(
        existCar.maker,
        existCar.model,
        existCar.year,
        existCar.hex.length,
        EncryptedLinesString
      );
      await firebase.uploadCarUpdate_RealtimeDB(
        existCar.maker,
        existCar.model,
        existCar.year,
        part,
        version
      );

      const users = await existCar.getUsers();
      // console.log(users);
      users.forEach(async (user) => {
        console.log(user.email);
        await mailer.sendNotificationUpdate(user.email);
      });

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
  getAllMembers: async () => {
    const users = await User.findAll({ where:{ role: 'member'}});
    if (!users || users.length === 0) {
      return "No Members found!";
    }
    return users;
  },
  getUserById: async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return "User not found";
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
adminServices.deleteDiagnosticsAfter30Days();
module.exports = adminServices;
