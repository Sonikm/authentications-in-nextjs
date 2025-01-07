import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "Envalid Token" }, { status: 400 });
  }

  return NextResponse.json({ message: "User found", data: user });
}
