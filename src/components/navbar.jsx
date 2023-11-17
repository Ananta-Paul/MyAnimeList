"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { GlobalContext } from "@/context";
import Image from "next/image";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
// import { refResh } from "@/actions/serveractions";
// import { searchHandler } from "@/app/page";
const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { data: session, status } = useSession();
  const userRef = useRef();
  const menuRef = useRef();
  const searchRef = useRef();
  const searchBtnRef = useRef();
  const menuBtnRef = useRef();
  const { theme, toggleTheme, searchKeyword, setSearchKeyword, isPending } =
    useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const throttledSearch = useRef(
    throttle(
      (query) => setSearchKeyword((pre) => ({ prev: pre.pres, pres: query })),
      1000,
    ),
  );
  const debounceRequest = useCallback(
    debounce((value) => throttledSearch.current(value), 800),
    [],
  );
  const handleSearch = (event) => {
    debounceRequest(event.target.value);
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (path !== "/") {
      //console.log(path);
      router.replace("/");
    }
  };
  const toggleSearch = () => {
    handleSearchClick();
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUser = () => {
    setIsUserOpen(!isUserOpen);
  };

  // useEffect(() => {
  //   if (path == "/my_list") setTimeout(() => refResh(), 1000);
  //   console.log(path);
  // }, [path]);
  // useEffect(() => {
  //   searchHandler(searchKeyword);
  // }, [searchKeyword]);
  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.remove("light", "dark");
  //   document.documentElement.classList.add(newTheme);
  // };

  // useEffect(() => {
  //   // Update the DOM with the current theme
  //   if (theme == "dark" || theme === "light") {
  //     document.documentElement.classList.remove("light", "dark");
  //     document.documentElement.classList.add(theme);
  //   }
  // }, [theme]);
  useEffect(() => {
    //console.log("rerender");
    const handler = (e) => {
      if (!userRef.current?.contains(e.target)) setIsUserOpen(false);
      if (
        !menuBtnRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      )
        setIsMenuOpen(false);
      if (
        !searchBtnRef.current?.contains(e.target) &&
        !searchRef.current?.contains(e.target)
      )
        setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="border-gray-300 bg-slate-300  dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-1 py-3 sm:p-4">
        <a href="/" className="flex items-center">
          <Image
            src="/logoo.png"
            className="h-10 sm:mr-3"
            height={40}
            width={40}
            alt="Logo"
          />
          <span className=" xsm:text-lg  self-center whitespace-nowrap text-base font-semibold dark:text-white sm:text-2xl">
            MyAnimeList
          </span>
        </a>
        <div className="relative hidden md:block ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            value={inputValue}
            onChange={(e) => handleSearch(e)}
            onClick={(e) => handleSearchClick(e)}
            type="text"
            id="search-navbar"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search..."
          />
          {isPending && (
            <svg
              aria-hidden="true"
              className="absolute right-0 top-2 mr-2 inline h-5 w-5 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </div>
        <div className="flex items-center md:order-3">
          <button
            ref={searchBtnRef}
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            onClick={toggleSearch}
            aria-expanded="false"
            className="xsm:p-2.5 rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 sm:mr-3 md:hidden"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          {theme !== "dark" ? (
            <BsFillMoonStarsFill
              onClick={toggleTheme}
              className="mr-[2px] h-10 w-10 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-900 dark:focus:ring-gray-700 sm:mr-3"
            />
          ) : (
            <BsFillSunFill
              onClick={toggleTheme}
              className="mr-[2px] h-10 w-10 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-900 dark:focus:ring-gray-700 sm:mr-3"
            />
          )}
          {/* </div>
        <div className="flex items-center md:order-2"> */}
          {status === "authenticated" ? (
            <div ref={userRef} className="relative">
              <button
                type="button"
                className="m-1 flex rounded-full text-sm  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 sm:mr-3 md:mr-0"
                id="user-menu-button"
                aria-expanded="false"
                onClick={toggleUser}
                //data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session?.user?.image}
                  width={32}
                  height={32}
                  style={{ objectFit: "cover" }}
                  alt="user photo"
                />
              </button>

              <div
                className={`absolute right-0 z-50 ${
                  isUserOpen ? "block" : "hidden"
                } my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 `}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {session?.user.name}
                  </span>
                  <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                    {session?.user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={() => signOut({ redirect: false })}
                      className=" block w-auto cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              className="sm:text-md inline-block rounded-full bg-gray-500 px-[8px] py-1 text-sm text-white hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700 sm:px-3  md:dark:hover:text-blue-500"
              href={"/signup"}
            >
              Sign in
            </Link>
          )}
          <button
            ref={menuBtnRef}
            onClick={toggleMenu}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="w-full items-center justify-between md:order-1 md:flex md:w-auto "
          id="navbar-search"
        >
          <div
            ref={searchRef}
            className={`relative mt-3 md:hidden ${
              isSearchOpen ? "block" : "hidden"
            }`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={inputValue}
              onChange={(e) => handleSearch(e)}
              onClick={handleSearchClick}
              type="text"
              id="search-navbar"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
            />
            {isPending && (
              <svg
                aria-hidden="true"
                className="absolute right-0 top-2 mr-2 inline h-5 w-5 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </div>
          <ul
            ref={menuRef}
            className={`  mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700  dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8  md:border-0 md:p-0 md:dark:bg-gray-900 ${
              isMenuOpen ? "z-50 block" : "hidden"
            } md:flex `}
          >
            <li>
              <Link
                href="/"
                className={` block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  path === "/"
                    ? " md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    : ""
                }`}
                prefetch={true}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/my_list"
                className={` block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  path === "/my_list"
                    ? " md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    : ""
                }`}
                prefetch={false}
              >
                My List
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={` block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  path === "/about"
                    ? " md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    : ""
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
