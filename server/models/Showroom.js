const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A showroom structural name designation is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Showroom physical or digital location layout is required"],
      trim: true,
    },
    dimensions: {
      type: String,
      required: [true, "Spatial dimensions footprint parameters are required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Showroom structural render or cover image asset path is required"],
    },
    description: {
      type: String,
      required: [true, "A descriptive curatorial narrative text is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Showroom", showroomSchema);