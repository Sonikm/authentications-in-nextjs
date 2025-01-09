"use client";

import Link from "next/link";

const Error = ({ error }: { error: { message?: string } }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl text-red-500">Error</h2>
      <p>{error.message || "An unknown error occurred."}</p>
      <Link href="/login" className="text-blue-500 underline">
        Go to Login
      </Link>
    </div>
  );
};

export default Error;
