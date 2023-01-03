const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema({
   name: {
      type: String,
      trim: true,
      required: [true, "Sub-category is Required"]
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is Required"]
   }
},
   {
      timestamps: true,
   }
);

const SubCategory = model("SubCategory", subCategorySchema);
module.exports = SubCategory;