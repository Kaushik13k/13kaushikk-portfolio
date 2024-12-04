import { z } from "zod";

const AboutSchema = z.object({
  portfolioName: z.string().min(1, "Name is required").max(255),
  portfolioTitle: z
    .string()
    .min(1, "Title is required")
    .refine((val) => val.split(/\s+/).length <= 50, {
      message: "Title should not exceed 50 words",
    }),
  portfolioAbout: z
    .string()
    .min(1, "About is required")
    .refine((val) => val.split(/\s+/).length <= 600, {
      message: "Title should not exceed 600 words",
    }),
  portfolioEmail: z.string().min(1, "Email is required").max(255),
  highlightWords: z.string().min(1, "Highlight Words is required"),
});

export default AboutSchema;
