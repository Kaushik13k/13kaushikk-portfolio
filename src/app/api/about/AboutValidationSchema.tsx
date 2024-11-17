import { z } from "zod";

const AboutSchema = z.object({
  portfolioName: z.string().min(1, "Name is required").max(255),
  portfolioTitle: z.string().min(1, "Title is required"),
  portfolioAbout: z.string().min(1, "About is required"),
  portfolioEmail: z.string().min(1, "Email is required"),
});

export default AboutSchema;
