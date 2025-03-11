const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const path = require("path");
const fs = require("fs");

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

async function getAllproductController(req, res) {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      mgs: "product fetch successfull",
      products: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function deleteProductController(req, res) {
  let { id } = req.params;

  try {
    let deleteproduct = await productModel.findOneAndDelete({ _id: id });
    let existingpath = path.join(__dirname, "../uploads");

    deleteproduct.image.forEach((imgpath) => {
      let splitpath = imgpath.split("/");
      let imagepath = splitpath[splitpath.length - 1];
      fs.unlink(`${existingpath}/${imagepath}`, (err) => {
        console.log(err);
      });
    });

    let findcategory = await categoryModel.findOneAndUpdate(
      { product: id },
      { $pull: { product: id } },
      { new: true }
    );
    await findcategory.save();

    return res.status(200).json({
      success: true,
      msg: "product deleted successfull",
      data: deleteproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function singleProductController(req, res) {
  let { id } = req.params;
  try {
    let singleproduct = await productModel.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      msg: "single product fetch successful",
      data: singleproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

module.exports = {
  createproductController,
  getAllproductController,
  deleteProductController,
  singleProductController,
};
