import { z } from "zod";

export const scheduleInterviewSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
    domainId: z.string().nonempty("Domain ID is required"),
    datetime: z.string().datetime().nonempty("Date is required"),//yyyy-mm-dd format
    durationMinutes: z.number().positive("Duration must be a positive number"),
    meetLink: z.string().url("Invalid URL format for meet link")
});

export const updateInterviewSchema = z.object({
    datetime: z.string().datetime("Invalid date format").optional(),
    durationMinutes: z.number().positive("Duration must be a positive number").optional(),
    meetLink: z.string().url("Invalid URL format for meet link").optional()
});