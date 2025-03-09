const express = require("express");
const multer = require("multer");
const {
  createproductController,
} = require("../../controllers/productController");
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

router.post("/createproduct", upload.array("images", 4), createproductController);

module.exports = router;
