import logger from "../../../../../logger";
import { generateAuthToken } from "../utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    logger.info("Inside the Get Auth Token.");
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get("username");

    if (!userName) {
      logger.error("Username not available in payload.");
      return NextResponse.json(
        { message: "Check the Username" },
        { status: 400 }
      );
    }
    const token = generateAuthToken(userName);
    if (!token) {
      logger.error("Could'nt generate token.");
      return NextResponse.json(
        { message: "Could'nt create the token!" },
        { status: 400 }
      );
    }
    logger.info("Token Generated Successfully.");
    return NextResponse.json(
      { message: "Login successful", jwtToken: { token } },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error occurred:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
