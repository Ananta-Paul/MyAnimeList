import connectToDB from "@/database";
import List from "@/models/listModel";
import { NextResponse } from "next/server";
import Anime from "@/models/animeModel";
export const dynamic = "force-dynamic";
import { getToken } from "next-auth/jwt";
export async function POST(req) {
  try {
    await connectToDB();
    const token = await getToken({ req });
    //console.log("sess " + JSON.stringify(token));
    if (token) {
      const data = await req.json();
      //console.log();
      const { anime } = data;
      const userID = token.id;
      const email = token.email;
      //console.log(JSON.stringify(token));
      //const { error } = AddToList.validate({ userID, productID });

      //   if (error) {
      //     return NextResponse.json({
      //       success: false,
      //       message: error.details[0].message,
      //     });
      //   }

      //console.log(anime, userID);
      let isCurrentAnimeAlreadyExists = await Anime.findOne({
        mal_id: anime.mal_id,
        type: anime.type,
      });
      if (!isCurrentAnimeAlreadyExists) {
        isCurrentAnimeAlreadyExists = await Anime.create(anime);
      }
      const isCurrentListItemAlreadyExists = await List.find({
        user: userID,
        "animes.id": isCurrentAnimeAlreadyExists._id,
      });

      //console.log("anim: " + isCurrentListItemAlreadyExists);

      if (isCurrentListItemAlreadyExists?.length > 0) {
        return NextResponse.json({
          success: false,
          message: "Anime is already added in List! Please add different anime",
        });
      }

      //console.log("an: " + isCurrentAnimeAlreadyExists._id);
      const saveAnimeToList = await List.findOneAndUpdate(
        { user: userID },
        {
          email: email,
          $push: {
            animes: {
              mid:
                isCurrentAnimeAlreadyExists.mal_id +
                isCurrentAnimeAlreadyExists.type,
              id: isCurrentAnimeAlreadyExists._id,
            },
          },
        },
        { new: true, upsert: true },
      );

      //console.log(saveAnimeToList);

      if (saveAnimeToList) {
        const newlyAddedItem = saveAnimeToList.animes.find(
          (item) =>
            item.mid ===
            isCurrentAnimeAlreadyExists.mal_id +
              isCurrentAnimeAlreadyExists.type,
        );
        return NextResponse.json({
          success: true,
          data: newlyAddedItem,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the Anime to List ! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
