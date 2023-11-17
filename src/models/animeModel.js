const mongoose = require("mongoose");
const animeModel = mongoose.Schema({
  // _id: { type: String, required: true },
  mal_id: { type: "String", required: true, unique: true },
  title: { type: "String", required: true },
  rank: { type: "Number" },
  score: { type: "Number" },
  genres: [
    {
      mal_id: { type: "String", required: true },
      name: { type: "String", required: true },
    },
  ],
  episodes: { type: "Number" },
  type: { type: "String" },
  image: {
    type: "String",
    required: true,
  },
});

const Anime = mongoose.models.Anime || mongoose.model("Anime", animeModel);
export default Anime;
