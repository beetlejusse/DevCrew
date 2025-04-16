import * as z from "zod"

export const createHackSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: "Title must be at least 3 characters" }),
        description: z
            .string()
            .min(10, { message: "Description must be at least 10 characters" }),
        startDate: z.date({ required_error: "Start date is required" }),
        endDate: z.date({ required_error: "End date is required" }),
        url: z
            .string()
            .url({ message: "Please enter a valid URL" })
            .optional()
            .or(z.literal("")),
        coverPhoto: z.string().url({ message: "Please enter a valid image URL" }),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });



export const signupSchema = z.object({
    userName: z.string().min(3, {
        message: "Username must be at least 3 characters long",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
})

export const signupFormSchema = z.object({
    userName: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })