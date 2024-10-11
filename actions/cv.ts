import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "../lib/openai";

export const CVSchema = z.object({
  name: z.string(),
  profession: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    portfolio: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  bio: z.string().optional(),
  soft_skills: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  cetifications: z.array(z.string()).optional(),
  native_language: z.string().optional(),
  languages: z.array(z.string()).optional(),
  experience: z.array(
    z
      .object({
        company: z.string(),
        position: z.string(),
        duration: z.string(),
        description: z.string(),
      })
      .optional()
  ),
  education: z.array(
    z
      .object({
        institution: z.string(),
        degree: z.string(),
        duration: z.string(),
      })
      .optional()
  ),
  projects: z
    .array(
      z
        .object({
          name: z.string(),
          url: z.string(),
          description: z.string(),
          technologies: z.array(z.string()),
        })
        .optional()
    )
    .optional(),
});

export const cvToJSON = async (buffer: Buffer) => {
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: CVSchema,
      prompt:
        "analyze and extract data from the CV attached to the prompt. Complete the data according to the CVSchema schema. If the schema does not contain fields that appear in the CV, create a new field in the returned object." +
        buffer.toString(),
    });
    console.log("Extracted text:", result.object);
    return result.object;
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Extracting text from CV failed.");
  }
};

export const enhanceCv = async (extractedCV: object) => {
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: CVSchema,
      prompt:
        "You are an outstanding career advisor and professionally deal with improving CVs according to ATS standards. You have been tasked with improving the received CV according to your best knowledge in order to maximize the candidate's chances of employment. The ATS standards that a CV must meet are - short and interesting bio, Organize all CV sections (Make sure that your document contains all the most important CV sections, such as: professional summary, skills in the CV, work experience, education), Make sure that each section has an appropriate heading (The point is that the document clearly defines the boundaries of subsequent sections and titles them according to standard terminology.), Check the spelling of the CV text and typos" +
        JSON.stringify(extractedCV),
    });
    console.log("Enhanced CV:", result.object);
    return result.object;
  } catch (error) {
    console.error("Error enhancing CV:", error);
    throw new Error("Enhancing CV failed.");
  }
};
