import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request:NextRequest) {
  try {
    const token = await request.cookies.get("token")?.value || "";
    const verifiedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return verifiedToken.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
