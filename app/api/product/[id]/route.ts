import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Products } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request,{params}:{params:{id:string}}) => {
  const body:Products = await request.json();
  const { title, price, brandId } = body;
  const productCreate = await prisma.products.update({
    where:{
      id:Number(params.id)
    },
    data:{
      title,
      price,
      brandId
    }
  });
  return NextResponse.json(productCreate)
};

export const DELETE = async (request:Request,{params}:{params:{id:string}}) => {
  const product = await prisma.products.delete({
    where:{
      id: Number(params.id)
    }
  })  
  return NextResponse.json(product,{status:200})
};

