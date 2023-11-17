import connectToDB from "@/database";
import List from "@/models/listModel";
import { NextResponse } from "next/server";
import { getToken } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const token = await getToken({ req });
    console.log("sess " + JSON.stringify(token));
    if (token) {
      //   const {} = new req();
      const id = searchParams.get("id");
      if (!id)
        return NextResponse.json({
          success: false,
          message: "List Item ID is required",
        });

      const animeExist = await List.findOne({
        user: token.id,
        "animes.mid": mid,
      });
      if (animeExist) {
        return NextResponse.json({
          success: true,
          message: "List Item found successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to find item ! .",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
