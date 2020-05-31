import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

const tempFolder = resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = resolve(tempFolder, 'uploads');

export default {
  tempFolder,
  uploadFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
