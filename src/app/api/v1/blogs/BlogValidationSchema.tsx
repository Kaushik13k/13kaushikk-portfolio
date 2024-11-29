import { z } from "zod";

const BlogSchema = z.object({
  blogTitle: z.string().min(1, "Blog title is required"),
  blogDescription: z.string().min(1, "Blog Desc is required"),
  blogImage: z.string().min(1, "Blog img is required"),
  avgReadTime: z.string().min(1, "Blog avg read time is required"),
  hostSource: z.string().min(1, "Blog source is required"),
  hostLink: z.string().min(1, "Blog Link is required"),
  publishDate: z.string().min(1, "Blog date is required"),
});

export default BlogSchema;
