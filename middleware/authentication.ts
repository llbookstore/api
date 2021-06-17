import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
export const commonAuth = (req: Request, res: Response, next: NextFunction) => { //user or admin can access
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(403).json({ msg: 'you need token to do this api' });
        //Authorization: bearer token
        else {
            const bearerToken: string = bearerHeader.split(' ')[1];//get token
            const decodedToken: any = jwt.verify(bearerToken, JWT_SECRET!);
            if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('type')) {
                req.userData = decodedToken;
            }
            return next();
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ 'msg': 'Invalid or expired token provided!' });
    }
}
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {//just admin can access
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(403).json({ msg: 'you need token to do this api' });
        //Authorization: bearer token
        else {
            const bearerToken: string = bearerHeader.split(' ')[1];//get token
            const decodedToken: any = jwt.verify(bearerToken, JWT_SECRET!);
            //check permission
            if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('type')) {
                const type: number = decodedToken['type'];
                if (type !== 1)
                    return res.status(403).json({ msg: `you don't have permission to do this api` });
                req.userData = decodedToken;
            }
            return next();
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({ 'msg': 'Invalid or expired token provided!' });
    }
}