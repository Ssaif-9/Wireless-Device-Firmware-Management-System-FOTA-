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
 const destination = make + "/" + model + "/" + year + "/version" + ".hex";
 
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

async function uploadCarUpdate_RealtimeDB(make, model, year) {
    const db = getDatabase(app);
    const car_year = year;
    set(ref(db, make + '/' + model + '/' + year), true
    ).then(() => {
        console.log('Hex file uploaded successfully.');
      })
      .catch((error) => {
        console.error('Error uploading hex file:', error);
      });
  }

module.exports = {uploadCarUpdate_RealtimeDB, uploadCarUpdate_Storage};