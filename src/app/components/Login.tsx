/* eslint-disable react/no-unescaped-entities */
"use-client";
import { login } from "@/redux/api";
import { login_failed, login_success } from "@/redux/user_redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  const [username, set_username] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const { is_fetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.user.current_user);

  const handle_login = (e: MouseEvent) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  useEffect(() => {
    if (current && !current.is_admin && !error) {
      router.push("/shop");
    } else if (current && current.is_admin && !error) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [current, error, router]);

  // useEffect(() => {
  //     if (current &&  !error) {
  //         router.push("/shop");
  //     } else if (currentis_admin) {
  //         router.push("/dashboard");
  //     }else{
  //         router.push("/login");

  //     }
  // }, [current, error, router]);

  // toast.error("error",{
  //     position: "top-left",
  //     autoClose: 5000,
  //     closeOnClick: true,
  //     theme: "light",
  //     transition: Bounce
  // })

  return (
    <>
      <div className="flex justify-center w-screen h-screen items-center">
        <div
          className="
    grid grid-cols-2
    w-[750px] h-[450px] 
    rounded-[10px]
    bg-[#5B6EE8]"
        >
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-white font-bold">
              <p className="text-[30px]">
                WELCOME BACK,
                <br />
                <span className="text-[20px]">
                  LET'S FIND YOUR PRODUCTS
                </span>{" "}
              </p>
            </div>
          </div>
          <div
            className="
        bg-white w-full h-full 
        rounded-tr-[9px] rounded-tl-[35px] 
        rounded-bl-[35px] rounded-br-[9px]  "
          >
            <div className="flex flex-col  justify-center items-center w-full h-[420px] ">
              <div
                className="
                flex justify-center mb-7
                text-[24px] font-bold text-[#13304D]"
              >
                <h1>Sign In</h1>
              </div>
              {error && (
                <span className="text-xs text-center text-red-600 w-full mb-2">
                  Wrong username or password
                </span>
              )}
              <div className="flex">
                <input
                  type="text"
                  className="
                    w-[270px] py-2 px-3 text-[12px]
                    shadow-lg border-[#e6e6e6]
                    focus:outline-none rounded-full 
                                    "
                  name="username"
                  placeholder="Username"
                  onChange={(e) => set_username(e.target.value)}
                  value={username}
                />
              </div>
              <div className="flex mt-5">
                <input
                  type="password"
                  className="
                        w-[270px] py-2 px-3 text-[12px]
                        shadow-lg border-[#e6e6e6]
                        focus:outline-none rounded-full"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => set_password(e.target.value)}
                  value={password}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="
                        bg-[#5B6EE8] font-normal
                        rounded-full text-white 
                        px-5 py-2 mt-5"
                  onClick={handle_login}
                >
                  Log in
                </button>
              </div>
            </div>

            <p className="text-[12px] ml-10">
              Don't have an account ?{" "}
              <span>
                <Link href="/create" className="text-[#5B6EE8]">
                  Create account
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// toast.promise(
//     login(data.email, data.password).json((json) => {
//       storeToken(json.access, 'access')
//       storeToken(json.refresh, 'refresh')
//       const redirectUri = Cookies.get('redirectUri') ?? '/dashboard'
//       Cookies.remove('redirectUri')
//       router.push(redirectUri)
//     }),
//     {
//       pending: 'Authentification en cours...',
//       success: 'Authentification réussie 👌',
//       error: 'An error occured, please try again'
//     },
//     { toastId: 'login-toast' }
//   )
