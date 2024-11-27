import logger from "@logger";
import prisma from "@prisma";
import { NextRequest, NextResponse } from "next/server";
import BlogSchema from "@api/blogs/BlogValidationSchema";
import { verifySessionToken } from "@helpers/middleware";
import { connectToDatabase } from "@helpers/server-helpers";

export async function GET(request: NextRequest) {
  try {
    logger.info("Handling GET request for blogs");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token verification failed");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token verified successfully");

    await connectToDatabase();
    logger.info("Database connection established");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    let blogDetails;

    if (id) {
      logger.info(`Fetching blog with ID: ${id}`);
      blogDetails = await prisma.blogs.findUnique({ where: { id } });

      if (!blogDetails) {
        logger.error(`No blog found with ID: ${id}`);
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
    } else {
      logger.info("Fetching all blogs");
      blogDetails = await prisma.blogs.findMany();
    }

    return NextResponse.json(
      { message: "Blog data fetched successfully", data: blogDetails },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error during GET request:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database connection closed");
  }
}

export async function POST(request: NextRequest) {
  try {
    logger.info("Handling POST request for blogs");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token verification failed");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token verified successfully");

    const body = await request.json();
    const validation = BlogSchema.safeParse(body);

    if (!validation.success) {
      logger.error("Payload validation failed", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info("Payload validated successfully");

    await connectToDatabase();
    logger.info("Database connection established");

    const blogDetails = await prisma.blogs.create({ data: body });
    logger.info("Blog created successfully:", JSON.stringify(blogDetails));

    return NextResponse.json(
      { message: "Blog added successfully", data: blogDetails },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error during POST request:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database connection closed");
  }
}

export async function PUT(request: NextRequest) {
  try {
    logger.info("Handling PUT request for blogs");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token verification failed");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token verified successfully");

    const body = await request.json();
    const validation = BlogSchema.safeParse(body);

    if (!validation.success) {
      logger.error("Payload validation failed", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info("Payload validated successfully");

    await connectToDatabase();
    logger.info("Database connection established");

    const { id, ...updateData } = body;
    if (!id) {
      logger.error("Blog ID is missing in the request body");
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.blogs.update({
      where: { id },
      data: updateData,
    });

    logger.info(
      `Blog updated successfully: ID ${id}`,
      JSON.stringify(updatedBlog)
    );
    return NextResponse.json(
      { message: "Blog updated successfully", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error during PUT request:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database connection closed");
  }
}
