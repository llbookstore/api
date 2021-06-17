import multer from 'multer';
import path from 'path';
import { returnError }from '../utils/common';
import { Request, Response, NextFunction, Express} from 'express'
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, './images')
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const fileFilter: any = (req: Request, file: Express.Multer.File, cb: (error: Error | null, success: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('unsupported file'), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 }
});

const errHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        return res.json(returnError(401,err.message,{}, req.path));
        // A Multer error occurred when uploading.
    } else if (err) {
        return res.json(returnError(401,err.message,{}, req.path));
        // An unknown error occurred when uploading.
    }
    // Everything went fine.
}

export  {
    upload,
    errHandling
};