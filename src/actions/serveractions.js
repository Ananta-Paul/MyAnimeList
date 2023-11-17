"use server";
import connectToDB from "@/database";
import { getServerSession } from "next-auth";
import authOptions from "next-auth";
import { redirect } from "next/navigation";
import List from "@/models/listModel";
import { revalidatePath } from "next/cache";
//import { Animes } from "@/app/page";
export const refResh = (path) => {
  //console.log(path);
  revalidatePath("/my_list");
};
export const getAllListItems = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signup");
  try {
    await connectToDB();
    const res = await List.findOne({ email: session.user.email })
      .populate("animes.id")
      .lean();
    const data = JSON.stringify(res);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const removeItem = async ({ id, samePath }) => {
  // console.log(id);
  const session = await getServerSession(authOptions);
  if (!session) return;
  try {
    await connectToDB();
    // console.log(session.user.email);
    const res = await List.findOneAndUpdate(
      {
        email: session.user.email,
      },
      {
        $pull: {
          animes: {
            _id: id,
          },
        },
      },
    );
    // console.log(res);
    if (samePath) revalidatePath("/my_list");
    return;
  } catch (e) {
    if (samePath) revalidatePath("/my_list");
    console.log("Error: " + e);
  }
};
export const isAlreadyExists = async (id) => {
  //console.log("object Id: " + id);
  const session = await getServerSession(authOptions);
  if (!session) return;
  try {
    await connectToDB();
    const isExists = await List.findOne({
      email: session.user.email,
      animes: { $elemMatch: { mid: id } },
    });
    if (isExists) {
      const anime = await isExists.animes.find((item) => item.mid === id);
      // console.log(anime);
      return JSON.stringify(anime?._id);
    }

    return;
  } catch (e) {
    console.log(e);
  }
};
export const editItem = async ({ id, updateDetails }) => {
  // console.log(id);
  const session = await getServerSession(authOptions);
  if (!session) return;
  try {
    await connectToDB();
    // console.log(session.user.email);
    const res = await List.findOneAndUpdate(
      {
        email: session.user.email,
        "animes._id": id, // Match the specific anime element by its _id
      },
      {
        $set: {
          "animes.$.uscore": updateDetails.score,
          "animes.$.uepisodes": updateDetails.episodes,
          "animes.$.ustatus": updateDetails.status,
        },
      },
    );
    // console.log(res);
    return true;
  } catch (e) {
    console.log("Error: " + e);
  }
};
// export const deactivateSearch = async () => {
//   "use server";
//   if (Animes != null) {
//     Animes = null;
//     revalidatePath("/");
//   }
// };
// export const searchHandler = async (searchQuery) => {
//   let Animes = null;
//   if (searchQuery && searchQuery.length > 0) {
//     const data = await getSearchAPI({ keyword: searchQuery });
//     Animes = data?.data;
//   }
//   revalidatePath("/");
// };
