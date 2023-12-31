const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String" },
    image: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userModel);
export default User;
