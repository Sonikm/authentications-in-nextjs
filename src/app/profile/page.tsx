/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState("Nothing");

  const getUserDetails = async () => {
    try {
      const data = await axios.post("/api/users/me");
      setUserData(data.data.data._id);
      console.log(data.data.data._id);
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      console.log("user logout successfully");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>User Profile Page</h1>
      {userData == "Nothing" ? (
        "Nothing"
      ) : (
        <Link className="underline my-2 text-yellow-200" href={`/profile/${userData}`}>Show User Data</Link>
      )}
      <button
        className="bg-blue-700
         p-2 rounded-lg border border-gray-300 px-4 m-4"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-700
         p-2 rounded-lg border border-gray-300 px-4 m-4"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  );
};

export default ProfilePage;
