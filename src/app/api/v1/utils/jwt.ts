import logger from "@logger";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, SESSION_DURATION } from "@app/constants/jwt";

export function generateAuthToken(username: string) {
  try {
    logger.info(`Generating auth token for user: ${username}`);

    if (!JWT_SECRET || !SESSION_DURATION) {
      const missingVar = !JWT_SECRET ? "JWT_SECRET" : "SESSION_DURATION";
      logger.error(`${missingVar} is missing in environment variables.`);
      throw new Error(`${missingVar} is required but not found.`);
    }

    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: SESSION_DURATION,
    });

    logger.info("Auth token generated successfully.");
    return token;
  } catch (error) {
    logger.error(
      `Error generating auth token: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}
