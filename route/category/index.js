const express = require("express");
const multer = require("multer");
const {
  categoryController,
  fetchAllcategory,
  singleCategory,
  deleteCategory,
} = require("../../controllers/categoryController");
const router = express.Router();

//config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.split(".");
    let extention = filename[filename.length - 1];

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extention}`);
  },
});

const upload = multer({ storage: storage });

router.post("/createcategory", upload.single("image"), categoryController);

router.get("/allcategory", fetchAllcategory);

router.get("/singlecategory/:id", singleCategory);

router.delete("/deletecategory/:id", deleteCategory)

module.exports = router;
