import * as z from "zod";

export const products = z.object({
  images: z.object({ url: z.string() }).array(),
  description: z.optional(z.string()),
  name: z.string().min(3),
  status: z.optional(z.string()),
  price: z.coerce.number().min(1),
  stock: z.optional(z.coerce.number()),
  // availableAt: z.date()
  availableAt: z.optional(z.string())

  // isFeatured: z.boolean().default(false).optional(),
  // isArchived: z.boolean().default(false).optional()
});
