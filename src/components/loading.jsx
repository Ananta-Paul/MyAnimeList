import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center">
      {/* <div
        className="bg-blue-400 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="bg-green-400 mx-1 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="bg-purple-400 p-2  w-4 h-4 rounded-full animate-bounce red-circle"
        style={{ animationDelay: "0.3s" }}
      ></div> */}
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
