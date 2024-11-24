import { z } from "zod";

const ProjectSchema = z.object({
  projectTitle: z.string().min(1, "project title is required"),
  projectDescription: z.string().min(1, "project Desc is required"),
  projectImage: z.string().min(1, "project img is required"),
  projectArticle: z.string().min(1, "project Article is required"),
  publishDate: z.string().min(1, "Publish Date is required"),
});

export default ProjectSchema;
