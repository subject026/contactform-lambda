import * as z from "zod";

export const FormDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type TFormDTO = z.infer<typeof FormDTO>;
