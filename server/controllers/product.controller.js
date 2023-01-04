const Product = require("../models/product.schema");
const CustomError = require("../helper/customError")


// /********************************************************
//  * @getAllProducts
//  * @Route GET http://localhost:5000/api/v1/products/all
//  * @Description Retrieve All products, and then sends the resulting data back to the client as a JSON response.
//  * @Parameters none
//  * @Return Products Array
//  *********************************************************/




/********************************************************
 * @getAllProducts
 * @Route GET http://localhost:5000/api/v1/products/all
 * @Description Retrieve All products, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return Products Array
 *********************************************************/
module.exports.getAllProducts = async (_req, res) => {
   try {
      const products = await Product.find()
      return res.status(200).json({ success: true, products })

   } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message })
   }
}