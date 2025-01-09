/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdatePasswordPage = ({ searchParams }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const token = searchParams?.token;

  const handlePasswordReset = async () => {
    if (newPassword === "" || confirmPassword === "" || loading) {
      return;
    } else if (confirmPassword !== newPassword) {
      return toast.error("Passwords do not match.");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/updatepassword", {
        newPassword,
        token,
      });
      setIsUpdated(true);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message || error.response.data.error);
      console.log(error.message || error.response.data.error);
    } finally {
    }
  };

  useEffect(() => {
    if (newPassword === "" || confirmPassword === "") setDisableButton(true);
    else setDisableButton(false);
  }, [newPassword, confirmPassword]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isUpdated ? (
        <div className="bg-green-700 p-3 rounded m-2">
          Password Updated Now 🌻 you can close this tab 😊
        </div>
      ) : (
        <>
          <h2 className="my-2 text-2xl ">Update your Password</h2>
          <label htmlFor="password">Password</label>
          <input
            className="p-2 rounded-lg text-gray-500 my-2 mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="p-2 rounded-lg text-gray-500 my-2 mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
          />

          <button
            onClick={handlePasswordReset}
            disabled={disableButton || loading}
            className={`${
              disableButton || loading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } bg-blue-500 p-2 rounded-lg`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <Toaster />
        </>
      )}
    </div>
  );
};

export default UpdatePasswordPage;
