const Product = require("../models/product.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @editCategory
 * @Route GET http://localhost:5000/api/v1/search/:key
 * @Description This is a search controller that searches for products in the database with a title that matches the search key passed in the request. The search is case-insensitive, and the controller returns at most 5 matching products sorted by title in ascending order.
 * @Parameters search key from req.params
 * @Return  result array
 *********************************************************/
module.exports.searchController = async (req, res) => {
   console.log(req.params, "PARAMS")
   try {
      const result = await Product.find({
         "$or": [
            {
               title: { $regex: req.params.key, $options: "i" }
            }
         ]
      }).sort({ title: 1 }).skip(0).limit(4);

      res.status(200).json(result)
   } catch (err) {
      errorResponse(req, err, "SEARCH-CONTROLLER")
   }
}