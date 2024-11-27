import logger from "@logger";
import prisma from "@prisma";
import * as crypto from "crypto";
import { generateAuthToken } from "@utils/jwt";
import { SESSION_DURATION } from "@app/constants/jwt";
import { NextRequest, NextResponse } from "next/server";
import LoginSchema from "@api/login/LoginValidationSchema";
import { connectToDatabase } from "@helpers/server-helpers";

function verifyPassword(
  password: string,
  saltHex: string,
  hashedPassword: string
): boolean {
  const salt = Buffer.from(saltHex, "hex");
  const saltedPassword = Buffer.concat([salt, Buffer.from(password, "utf-8")]);
  const newHashedPassword = crypto
    .createHash("sha256")
    .update(saltedPassword)
    .digest("hex");
  return newHashedPassword === hashedPassword;
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomBytes(8).toString("hex");
  logger.info(`[${requestId}] Starting login process.`);

  try {
    const body = await request.json();
    logger.debug(`[${requestId}] Request body received:`, body);

    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      logger.error(`[${requestId}] Login schema validation failed.`);
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info(`[${requestId}] Input validated successfully.`);

    await connectToDatabase();
    logger.info(`[${requestId}] Database connection established.`);

    const userDetails = await prisma.admin.findFirst({
      where: { username: body.user },
    });

    if (!userDetails) {
      logger.error(`[${requestId}] User not found: ${body.user}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    logger.info(
      `[${requestId}] User found in the database: ${userDetails.username}`
    );

    const { salt, hash, username } = userDetails;
    if (!salt || !hash) {
      logger.error(`[${requestId}] Missing salt or hash for user: ${username}`);
      return NextResponse.json(
        { message: "Server Error: Missing data" },
        { status: 500 }
      );
    }

    const isValid = verifyPassword(body.password, salt, hash);
    if (!isValid) {
      logger.error(`[${requestId}] Invalid password for user: ${username}`);
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    logger.info(`[${requestId}] Password validated successfully.`);

    const token = generateAuthToken(username);
    if (!token) {
      logger.error(
        `[${requestId}] Failed to generate auth token for user: ${username}`
      );
      return NextResponse.json(
        { message: "Couldn't create the token!" },
        { status: 400 }
      );
    }
    logger.info(`[${requestId}] Auth token generated successfully.`);

    const response = NextResponse.json(
      { message: "Login successful", user: { username } },
      { status: 200 }
    );

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_DURATION,
      path: "/",
    });
    logger.info(`[${requestId}] Session token set in response cookies.`);

    return response;
  } catch (error) {
    logger.error(`[${requestId}] Server error:`, error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info(`[${requestId}] Database connection closed.`);
  }
}
