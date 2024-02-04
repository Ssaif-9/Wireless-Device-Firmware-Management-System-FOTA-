const multer = require('multer');
const admin = require('firebase-admin');
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

async function uploadCarUpdate(make, model, year, version, hex) {
  // Set the destination in the bucket
 const destination = "cars/" + make + "/" + model + "/" + year + "/v_" + version + ".hex";
 
 // Set the content type to 'application/octet-stream'
 const metadata = {
  contentType: 'application/octet-stream',
};
 
 const uploadTask = bucket.file(destination).createWriteStream({
  metadata,
  // resumable: false,
 });

 console.log(hex);
 const hexData = hexToBinary(hex);
  console.log(hexData);

 // Pipe the file buffer to the bucket
 uploadTask.end(hexData);

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

module.exports = uploadCarUpdate;
















// // Add this line at the beginning of your script
// process.setMaxListeners(15); // Set the desired number, e.g., 15
// // Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// // const { getAnalytics } = require("firebase/analytics");
// const { getStorage, ref, uploadBytes, uploadString } = require("firebase/storage");
// // const { getDatabase, ref, set, onValue } = require("firebase/database");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyASdefoKUa06_kpgiTAYthJY5xDWZuGEMo",
//   authDomain: "fota-93216.firebaseapp.com",
//   databaseURL: "https://fota-93216-default-rtdb.firebaseio.com",
//   projectId: "fota-93216",
//   storageBucket: "gs://fota-93216.appspot.com",
//   messagingSenderId: "434875824003",
//   appId: "1:434875824003:web:ae08167b0362cd45e468b6",
//   measurementId: "G-RZZPVKQHGR",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// async function uploadCarUpdate(make, model, year, version, hex) {
  // const storage = getStorage(app);
  // const storageRef = ref(
  //   storage,
  //   "cars/" + make + "/" + model + "/" + year + "/v_" + version + ".hex"
  // );
  // console.log(storageRef.fullPath);
  // console.log(storageRef.name);
  // console.log(storageRef.bucket);

  // try {
  //   // Convert hex data to Uint8Array
  //   const hexData = hexToUint8Array(hex);
  //   // Upload the hex data to the specified storage reference
  //   console.log(hexData);
  //   const snapshot = await uploadBytes(storageRef, hexData, 'raw');

  //   console.log("Hex file uploaded successfully:", snapshot);
  //   return snapshot; // You can return the snapshot if needed
  // } catch (error) {
  //   console.error("Error uploading hex file:", error);
  //   throw error; // Throw the error to handle it in the calling code
  // }
// }
// function hexToUint8Array(hex) {
//   const bytes = new Uint8Array(hex.length / 2);
//   for (let i = 0; i < hex.length; i += 2) {
//     bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
//   }
//   return bytes;
// }



// // import { getStorage, ref, uploadBytes } from "firebase/storage";
// function uploadCarUpdate(){
//   const storage = getStorage(app);
//   const storageRef = ref(storage, 'some-child');
//   console.log(storageRef.fullPath);
//   console.log(storageRef.name);
//   console.log(storageRef.bucket);
//   const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
//   uploadBytes(storageRef, bytes).then((snapshot) => {
//     console.log('Uploaded an array!', snapshot);
//   }).catch((error) => {
//     throw error;
//     console.error('Error uploading an array', error);
//   });
// }





// function uploadCarUpdate(make, model, year, hex, version) {
//     const db = getDatabase(app);
//     set(ref(db, 'cars/' + make + '/' + model + '/' + year + '/v' + version), {
//       hex: hex,
//     }).then(() => {
//         console.log('Hex file uploaded successfully.');
//       })
//       .catch((error) => {
//         console.error('Error uploading hex file:', error);
//       });
//   }

// module.exports = uploadCarUpdate;
