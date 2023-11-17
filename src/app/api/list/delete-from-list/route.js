import connectToDB from "@/database";
import List from "@/models/listModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "next-auth";

export const dynamic = "force-dynamic";

export async function DELETE(req, res) {
  try {
    await connectToDB();
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const {} = new req();
      const id = searchParams.get("id");
      if (!id)
        return NextResponse.json({
          success: false,
          message: "Cart Item ID is required",
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "Cart Item deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete Cart item ! Please try again.",
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
