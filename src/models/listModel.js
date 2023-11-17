const mongoose = require("mongoose");
import User from "./userModel";
import Anime from "./animeModel";
const animeSchema = mongoose.Schema(
  {
    mid: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
    ustatus: { type: String, default: "Plan to Watch" },
    uscore: { type: Number, default: -1 },
    uepisodes: { type: Number, default: 0 },
    tag: { type: String },
  },
  { timestamps: true },
);
const listModel = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: "String", require: true },
  animes: [animeSchema],
});

const List = mongoose.models.List || mongoose.model("List", listModel);
export default List;
