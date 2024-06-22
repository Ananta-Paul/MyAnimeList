import connectToDB from "@/database";
import List from "@/models/listModel";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Anime from "@/models/animeModel";
export const dynamic = "force-dynamic";


export async function GET(req) {
  try {
    await connectToDB();
    const token = await getToken({ req });
    //console.log("token: " + token);
    if (token) {
      const id = token.id;
      if (!id)
        return NextResponse.json({
          success: false,
          message: "Please login in!",
        });
      const extractAllListItems = await List.findOne({ user: id });

      if (extractAllListItems) {
        return NextResponse.json({ success: true, data: extractAllListItems });
      } else {
        return NextResponse.json({
          success: false,
          message: "No List items are found !",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated blabla",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
