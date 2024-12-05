import { z } from "zod";

const LoginSchema = z.object({
  user: z.string().min(1, "Username is required").max(255),
  password: z.string().min(1, "Password is required"),
});

export default LoginSchema;
