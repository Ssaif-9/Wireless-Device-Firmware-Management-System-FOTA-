const User = require("../models/user");
const Car = require("../models/car");
const News = require("../models/news");
const Diagnostic = require("../models/diagnostics");
const { sign } = require("jsonwebtoken");
const firebase = require("../functions/firebase");
const CryptoJS = require("crypto-js");
const { Buffer } = require("buffer");
const mailer = require("../functions/nodemailer");
const multer = require("multer");






const signupProcess = async ({name, email, password, role}) =>{
    if (!name || !email || !password || !role){
        return 'All fields are required!';
    }
    if (await User.findOne({email: email})) {
        console.error("Email already Taken");
        return "Account Already Exist";
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters!';
    }
    return null;
}

const userServices = {
    addMember: async({name, email, password, role}) =>{
        const validationError = await signupProcess({name, email, password, role});
        if (validationError){
            return validationError;
        }
        const user = new User()
        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;
        // const token = await user.generateAuthToken();
        // mailer.handleSignup(user.email)
        await user.save();
        return user;
    },
    getDiagnostics: async() =>{
        const diag = await Diagnostic.find();
        if(!diag || diag.length === 0){
            return 'No diagnostics exists!';
        }
        return diag
    },

    // Function to upload Car Hex Files
    addCarUpdate: async({file,car}) =>{
        try {
            const existCar = await Car.findOne({
                maker: car.maker,
                model: car.model,
                year: car.year
            });
            console.log(existCar);
            if (!existCar) {
                return 'Car not found';
            }
            if (!file) {
                return 'No file uploaded.';
            }
            const binaryData = Buffer.from(file.buffer, 'hex');
            const base64Data = binaryData.toString('base64');
            existCar.hex.push(file.buffer);
            // console.log(car);
            await existCar.save();
            console.log(existCar.hex.length);
            
            // console.log(base64Data);
            console.log({'base64Data:':base64Data});
                
            // // Encrypt
            // var ciphertext = CryptoJS.AES.encrypt(base64Data, 'secret key 123').toString();
            // console.log({"Ciphertext":ciphertext});
            // // Decrypt
            // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            // var originalText = bytes.toString(CryptoJS.enc.Utf8);

            // console.log({"OriginalText":originalText}); // 'my message'
            // // console.log(ciphertext);

            await firebase.uploadCarUpdate_Storage(existCar.maker, existCar.model, existCar.year, existCar.hex.length, base64Data);
            await firebase.uploadCarUpdate_RealtimeDB(existCar.maker, existCar.model, existCar.year);

            return existCar;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    // Function to upload News
    addNews: async({title, content,image}) =>{
        if (!title || !content){
            return 'All fields are required!';
        }
        if (!image) {
            return 'No image uploaded.';
        }
        const news = new News();
        news.title = title;
        news.content = content;
        news.image = image.buffer;
        await news.save();
        return news;
    }, 
}


module.exports = userServices;