import multer from 'multer';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// init multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      req.mimetype == 'image/jpg' ||
      req.mimetype == 'image/jpeg' ||
      req.mimetype == 'image/png' ||
      req.mimetype == 'image/gif'
    ) {
      cb(null, path.join(__dirname, '../public/userphoto'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const userMulter = multer({
  storage: storage,
}).single('photo');
