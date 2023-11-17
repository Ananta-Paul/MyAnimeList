"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
const LeftContext = createContext();

export function useLeft() {
  return useContext(LeftContext);
}
const AnimelistContainerWraper = ({ children, heading, Id }) => {
  const [left, setLeft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();
  const handleHover = () => {
    setIsShowing(true);
    setIsOpen(true);
    const container = containerRef.current;
    const leftWidth = container.offsetLeft;
    const rightWidth = window.innerWidth - leftWidth - container.offsetWidth;
    if (leftWidth < 40) setLeft(leftWidth);
    else if (rightWidth < 40) {
      if (heading) {
        const container1 = document.getElementById(heading);
        if (
          container1 &&
          container1.offsetWidth + container1.scrollLeft + 40 >=
            container1.scrollWidth
        )
          setLeft(80);
        else setLeft(40);
      } else setLeft(Math.min(96 + -1 * rightWidth, 96));
    } else setLeft(40);
    //console.log(leftWidth, rightWidth, 80 + -1 * rightWidth);
  };
  const handleLeave = () => {
    setLeft(null);
    setIsOpen(false);
  };
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mouseover", handleHover);
      container.addEventListener("mouseleave", handleLeave);

      return () => {
        container.removeEventListener("mouseover", handleHover);
        container.addEventListener("mouseleave", handleLeave);
      };
    }
  }, []);
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    router.push(`/info/${Id}`);
  };
  return (
    <div
      onClick={() => handleClick()}
      ref={containerRef}
      className="group/hs1 relative flex h-[220px] min-w-[150px] flex-col md:h-[336px] md:min-w-[220px] "
    >
      <LeftContext.Provider value={{ isShowing, left, setLeft }}>
        {children}
      </LeftContext.Provider>
    </div>
  );
};

const AnimelistImageWraper = ({ children }) => {
  const { left } = useContext(LeftContext);
  //const [leftStyle, setLeftStyle] = useContext("40");
  return (
    <div
      style={
        left !== null
          ? {
              left: `${-1 * left}px`,
            }
          : {}
      }
      className={` relative !h-[238px] w-full transition-all duration-200 ease-in-out group-hover/hs1:absolute group-hover/hs1:-top-[30px] group-hover/hs1:z-10 group-hover/hs1:!h-[250px]  group-hover/hs1:!w-[200px] md:!h-[300px]  md:group-hover/hs1:!h-[360px] md:group-hover/hs1:!w-[300px]`}
    >
      {children}
    </div>
  );
};

const AnimelistDetailsWraper = ({ children }) => {
  const { left, isShowing } = useLeft();

  return (
    <div
      style={
        left !== null
          ? {
              left: `${-1 * left}px`,
            }
          : {}
      }
      className={`sshadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] absolute -top-[30px] z-10 hidden h-[250px] w-[200px] rounded-lg border-gray-300  bg-slate-300 bg-opacity-60 p-3 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] backdrop-blur-sm group-hover/hs1:block dark:bg-gray-900 dark:bg-opacity-60 md:h-[360px] md:w-[300px]`}
    >
      {isShowing && children}
    </div>
  );
};
export {
  AnimelistContainerWraper,
  AnimelistImageWraper,
  AnimelistDetailsWraper,
};
