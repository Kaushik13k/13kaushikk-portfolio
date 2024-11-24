import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../helpers/server-helpers";
import prisma from "../../../../prisma/client";
import ProjectSchema from "../../api/projects/ProjectValidationSchema";
import { verifySessionToken } from "../../../../helpers/middleware";

export async function GET(request: NextRequest) {
  try {
    console.log("inside the get project request");
    const isValid = verifySessionToken(request);

    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("auth passed");

    await connectToDatabase();
    console.log("Database connected");
    const projectDetails = await prisma.projects.findMany();

    if (!projectDetails) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Project data fetch successful", data: { projectDetails } },
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
    console.log("inside the post project request");
    const isValid = verifySessionToken(request);
    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("auth passed");
    const body = await request.json();
    console.log("the body is:", body);
    const validation = ProjectSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    await connectToDatabase();
    console.log("Database connected");

    const projectDetails = await prisma.projects.create({ data: body });
    console.log("added the project: ", projectDetails);

    if (!projectDetails) {
      console.error("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project added successfully", Project: { projectDetails } },
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
