import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/constants/jwt";

export function verifySessionToken(request: NextRequest) {
  const tokenCookie = request.cookies.get("session_token");

  if (!tokenCookie) {
    console.error("Session token not found");
    return null;
  }

  const token = tokenCookie.value;
  if (!JWT_SECRET) {
    console.error("hwt token not found!");
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}
