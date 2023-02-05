const cloudinary = require("cloudinary").v2;
const errorResponse = require("../helper/errorResponse");
const config = require("../config/index");
const CustomError = require("../helper/customError");

cloudinary.config({
   cloud_name: config.CLOUD_NAME,
   api_key: config.CLOUD_API_KEY,
   api_secret: config.CLOUD_SECRET
});

//File Upload Middleware 
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
      // console.log(image)

      const file = req.files.image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "products",
      });
      // console.log(result.secure_url, "RESULT")
      req.image = result.secure_url;
      req.imageId = result.public_id;
      if (!req.image && !req.imageId) {
         throw new CustomError(400, "Image upload failed!")
      }
      if (req.image) {
         return next();
      };
   } catch (err) {
      errorResponse(res, err, "UPLOAD MIDDLEWARE")
   }
};


//File Update Middleware 

module.exports.updateFile = async (req, res, next) => {
   try {
      const { imageId } = req.body;
      //If req has imageId and req.files is null, that means user only wants to update product details, in that case this middleware won't do anything just next() will trigger.
      if (!req.files && imageId) {
         return next()
      }
      // console.log(imageId, "IIIIDDDD")
      if (imageId) {
         await cloudinary.uploader.destroy(imageId);
      }
      const file = req.files.image;
      console.log(file, "FILE")

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
         folder: "products",
      });
      // console.log(result.secure_url, "RESULT")
      req.image = result.secure_url;
      req.imageId = result.public_id;
      if (!req.image && !req.imageId) {
         throw new CustomError(400, "Image upload failed!")
      }
      if (req.image) {
         return next();
      };
   } catch (err) {
      errorResponse(res, err, "EDIT MIDDLEWARE")
   }
};
