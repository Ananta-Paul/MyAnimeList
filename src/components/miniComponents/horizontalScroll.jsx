"use client";
import React, { useEffect, useState } from "react";

const HorizontalScroll = ({ children, heading }) => {
  const [arrows, setArrows] = useState({ left: false, right: true });
  const [xDown, setXDown] = useState(null);
  const [yDown, setYDown] = useState(null);

  // const handleTouchStart = (e) => {
  //   // const firstTouch = event.touches[0];
  //   // setXDown(firstTouch.clientX);
  //   // setYDown(firstTouch.clientY);
  //   // is not near edge of view, exit

  //   if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;

  //   // prevent swipe to navigate gesture

  //   e.preventDefault();
  // };

  // const handleTouchMove = (event) => {
  //   if (!xDown || !yDown) {
  //     return;
  //   }

  //   const xUp = event.touches[0].clientX;
  //   const yUp = event.touches[0].clientY;

  //   const xDiff = xDown - xUp;
  //   const yDiff = yDown - yUp;

  //   if (Math.abs(xDiff) > Math.abs(yDiff)) {
  //     if (xDiff > 0) {
  //       // Left swipe detected, prevent the default behavior
  //       event.preventDefault();
  //     } else {
  //       // Right swipe detected, prevent the default behavior
  //       event.preventDefault();
  //     }
  //   }

  //   setXDown(null);
  //   setYDown(null);
  // };

  const handleScroll = async (e) => {
    const container = document.getElementById(heading);
    const widthin = window.innerWidth / 2 + 200;

    if (container.scrollLeft === 0) {
      setArrows((prev) => ({ ...prev, left: false }));
    } else {
      setArrows((prev) => ({ ...prev, left: true }));
    }
    if (
      container.offsetWidth + container.scrollLeft + 1 >=
      container.scrollWidth
    ) {
      setArrows((prev) => ({ ...prev, right: false }));
    } else {
      setArrows((prev) => ({ ...prev, right: true }));
    }
  };
  useEffect(() => {
    handleScroll();
  }, []);
  return (
    <div className=" relative w-full">
      <h2 className=" absolute top-0 w-full border-gray-300 bg-slate-300 py-1 pl-4 text-lg font-medium  text-gray-900 dark:bg-gray-900 dark:text-white">
        {heading}
      </h2>
      <div
        id={heading}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        onScroll={() => {
          handleScroll();
        }}
        className=" scrollbar-hide flex gap-2 overflow-x-scroll overscroll-x-none scroll-smooth px-2 pt-9 transition-none"
      >
        {children}
      </div>
      {arrows.left && (
        <button
          onClick={() =>
            document.getElementById(heading).scrollBy(-window.innerWidth / 2, 0)
          }
          type="button"
          className="group absolute left-0 top-0 z-30 hidden h-full cursor-pointer items-center justify-center px-4 focus:outline-none sm:group-hover/hr:flex"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/60 dark:group-hover:bg-gray-800/80 dark:group-focus:ring-gray-800/90">
            <svg
              className="h-4 w-4 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
      )}
      {arrows.right && (
        <button
          onClick={() =>
            document.getElementById(heading).scrollBy(window.innerWidth / 2, 0)
          }
          type="button"
          className="group absolute right-0 top-0 z-30 hidden h-full cursor-pointer items-center justify-center px-4 focus:outline-none  sm:group-hover/hr:flex"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/60 dark:group-hover:bg-gray-800/80 dark:group-focus:ring-gray-800/90">
            <svg
              className="h-4 w-4 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default HorizontalScroll;
