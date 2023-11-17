import { AnimeList } from "./animelist";
import {
  getTopAiringAPI,
  getTopUpcomingAPI,
  getMostPopularAPI,
  getSeasonAPI,
  getRecommendationsAPI,
} from "@/config";
import { Suspense } from "react";
import HorizontalScroll from "../miniComponents/horizontalScroll";
import CardSkeleton from "../cardskeleton";
// import HorizontalScroll from "./miniComponents/horizontalScroll";
// const HorizontalList = ({ heading, animelist }) => {
//   // const handleScroll = async () => {
//   //   if (!animelist) return;
//   //   const container = document.getElementById(heading);
//   //   const widthin = window.innerWidth / 2 + 200;
//   //   if (container.scrollLeft == 0 && arrows.left)
//   //     setArrows((pre) => ({ ...pre, left: false }));
//   //   if (container.scrollLeft == 0 && !arrows.left)
//   //     setArrows((pre) => ({ ...pre, left: true }));
//   //   if (
//   //     container.offsetWidth + container.scrollLeft + 1 >=
//   //       container.scrollWidth &&
//   //     arrows.right
//   //   )
//   //     setArrows((pre) => ({ ...pre, right: false }));
//   //   if (
//   //     container.offsetWidth + container.scrollLeft + 1 >=
//   //       container.scrollWidth &&
//   //     !arrows.right
//   //   )
//   //     setArrows((pre) => ({ ...pre, right: true }));
//   //   console.log(arrows);
//   // }
//   // if (container.scrollLeft <= widthin) {
//   //   console.log("leftWorkingds");
//   //   for (let i = 0; i <= 10; i++) {
//   //     const lastItem = container.lastElementChild;
//   //     container.removeChild(lastItem);
//   //     container.prepend(lastItem);
//   //   }
//   //   container.scrollTo({
//   //     left: 3310,
//   //     behavior: "instant",
//   //   });
//   // }
//   // if (
//   //   container.offsetWidth + container.scrollLeft + widthin >=
//   //   container.scrollWidth
//   // ) {
//   //   console.log("rightworking");
//   //   for (let i = 0; i <= 10; i++) {
//   //     const firstItem = container.firstElementChild;
//   //     container.removeChild(firstItem);
//   //     container.appendChild(firstItem);
//   //   }
//   //   container.scrollTo({
//   //     left: 975,
//   //     behavior: "instant",
//   //   });
//   // }
//   //};
//   // useEffect(() => {
//   //   handleScroll();

//   //   console.log("handle");
//   // });

//   return (
//     <div className="group/hr  mt-2">
//       <HorizontalScroll heading={heading}>
//         <AnimeList animelist={animelist} heading={heading} />
//       </HorizontalScroll>
//     </div>
//   );
// };
// import React from 'react'
const Horizontallist = ({ heading, children }) => {
  return (
    <div className="group/hr  mt-2">
      <HorizontalScroll heading={heading}>
        <Suspense
          fallback={
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          }
        >
          {children}
        </Suspense>
      </HorizontalScroll>
    </div>
  );
};
export const GetTopAiring = async () => {
  const data = await getTopAiringAPI();
  return <AnimeList animelist={data?.data} heading={"Top Airing"} />;
};
export const GetMostPopular = async () => {
  const data = await getMostPopularAPI();
  return <AnimeList animelist={data?.data} heading={"Most Popular"} />;
};
export const GetTopUpcoming = async () => {
  const data = await getTopUpcomingAPI();
  return <AnimeList animelist={data?.data} heading={"Top Upcoming"} />;
};
export const GetSeasonData = async () => {
  const data = await getSeasonAPI();
  return <AnimeList animelist={data?.data} heading={"Top Seasonal"} />;
};
export const GetRecommendations = async ({ Id }) => {
  const rec = await getRecommendationsAPI(Id);
  const recomendations = await rec?.data.slice(0, 25).map((it) => {
    return it.entry;
  });
  // console.log("rec" + recomendations);
  return (
    <>
      {recomendations && recomendations.length !== 0 && (
        <div className="group/hr  mt-2">
          <HorizontalScroll heading={"Recommended for you"}>
            <AnimeList
              animelist={recomendations}
              heading={"Recommended for you"}
            />
          </HorizontalScroll>
        </div>
      )}
    </>
  );
};

export default Horizontallist;
