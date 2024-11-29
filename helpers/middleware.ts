import * as jwt from "jsonwebtoken";
import logger from "@logger";
import { NextRequest } from "next/server";
import { JWT_SECRET } from "@/app/constants/jwt";

export function verifySessionToken(request: NextRequest) {
  const tokenCookie = request.cookies.get("session_token");

  if (!tokenCookie) {
    return null;
  }

  const token = tokenCookie.value;
  if (!JWT_SECRET) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
