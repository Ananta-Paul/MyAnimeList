"use client";
import Loading from "@/components/loading";
import React, {
  createContext,
  useState,
  useEffect,
  useTransition,
} from "react";
import { usePathname } from "next/navigation";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
export const GlobalContext = createContext();
export default function GlobalState({ children }) {
  const path = usePathname();
  const mainBody =
    path === "/signup" ? <>{children}</> : <Layout>{children}</Layout>;

  const { data: session } = useSession();
  // const [list, setList] = useState([]);
  const [theme, setTheme] = useState("");
  const [video, setVideo] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [searchKeyword, setSearchKeyword] = useState({ prev: "", pres: "" });
  const toggleTheme = () => {
    let thm = "dark";
    if (theme == "dark") thm = "light";
    localStorage.setItem("theme", thm);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(thm);
    setTheme(thm);
  };
  // const getList = async () => {
  //   try {
  //     const res = await fetch("/api/list/all-list-items", {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     //console.log(data?.data?.animes);

  //     if (data.success) setList(data?.data?.animes);
  //     else setList([]);
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   getList();
  // }, [session]);
  useEffect(() => {
    // Check if window and localStorage are available
    let thm;
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      // Check if localStorage is empty
      const storedTheme = window.localStorage.getItem("theme");
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (!storedTheme) {
        // If localStorage is empty, set the theme based on OS preference
        if (prefersDarkMode) {
          thm = "dark";
          setTheme("dark");
          localStorage.setItem("theme", "dark");
        } else {
          thm = "light";
          setTheme("light");
          localStorage.setItem("theme", "light");
        }
      } else {
        // If localStorage has a stored theme, use that
        thm = storedTheme;
        setTheme(storedTheme);
      }
      if (thm == "dark" || thm === "light") {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(thm);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        video,
        setVideo,
        searchKeyword,
        setSearchKeyword,
        isPending,
        startTransition,
      }}
    >
      {theme ? mainBody : <Loading />}
    </GlobalContext.Provider>
  );
}
