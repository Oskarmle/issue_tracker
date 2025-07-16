import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "FirstName is required").max(50),
  lastName: z.string().min(1, "LastName is required").max(50),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
