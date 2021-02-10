const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(403).json('you need token to do this api');
        //Authorization: bearer token
        else {
            const bearerToken = bearerHeader.split(' ')[1];//get token
            const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
            req.userData = decodedToken;
            return next();
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({'msg': 'Invalid or expired token provided!'});
    }
}