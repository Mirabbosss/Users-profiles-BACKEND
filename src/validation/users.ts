import { z } from "zod";

export const validateCreateUser = (data: any) => {
  const userSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    surname: z.string({ required_error: "Surname is required" }),
    job: z.string({ required_error: "Job is required" }),
    salary: z.string({ required_error: "Salary is required" }),
    profilePhoto: z.any(),
  });

  return userSchema.parse(data);
};
