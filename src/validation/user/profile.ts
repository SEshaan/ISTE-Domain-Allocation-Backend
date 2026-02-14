import {z} from "zod";

export const completeProfileSchema = z.object({
    name: z.string().optional(),
    regNo: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    branch: z.string().nonoptional("Branch is required"),
    githubLink: z.string().url("Invalid URL format for Github link").nonoptional("Github link is required"),
    leetcodeLink: z.string().url("Invalid URL format for Leetcode link").nonoptional("Leetcode link is required"),
})

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    regNo: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    branch: z.string().optional(),
    githubLink: z.string().url("Invalid URL format for Github link").optional(),
    leetcodeLink: z.string().url("Invalid URL format for Leetcode link").optional(),
})