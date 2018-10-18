const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  choice: {
    type: Array,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  }
});

let Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
