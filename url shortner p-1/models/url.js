const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    ShortID: {
      type: String,
      unique: true,
      required: true,
    },
    originalurl: {
      type: String,
      required: true,
    },
    visithistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true },
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
