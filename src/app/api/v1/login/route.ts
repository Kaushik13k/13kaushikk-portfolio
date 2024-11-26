import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../helpers/server-helpers";
import prisma from "../../../../../prisma/client";
import * as crypto from "crypto";
import logger from "../../../../../logger";
import { generateAuthToken } from "../utils/jwt";
import LoginSchema from "./LoginValidationSchema";
import { SESSION_DURATION } from "../../../constants/jwt";

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
  try {
    const body = await request.json();
    const validation = LoginSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    await connectToDatabase();
    console.log("Database connected");

    const userDetails = await prisma.admin.findFirst({
      where: { username: body.user },
    });

    if (!userDetails) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { salt, hash, username } = userDetails;

    if (!salt || !hash) {
      console.error("Missing salt or hash in the database for user");
      return NextResponse.json(
        { message: "Server Error: Missing data" },
        { status: 500 }
      );
    }

    console.log("User details retrieved:", userDetails);

    const isValid = verifyPassword(body.password, salt, hash);
    console.log("Password is valid:", isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    const token = generateAuthToken(body.username);
    if (!token) {
      logger.error("Could'nt generate token.");
      return NextResponse.json(
        { message: "Could'nt create the token!" },
        { status: 400 }
      );
    }

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

    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected");
  }
}
