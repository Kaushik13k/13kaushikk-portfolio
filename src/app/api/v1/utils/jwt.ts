import * as jwt from "jsonwebtoken";
import logger from "../../../../../logger";
import { JWT_SECRET, SESSION_DURATION } from "../../../constants/jwt";

export function generateAuthToken(username: string) {
  try {
    logger.info("Inside the Generate Auth Token");
    if (!JWT_SECRET || !SESSION_DURATION) {
      logger.error("Could'nt find JWT_SECRET or SESSION_DURATION in .ENV");
      throw new Error("Could'nt find JWT_SECRET or SESSION_DURATION in .ENV");
    }
    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: SESSION_DURATION,
    });

    if (!token) {
      logger.error("Could'nt Generate token.");
      throw new Error("Could'nt Generate token.");
    }
    return token;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`There was an error generating the token: ${error.message}`);
    } else {
      logger.error(`There was an error generating the token: ${String(error)}`);
    }
    return null;
  }
}
