const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    console.log(req.header('Authorization'));
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        // const decoded = jwt.verify(token, 'thisismynewcourse')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        // Check if the token has expired
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // Check if the token has expired
        // console.log(decoded.exp);
        // console.log(Date.now()/1000);
        if (decoded.exp < Date.now() / 1000) {
            // Remove the expired token from the user's tokens array
            user.tokens = user.tokens.filter(token => tokens.token !== token);
            await user.save();
            return res.status(401).send({ error: 'Token has expired.' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.' })
    }
}

module.exports = auth