import { Image } from "@prisma/client";

export type SelectProduct = {
  userId: string;
  id: string;
  name: string;
  description: string;
  status: string;
  price: string;
  stock: string;
  availableAt: string;
  createdAt: string;
  images: Image[];
};
