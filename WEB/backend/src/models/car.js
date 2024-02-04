const mongoose = require('mongoose')
const User = require('./user')

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
    },
    maker: {
        type: String,
        required: true,
        trim: true
    },
    owner:[{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }],
    hex: [{
        type: Buffer,
    }],
})

carSchema.methods.toJSON = function () {
    const car = this
    const carObject = car.toObject()

    delete carObject.hex

    return carObject
}

// carSchema.statics.findByCar = async function (maker, model, year) {
//     console.log(maker,model,year);
//     const car = await Car.findOne({maker, model, year})
//     if (!car) {
//         throw new Error("Unable to find car")
//     }
//     return car
// }


const Car = mongoose.model('Car', carSchema)

module.exports = Car