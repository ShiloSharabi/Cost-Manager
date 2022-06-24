// importing the required modules
const mongoose = require("mongoose");

// defining cost schemes in DB by defining the type used in the DB and adding timestamp
const CostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

// exporting this scheme to allow importing it from another place
module.exports = mongoose.model("Cost", CostSchema);