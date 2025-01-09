"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const onLogin = async () => {
    if (isLoading || buttonDisabled) return;
    try {
      if (user.email === "" || user.password === "") {
        return toast.error("User data required");
      }
      setIsloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success ", response);
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error");

      // If error response contains an error message, show it
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setUser({ email: "", password: "" });
      setIsloading(false);
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-lg">{isLoading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="text-black bg-white rounded-lg border-gray-300 focus:outline-none mb-4 p-2 m-2 bottom-2 "
        type="email"
        id="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="text-black bg-white rounded-lg border-gray-300 focus:outline-none mb-4 p-2 m-2 bottom-2 "
        type="password"
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className={`${
          buttonDisabled || isLoading
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } bg-blue-500 p-2 rounded-lg my-2`}
      >
        {isLoading ? "Loading..." : " Login"}
      </button>
      <Link className="underline" href={"/signup"}>
        Visit Signup Page
      </Link>
      <Link className="underline" href={"/resetpassword"}>
        Reset Password
      </Link>

      <Toaster />
    </div>
  );
};

export default LoginPage;
