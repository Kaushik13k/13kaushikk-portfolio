import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../helpers/server-helpers";
import prisma from "../../../../prisma/client";
import BlogSchema from "../../api/blogs/BlogValidationSchema";
import { verifySessionToken } from "../../../../helpers/middleware";

export async function GET(request: NextRequest) {
  try {
    console.log("Inside the GET blog request");
    const isValid = verifySessionToken(request);

    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("Auth passed");

    await connectToDatabase();
    console.log("Database connected");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let blogDetails;
    if (id) {
      console.log(`Fetching blog with id: ${id}`);

      blogDetails = await prisma.blogs.findUnique({
        where: { id: id },
      });

      if (!blogDetails) {
        console.error("Blog not found");
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
    } else {
      console.log("Fetching all blogs");
      blogDetails = await prisma.blogs.findMany();
    }

    return NextResponse.json(
      { message: "Blog data fetch successful", data: blogDetails },
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
    console.log("inside the post blog request");
    const isValid = verifySessionToken(request);
    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("auth passed");
    const body = await request.json();
    console.log("the body is:", body);
    const validation = BlogSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    await connectToDatabase();
    console.log("Database connected");

    const blogDetails = await prisma.blogs.create({ data: body });
    console.log("added the blog: ", blogDetails);

    if (!blogDetails) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog added successfully", Blog: { blogDetails } },
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

export async function PUT(request: NextRequest) {
  try {
    console.log("Inside the PUT blog request");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("Auth passed");

    const body = await request.json();
    console.log("The body is:", body);

    const validation = BlogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    await connectToDatabase();
    console.log("Database connected");

    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.blogs.update({
      where: { id },
      data: updateData,
    });
    console.log("Updated the blog: ", updatedBlog);

    return NextResponse.json(
      { message: "Blog updated successfully", Blog: updatedBlog },
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
