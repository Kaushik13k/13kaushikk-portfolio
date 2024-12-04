import logger from "@logger";
import prisma from "@prisma";
import * as crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@helpers/middleware";
import AboutSchema from "@api/about/AboutValidationSchema";
import { connectToDatabase } from "@helpers/server-helpers";

export async function GET(request: NextRequest) {
  const requestId = crypto.randomBytes(8).toString("hex");
  logger.info(`[${requestId}] Starting GET /about request.`);

  try {
    const url = new URL(request.url);
    const isPublic = url.searchParams.get("public") === "true";

    if (!isPublic) {
      logger.info(`[${requestId}] Verifying session token.`);
      const isValid = verifySessionToken(request);

      if (!isValid) {
        logger.error(`[${requestId}] Unauthorized access attempt.`);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      logger.info(`[${requestId}] Session token verified successfully.`);
    }

    await connectToDatabase();
    logger.info(`[${requestId}] Database connected.`);

    const userDetails = await prisma.portfolioAbout.findFirst();
    if (!userDetails) {
      logger.error(`[${requestId}] No user details found in the database.`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    logger.info(`[${requestId}] User details retrieved successfully.`);
    return NextResponse.json(
      { message: "Data fetch successful", data: userDetails },
      { status: 200 }
    );
  } catch (error) {
    logger.error(`[${requestId}] An error occurred: ${error}`);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info(`[${requestId}] Database connection closed.`);
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomBytes(8).toString("hex");
  logger.info(`[${requestId}] Starting POST /about request.`);

  try {
    logger.info(`[${requestId}] Verifying session token.`);
    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error(`[${requestId}] Unauthorized access attempt.`);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info(`[${requestId}] Session token verified successfully.`);

    const body = await request.json();
    logger.debug(`[${requestId}] Request body:`, body);

    const validation = AboutSchema.safeParse(body);
    if (!validation.success) {
      logger.error(`[${requestId}] Payload validation failed.`);
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info(`[${requestId}] Payload validated successfully.`);

    await connectToDatabase();
    logger.info(`[${requestId}] Database connected.`);

    try {
      const updatedUserDetails = await prisma.portfolioAbout.upsert({
        where: { portfolioEmail: body.portfolioEmail },
        update: {
          portfolioName: body.portfolioName,
          portfolioTitle: body.portfolioTitle,
          portfolioAbout: body.portfolioAbout,
          portfolioImage: body.portfolioImage,
          highlightWords: body.highlightWords,
          portfolioContact: body.portfolioContact,
          isHireMe: body.isHireMe,
          updatedAt: new Date(),
        },
        create: {
          portfolioName: body.portfolioName,
          portfolioTitle: body.portfolioTitle,
          portfolioAbout: body.portfolioAbout,
          portfolioEmail: body.portfolioEmail,
          portfolioImage: body.portfolioImage,
          portfolioContact: body.portfolioContact,
          highlightWords: body.highlightWords,
          isHireMe: body.isHireMe,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      logger.info(`[${requestId}] User details updated successfully.`);
      return NextResponse.json(
        { message: "Data updated successfully", data: updatedUserDetails },
        { status: 200 }
      );
    } catch (prismaError) {
      logger.error(`[${requestId}] Database operation failed: ${prismaError}`);
      return NextResponse.json(
        { message: "Database operation failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error(`[${requestId}] An error occurred: ${error}`);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info(`[${requestId}] Database connection closed.`);
  }
}
