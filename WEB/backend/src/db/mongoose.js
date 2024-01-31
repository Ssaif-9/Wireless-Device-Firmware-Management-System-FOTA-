const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.MONGODB_URL;

mongoose.connect(db, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log(err);
});