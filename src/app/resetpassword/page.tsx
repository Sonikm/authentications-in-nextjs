/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestReset = async () => {
    if (disableButton || loading) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", { email });
      toast.success(response.data.message);
      setDisableButton(false);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message || error.response.data.error);
      toast.error("Invalid email");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email === "") setDisableButton(true);
    else setDisableButton(false);
  }, [email]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="my-2 text-2xl ">Reset your Password</h2>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-lg text-gray-500 my-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        id="email"
        placeholder="email"
      />
      <button
        onClick={handleRequestReset}
        className={`${
          disableButton || loading
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } bg-blue-500 p-2 rounded-lg`}
      >
        {loading ? "Loading..." : " Reset Password"}
      </button>

      <Toaster />
    </div>
  );
};

export default ResetPassword;
