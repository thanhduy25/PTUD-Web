const config = require('../config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function isAuth(req, res, next) {
    if(req.user) return next();
    const token = req.headers?.authorization?.replace('Bearer ', '') || req.cookies?.jwt
    // console.log(req.header("Authorization"))
    // const token = req.headers.authorization.replace('Bearer ', '')

    if(!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        decoded = jwt.verify(token, config.jwt.key);
        req.user = decoded.user;
        const user = await User.findById(decoded._id)

        if (!user) return next(new Error('Unauthorized!'))
      
        req.user = user
        next();
    } catch(err) {
        console.error(err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = isAuth
