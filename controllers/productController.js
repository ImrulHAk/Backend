const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

async function createproductController(req, res) {
  let {
    title,
    description,
    sellingprice,
    discountprice,
    stock,
    color,
    category,
  } = req.body;
  let images = req.files.map(
    (item) => `http://localhost:3000/${item.filename}`
  );
  try {
    let productcreate = new productModel({
      title,
      description,
      sellingprice,
      discountprice,
      stock,
      color,
      image: images,
      category,
    });

    await productcreate.save();
    let categoryupdate = await categoryModel.findOneAndUpdate(
      {
        _id: productcreate.category,
      },
      { $push: { product: productcreate._id } },
      { new: true }
    );
    await categoryupdate.save();
    return res
      .status(201)
      .json({ mag: "product create successful", data: productcreate });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

module.exports = { createproductController };
