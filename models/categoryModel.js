const { default: mongoose, Schema } = require("mongoose");
const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
        type:String
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
