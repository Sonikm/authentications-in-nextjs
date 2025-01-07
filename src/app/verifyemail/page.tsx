/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

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

  // get token when hit the url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    // const {query} = router;
    // const urlToken = query.token
  }, []);

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
        <div className="">
          <h2>Verified</h2>
          <link href="/login">Visit to Login</link>
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
