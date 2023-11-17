import connectDB from "@/database";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    // console.log("req: " + req.id);
    const { name, email, password, image } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please enter all the fields" },
        { status: 400 },
      );
    }
    await connectDB();
    const userExist = await User.findOne({ email }).select(
      "-password -isAdmin",
    );
    if (userExist) {
      return NextResponse.json({
        user: userExist,
        error: "User already Exists",
        status: 400,
      });
    }
    let user;
    if (password === "oauth") {
      user = await User.create({ name, email, password, image }).select(
        "-password -isAdmin",
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        image,
      }).select("-password -isAdmin");
    }

    return NextResponse.json({
      user,
      error: "User registration successful!",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
