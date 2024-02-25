const mongoose = require('mongoose')
const User = require('./user')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
},{
    timestamps: true
})

const News = mongoose.model('News', newsSchema)

module.exports = News