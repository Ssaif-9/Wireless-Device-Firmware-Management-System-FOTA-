const mongoose = require('mongoose')
const User = require('./user')

const diagnosticSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps: true
})

const Diagnostic = mongoose.model('Diagnostic', diagnosticSchema)

module.exports = Diagnostic