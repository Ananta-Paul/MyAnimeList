import HomeList from "@/components/lists/homelist";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import CardSkeleton from "@/components/cardskeleton";
import SearchServerActions from "@/components/miniComponents/search-server-action";
import { getSearchAPI } from "@/config";
import { AnimeList } from "@/components/lists/animelist";
let Animes = null;
// export const revalidate = 3600;

export default async function Home() {
  const searchHandler = async (searchQuery) => {
    "use server";
    if (searchQuery && searchQuery.length > 0) {
      const data = await getSearchAPI({ keyword: searchQuery });
      Animes = data?.data;
    } else Animes = null;
    revalidatePath("/");
  };

  return (
    <>
      <SearchServerActions
        // deactivateSearch={deactivateSearch}
        searchHandler={searchHandler}
      />
      {Animes === null ? (
        // <Suspense
        //   fallback={
        //     <>
        //       <CardSkeleton />
        //       <CardSkeleton />
        //       <CardSkeleton />
        //       <CardSkeleton />
        //       <CardSkeleton />
        //       <CardSkeleton />
        //     </>
        //   }
        // >
        <HomeList handleList={(anime) => console.log(anime)} />
      ) : // </Suspense>
      Animes.length ? (
        <div className=" relative mx-1 my-2 flex flex-wrap justify-center gap-3">
          <AnimeList animelist={Animes} />
        </div>
      ) : (
        <div className="mt-40 flex h-auto items-center justify-center">
          Not Found
        </div>
      )}
    </>
  );
}
// Search Handler

// Deactivate search

// const [searchedAnimeList , setSearchedAnimeList] = useState();
// const { searchKeyword } = useContext(GlobalContext);

// useEffect(() => {
//   const fetchData = async () => {
//     const res = await getSearchAPI({ keyword: searchKeyword });
//     setSearchedAnimeList(res?.data);
//     console.log(res);
//   };
//   if (searchKeyword) {
//     fetchData();
//     console.log(searchKeyword);
//   }
// }, [searchKeyword]);
