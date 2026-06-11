const mongoose = require("mongoose");

const designerSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Designer", designerSchema);