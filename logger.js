import winston from "winston";

const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    notice: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    critical: "red",
    error: "red",
    warn: "yellow",
    notice: "blue",
    info: "green",
    debug: "gray",
  },
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
});
winston.addColors(customLevels.colors);

export default logger;
