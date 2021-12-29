import multer from 'multer';
import path from "path";

let count = 0;
let filesStorgePath = [];

/**
 * sets storage path for all the files that is upload. 
 */
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
      let storagePath = filesStorgePath[count] ? filesStorgePath[count++] : process.env.imageStoragePath;
      callback(null, storagePath);
    },
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      const baseName = path.parse(file.originalname).name;
      const updatedFile = `${baseName}_${Date.now()}${extension}`;
      file.originalname = updatedFile;
      callback(null, updatedFile);
    }
  });
  
  const upload = multer({ storage: storage }).array('uploader', process.env.maxUpload);

  const uploadFile = {};

/*
 * saves the image files
 */  
uploadFile.saveImage = (req, res, next) => {
  count = 0;
  upload(req, res, (err) => {
    if (err) return Promise.reject(err);
    next();
  });
}

export default uploadFile;