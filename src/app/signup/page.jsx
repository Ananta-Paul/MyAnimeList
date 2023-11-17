"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { getRandomCharacterAPI } from "@/config";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [state, setState] = useState("log in");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // console.log(callbackUrl);
  useEffect(() => {
    if (status === "authenticated") location.replace(callbackUrl);
  }, [status]);

  const validCheak = () => {
    //setLoading(true);

    if (state === "sign up") {
      if (password !== cPassword) {
        document
          .getElementById("confirm_password")
          ?.setCustomValidity("Passwords Don't Match");
      } else {
        //console.log("y");
        document.getElementById("confirm_password").setCustomValidity("");
      }
    }
    //setLoading(false);
  };
  const GoogleSign = () => {
    const res = signIn("google", { redirect: false, callbackUrl });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    //setLoading(true);
    document.getElementById("confirm_password")?.setCustomValidity("");
    const user = {
      name,
      email,
      password,
    };
    sendData(user);
    //setLoading(false);
  };
  async function loginCred() {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    //console.log(res);
    if (res.error) {
      setError("Invalid Credentials");
      animate();
      return;
    }
    if (res.ok) {
      setCPassword("");
      setPassword("");
      setEmail("");
      setName("");
      // console.log("cU" + callbackUrl);
      location.replace(callbackUrl);
    }
  }
  async function sendData(user) {
    try {
      if (state === "log in") {
        loginCred();
        return;
      }
      const image = await getRandomCharacterAPI();
      // console.log(image);
      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image,
        }),
      });
      const errorData = await res.json();
      if (errorData.error) {
        setError(errorData.error);
        animate();
      }
      if (res.ok) {
        loginCred();
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Error during registration: ");
      animate();
    }
  }
  async function animate() {
    var element = document.getElementById("error");
    if (element) {
      element.offsetHeight;
      element.classList.remove("error");
      setTimeout(() => {
        element.classList.add("error");
      }, 10);
    }
  }

  return status !== "unauthenticated" ? (
    <Loading />
  ) : (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 ">
      <div className="min-h-min min-w-min rounded-lg sm:rounded-xl">
        <div className="group/card relative">
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition duration-1000 group-hover/card:opacity-100 group-hover/card:duration-200"></div>
          <div className="relative z-10 flex flex-col items-center justify-around rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 p-3 text-center  dark:bg-gradient-to-b dark:from-gray-600 dark:to-gray-900 sm:rounded-xl">
            <Image
              alt="logo"
              className="mx-auto h-20 w-20 sm:h-28 sm:w-28"
              src="/logoo.png"
              height={120}
              width={120}
            />
            <div>
              <h3 className=" text-lg text-gray-800 dark:text-gray-100">
                {state === "sign up" ? "Sign Up" : "Login"}
              </h3>
              <h2 id="error" className=" text-orange-700 dark:text-orange-300 ">
                {error ? "Error : " + error : <br />}
              </h2>
            </div>
            <form
              onSubmit={submitHandler}
              className={`mb-8 ${
                state === "log in" ? "sm:px-4   " : "px-3 sm:px-10 "
              }`}
            >
              {state === "sign up" && (
                <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                  <FontAwesomeIcon
                    className="fa-lg my-auto ml-2"
                    icon={faUser}
                  />
                  <input
                    type="text"
                    name="name"
                    className="m-[2px] ml-2 w-[216px] bg-transparent focus:outline-none sm:ml-1"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                <FontAwesomeIcon
                  className="fa-lg my-auto ml-2"
                  icon={faEnvelope}
                />

                <input
                  type="email"
                  name="username"
                  className="m-[2px] ml-2  w-[216px] bg-transparent focus:outline-none sm:ml-1"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                <FontAwesomeIcon className="fa-lg my-auto ml-2" icon={faKey} />

                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="m-[2px] ml-2 w-[196px] bg-transparent focus:outline-none sm:ml-1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  className={`fa-md  my-auto ${show ? "mx-[1px]" : ""}`}
                  onClick={() => setShow(!show)}
                  icon={show ? faEye : faEyeSlash}
                />
              </div>
              {state === "sign up" && (
                <div className="mx-auto my-3 flex w-min rounded-xl border-2 border-solid border-gray-400 bg-white p-1 font-light text-slate-400 dark:border-lime-500 dark:bg-gray-900 dark:text-lime-500 sm:p-[5px]">
                  <FontAwesomeIcon
                    className="fa-lg my-auto ml-2"
                    icon={faKey}
                  />
                  <input
                    type={show ? "text" : "password"}
                    name="cpassword"
                    className="m-[2px] ml-2 w-[196px] bg-transparent focus:outline-none sm:ml-1"
                    placeholder="Confirm Password"
                    id="confirm_password"
                    onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    className={`fa-md  my-auto ${show ? "mx-[1px]" : ""}`}
                    onClick={() => setShow(!show)}
                    icon={show ? faEye : faEyeSlash}
                  />
                </div>
              )}

              <button
                type="submit"
                onClick={validCheak}
                className="text-md group relative mb-2 mr-2 mt-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
              >
                <span className="relative rounded-md bg-white px-4 py-[6px] transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : state === "log in" ? (
                    " Log In"
                  ) : (
                    " Sign Up"
                  )}
                </span>
              </button>
            </form>

            <button
              onClick={GoogleSign}
              type="button"
              className=" dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
            <div className="relative bottom-0">
              <div className="text-gray-600 dark:text-gray-100">
                {state === "log in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <strong
                  className="cursor-pointer text-blue-500"
                  onClick={() => {
                    setState((prevValue) =>
                      prevValue === "log in" ? "sign up" : "log in",
                    );
                    setError("");
                  }}
                >
                  {state !== "log in" ? " Log In" : " Sign Up"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
