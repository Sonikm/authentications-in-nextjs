"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Home Page 🏡{" "}
      <button
        className="bg-blue-700
         p-2 rounded-lg border border-gray-300 px-4 m-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
