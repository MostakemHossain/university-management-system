import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_serect_key,
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);

          fs.unlink(path, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('File is deleted');
            }
          });
        }
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
