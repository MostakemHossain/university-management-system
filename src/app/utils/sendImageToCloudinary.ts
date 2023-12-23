import { v2 as cloudinary } from 'cloudinary';

export const sentImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dbhmlaa1l',
    api_key: '538181817291555',
    api_secret: 'npigsT7v6eidtdRrVcQbVfSnQII',
  });
  cloudinary.uploader.upload(
    'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
    { public_id: 'olympic_flag' },
    function (error, result) {
      console.log(result);
    },
  );
};
