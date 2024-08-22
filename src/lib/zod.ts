import { z } from "zod"
 
export const signUpFormSchema = z.object({
  username: z.string().min(2).max(32),
  email: z.string().email(),
  password: z.string().min(6).max(32)
})
 
export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})