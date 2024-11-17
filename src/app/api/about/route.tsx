import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "../../../../helpers/middleware";
import { connectToDatabase } from "../../../../helpers/server-helpers";
import prisma from "../../../../prisma/client";
import AboutSchema from "./AboutValidationSchema";

export async function GET(request: NextRequest) {
  try {
    const isValid = verifySessionToken(request);

    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    console.log("Database connected");
    const userDetails = await prisma.portfolioAbout.findFirst();

    if (!userDetails) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Data fetch successful", data: { userDetails } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected");
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("inside the post request");
    const isValid = verifySessionToken(request);
    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("auth passed");
    const body = await request.json();
    const validation = AboutSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    console.log("validation passed");
    await connectToDatabase();
    console.log("Database connected");
    console.log("Payload before upsert:", body);
    try {
      const updatedUserDetails = await prisma.portfolioAbout.upsert({
        where: {
          portfolioEmail: body.portfolioEmail,
        },
        update: {
          portfolioName: body.portfolioName,
          portfolioTitle: body.portfolioTitle,
          portfolioAbout: body.portfolioAbout,
          portfolioImage: body.portfolioImage,
          portfolioContact: body.portfolioContact,
          updatedAt: new Date(),
        },
        create: {
          portfolioName: body.portfolioName,
          portfolioTitle: body.portfolioTitle,
          portfolioAbout: body.portfolioAbout,
          portfolioEmail: body.portfolioEmail,
          portfolioImage: body.portfolioImage,
          portfolioContact: body.portfolioContact,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log("Updated user details:", updatedUserDetails);
      return NextResponse.json(
        { message: "Data updated successfully", data: updatedUserDetails },
        { status: 200 }
      );
    } catch (prismaError) {
      console.error("Prisma error:", prismaError);
      throw new Error("Prisma operation failed");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected");
  }
}
