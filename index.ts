import express, {Request, Response, Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path'
import routes from './routes/index'
import * as dotenv from "dotenv";
import { upload, errHandling } from './middleware/upload';

dotenv.config({ path: __dirname+'/.env' });
const { PORT = 3333 } = process.env;
const app = express();
// Allow Cross-Origin requests
app.use(cors()); 
//middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//new Interface multer
interface MulterRequest extends Request {
    file: Express.Multer.File
}
// app.use(errHandling);
app.post('/upload', upload.single('image'), errHandling, (req: MulterRequest, res: Response) => {
    return res.json(req.file.filename)
});
//images
const serveredImageFolder = express.static(path.join(__dirname, 'images'));
app.use('/images', serveredImageFolder); //dung api file anh public
routes(app);
app.listen(PORT, () => console.log(`app is listening port ${PORT}`)); //chay server