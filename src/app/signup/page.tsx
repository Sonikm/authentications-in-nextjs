"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const validation = () => {
    // TODO: Validation
    if (user.email === "" || user.username === "" || user.password === "") {
      toast.error("User data required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Invalid email..");
      return false;
    }

    return true;
  };

  const onSignup = async () => {
    if (isLoading || buttonDisabled) return;
    try {
      if (validation()) {
        setIsloading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success ", response.data);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.response.message);
      toast.error(error.response.data);
    } finally {
      setIsloading(false);
      setButtonDisabled(true);
      setUser({
        email: "",
        username: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-lg">{isLoading ? "Processing" : "Signup"}</h1>
      <hr />
      <label className="" htmlFor="username">
        Username
      </label>
      <input
        className="text-black bg-white rounded-lg border-gray-300 focus:outline-none mb-4 p-2 m-2 bottom-2 "
        type="text"
        id="username"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        onClick={onSignup}
        className={`${
          buttonDisabled || isLoading
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } bg-blue-500 p-2 rounded-lg my-2`}
      >
        {isLoading ? "Loading..." : "Signup"}
      </button>
      <Link className="underline" href={"/login"}>
        {" "}
        Visit Login Page
      </Link>
      <Toaster />
    </div>
  );
};

export default SignupPage;
