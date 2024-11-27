import logger from "@logger";
import { generateAuthToken } from "@api/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    logger.info("Received request to generate auth token.");

    const { searchParams } = new URL(request.url);
    const userName = searchParams.get("username");

    if (!userName) {
      logger.error("Username not provided in the request.");
      return NextResponse.json(
        { message: "Username is required." },
        { status: 400 }
      );
    }

    logger.info(`Generating token for user: ${userName}`);
    const token = generateAuthToken(userName);

    logger.info("Token generated successfully.");
    return NextResponse.json(
      { message: "Login successful", jwtToken: token },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error while generating auth token:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
