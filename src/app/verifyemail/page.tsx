/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const VerifyEmailPage = ({searchParams}: any) => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const token = searchParams?.token;

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    } finally {
      // setError(false)
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl ">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black mt-4">
        {token ? token : "No token"}
      </h2>
      {verified && (
        <div className="flex flex-col items-center justify-center my-2">
          <h2>Verified 🌻 you can close this tab 😊</h2>
        </div>
      )}
      {error && (
        <div className="">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
