const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Car = require('./car')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type: String,
        required: true,
        trim: true,
        default: 'user',
        enum: ['user', 'admin','member']
    },
    phone:{
        type: String ,
        // required: true,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Please enter a valid E-mail!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can not be \'password\'")
            }
        }
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Car'
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    verified:{
        type: Boolean,
        required: true,
        trim: true,
        default: false,
    },
    avatar: {
        type: Buffer
    },
}, {
    timestamps: true
});

// userSchema.virtual('Cars', {
//     ref: 'Car',
//     localField: '_id',
//     foreignField: 'owner'
// });

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    user.tokens = user.tokens.concat({token})   //concat is like push but for arrays
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne( {email} )
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Unable to login")
    }
    return user
    } catch (error) {
        // return(error)
    }
    
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User