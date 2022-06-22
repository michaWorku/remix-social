import {z} from 'zod'

export const CreatePost = z.object({
  title: z.string().min(4),
  body: z.string().min(10),
})