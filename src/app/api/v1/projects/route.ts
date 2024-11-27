import prisma from "@prisma";
import logger from "@logger";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@helpers/middleware";
import { connectToDatabase } from "@helpers/server-helpers";
import ProjectSchema from "@api/projects/ProjectValidationSchema";

export async function GET(request: NextRequest) {
  try {
    logger.info("Inside GET project request.");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token validation failed.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token validated successfully.");

    await connectToDatabase();
    logger.info("Database connected.");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let projectDetails;
    if (id) {
      logger.info(`Fetching project with id: ${id}`);
      projectDetails = await prisma.projects.findUnique({
        where: { id },
      });

      if (!projectDetails) {
        logger.error(`Project with id: ${id} not found.`);
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
    } else {
      logger.info("Fetching all projects.");
      projectDetails = await prisma.projects.findMany();
    }

    return NextResponse.json(
      { message: "Project data fetch successful", data: projectDetails },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error occurred while fetching project:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database disconnected.");
  }
}

export async function POST(request: NextRequest) {
  try {
    logger.info("Inside POST project request.");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token validation failed.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token validated successfully.");

    const body = await request.json();
    logger.info("Received request body:", body);

    const validation = ProjectSchema.safeParse(body);
    if (!validation.success) {
      logger.error("Invalid project data provided:", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info("Project data validated successfully.");

    await connectToDatabase();
    logger.info("Database connected.");

    const projectDetails = await prisma.projects.create({ data: body });
    logger.info("Project added:", projectDetails);

    return NextResponse.json(
      { message: "Project added successfully", project: projectDetails },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error occurred while adding project:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database disconnected.");
  }
}

export async function PUT(request: NextRequest) {
  try {
    logger.info("Inside PUT project request.");

    const isValid = verifySessionToken(request);
    if (!isValid) {
      logger.error("Session token validation failed.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.info("Session token validated successfully.");

    const body = await request.json();
    logger.info("Received request body:", body);

    const validation = ProjectSchema.safeParse(body);
    if (!validation.success) {
      logger.error("Invalid project data provided:", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    logger.info("Project data validated successfully.");

    await connectToDatabase();
    logger.info("Database connected.");

    const { id, ...updateData } = body;
    if (!id) {
      logger.error("Project ID is missing.");
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await prisma.projects.update({
      where: { id },
      data: updateData,
    });
    logger.info("Project updated:", updatedProject);

    return NextResponse.json(
      { message: "Project updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error occurred while updating project:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    logger.info("Database disconnected.");
  }
}
