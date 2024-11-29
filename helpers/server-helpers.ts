import logger from "@logger";
import prisma from "../prisma/client";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    logger.error(`error while connecting the databade : ${error}`);
    throw new Error("Unable to connect to Database");
  }
};
