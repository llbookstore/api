const jwt = require('jsonwebtoken');

module.exports = {
    commonAuth: (req, res, next) => { //user or admin can access
        try {
            const bearerHeader = req.headers['authorization'];
            if (!bearerHeader) return res.status(403).json({ msg: 'you need token to do this api' });
            //Authorization: bearer token
            else {
                const bearerToken = bearerHeader.split(' ')[1];//get token
                const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
                req.userData = decodedToken;
                return next();
            }
        } catch (err) {
            console.log(err);
            return res.status(401).json({ 'msg': 'Invalid or expired token provided!' });
        }
    },
    adminAuth: (req, res, next) => {//just admin can access
        try {
            const bearerHeader = req.headers['authorization'];
            if (!bearerHeader) return res.status(403).json({ msg: 'you need token to do this api' });
            //Authorization: bearer token
            else {
                const bearerToken = bearerHeader.split(' ')[1];//get token
                const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
                //check permission
                const { type } = decodedToken;
                if (type !== 1)
                    return res.status(403).json({ msg: `you don't have permission to do this api` });
                req.userData = decodedToken;
                return next();
            }
        } catch (err) {
            console.log(err);
            return res.status(401).json({ 'msg': 'Invalid or expired token provided!' });
        }
    },
}