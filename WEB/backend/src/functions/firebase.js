const multer = require('multer');
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const serviceAccount = require(process.env.FIREBASE_ADMIN_JSON_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://fota-4ca08.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

// Configure Multer for handling file uploads
const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

async function uploadCarUpdate_Storage(make, model, year, version, hex) {
  // Set the destination in the bucket
 const destination = make + "/" + model + "/" + year + "/cipher" + ".hex";
 
 // Set the content type to 'application/octet-stream'
 const metadata = {
  contentType: 'application/octet-stream',
};
 
 const uploadTask = bucket.file(destination).createWriteStream({
  metadata,
  // resumable: false,
 });

 console.log(hex);
//                      To make it Binary File
//  const hexData = hexToBinary(hex);
  // console.log(hexData);

 // Pipe the file buffer to the bucket
 uploadTask.end(hex);

 // Wait for the upload to complete
 await new Promise((resolve, reject) => {
   uploadTask.on('finish', resolve);
   uploadTask.on('error', reject);
 });

 // Get the public URL of the uploaded file
 const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
console.log(fileUrl);
}


async function uploadDigest_Storage(make, model, year, hex) {
  // Set the destination in the bucket
 const destination = make + "/" + model + "/" + year + "/digest" + ".hex";
 
 // Set the content type to 'application/octet-stream'
 const metadata = {
  contentType: 'application/octet-stream',
};
 
 const uploadTask = bucket.file(destination).createWriteStream({
  metadata,
  // resumable: false,
 });

 console.log(hex);
//                      To make it Binary File
//  const hexData = hexToBinary(hex);
  // console.log(hexData);

 // Pipe the file buffer to the bucket
 uploadTask.end(hex);

 // Wait for the upload to complete
 await new Promise((resolve, reject) => {
   uploadTask.on('finish', resolve);
   uploadTask.on('error', reject);
 });

 // Get the public URL of the uploaded file
 const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
console.log(fileUrl);
}




function hexToBinary(hexData) {
  const binaryData = Buffer.from(hexData, 'base64');
  return binaryData;
}

const firebaseConfig = {
  apiKey: "AIzaSyByr95Y2uu7mzTcsndzJniOJNKR5Hm8LwM",
  authDomain: "fota-4ca08.firebaseapp.com",
  databaseURL: "https://fota-4ca08-default-rtdb.firebaseio.com",
  projectId: "fota-4ca08",
  storageBucket: "fota-4ca08.appspot.com",
  messagingSenderId: "735184378886",
  appId: "1:735184378886:web:a68b8e6f161f3367b9f787",
  measurementId: "G-HZ6PLFED6B"
};

const app = initializeApp(firebaseConfig);

async function uploadCarUpdate_RealtimeDB(make, model, year, part, version) {
    const db = getDatabase(app);
    // const car_year = year;

    const carPart = 100+part;
    const carVersion = 1000+version;
    const partVersion = carPart.toString().substring(1) + carVersion.toString().substring(1)
    // console.log({partVersion: partVersion});

    set(ref(db, make + '/' + model + '/' + year), {
      UpdateInfo: partVersion,
      ErrorInfo: 0
    }
    ).then(() => {
        console.log('Hex file uploaded successfully.');
      })
      .catch((error) => {
        console.error('Error uploading hex file:', error);
      });
    // set(ref(db, make + '/' + model + '/' + year ), part
    // ).then(() => {
    //     console.log('Part number uploaded successfully.');
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading part number:', error);
    //   });
  }

  // async function uploadImages_Storage(image) {
  //   // Set the destination in the bucket
  //   // make version inter and everytime it auto increments by 1
  //   let version = 1; // Initialize version as 1

  //   // Increment version by 1 for each upload
  //   version++;

  //   // Use the updated version in the destination path
  //   const destination = "Images/" + version + ".png";
   
  //  // Set the content type to 'application/octet-stream'
  //  const metadata = {
  //   contentType: 'application/octet-stream',
  // };
   
  //  const uploadTask = bucket.file(destination).createWriteStream({
  //   metadata,
  //   // resumable: false,
  //  });
  
  //  console.log(image);
  //  const hexData = hexToBinary(image);
  //   console.log(hexData);
  
  //  // Pipe the file buffer to the bucket
  //  uploadTask.end(hexData);
  
  //  // Wait for the upload to complete
  //  await new Promise((resolve, reject) => {
  //    uploadTask.on('finish', resolve);
  //    uploadTask.on('error', reject);
  //  });
  
  //  // Get the public URL of the uploaded file
  // //  const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
  // // console.log(fileUrl);
  // // return fileUrl;

  // const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`
  // console.log(bucket.name);
  // console.log(fileUrl);
  // return fileUrl;
  // }






module.exports = {uploadCarUpdate_RealtimeDB, uploadCarUpdate_Storage,uploadDigest_Storage};