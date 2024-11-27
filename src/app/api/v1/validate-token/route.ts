import logger from "@logger";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@helpers/middleware";

export async function GET(request: NextRequest) {
  try {
    logger.info("Verifying session token.");
    const isValid = verifySessionToken(request);

    if (!isValid) {
      logger.error("Session token is invalid or missing.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    logger.info("Session token validated successfully.");
    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (error) {
    logger.error("Error verifying session token:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
