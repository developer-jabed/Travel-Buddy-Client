import { z } from "zod";

export const createTravelerValidationSchema = z.object({
  password: z.string().nonempty("Password is required"),
  traveler: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    bio: z.string().optional(),
    age: z.number().int().positive().optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    travelStyle: z.enum([
      "BUDGET",
      "LUXURY",
      "ADVENTURE",
      "SOLO",
      "BACKPACKING",
      "FAMILY",
      "FRIENDS",
      "HONEYMOON"
    ]).optional(),
    interests: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    profilePhoto: z.string().url().optional(),
  }),
});
