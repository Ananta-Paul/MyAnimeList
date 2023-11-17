import React from "react";
// export const revalidate = 0;
const Page = async () => {
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // await delay(5000);
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/list/all-list-items`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();
  // const res = await fetch(
  //   `https://api.jikan.moe/v4/top/anime?filter=bypopularity&order_by=popularity&limit=20`,
  // );
  // const data = await res.json();
  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
