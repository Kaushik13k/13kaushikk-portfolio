import logger from "@logger";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  logger.info("Inside the Logout Route.");
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );
  logger.info("Successfully the Logged-Out.");
  response.cookies.set("session_token", "", { maxAge: 0, path: "/" });
  return response;
}
