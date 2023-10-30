import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Products } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body:Products = await request.json();
  const { title, price, brandId } = body;
  const productCreate = await prisma.products.create({
    data: {
      title,
      price,
      brandId,
    },
  });
  return NextResponse.json(productCreate)
};
