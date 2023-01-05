const cloudinary = require("cloudinary").v2;
const errorResponse = require("../helper/errorResponse");
const config = require("../config/index")

cloudinary.config({
   cloud_name: config.CLOUD_NAME,
   api_key: config.CLOUD_API_KEY,
   api_secret: config.CLOUD_SECRET
});

module.exports.fileUploader = async (req, res, next) => {
   try {

      //MULFIPLE IMAGE UPLOAD WILL BE USE LATER
      // console.log(req.files, "FILE")
      // let result;
      // const imageArr = [];
      // if (req.files) {
      //    for (let i = 0; i < req.files.length; i++) {
      //       result = await cloudinary.uploader.upload(
      //          req.files.images[index].tempFilePath,
      //          {
      //             folder: "products",
      //          });
      //       imageArr.push({
      //          public_id: result.public_id,
      //          imageUrl: result.secure_url
      //       });
      //    };
      // };

      const file = req.files.image;
      // console.log(file.tempFilePath, "img")
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "products",
      });
      // console.log(result.secure_url, "RESULT")
      req.imageUrl = result.secure_url;

      if (req.imageUrl) {
         next();
      };
   } catch (err) {
      errorResponse(res, err, "FILE UPLOAD MIDDLEWARE")
   }
};


