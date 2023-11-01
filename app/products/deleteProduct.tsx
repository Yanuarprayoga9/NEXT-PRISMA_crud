"use client";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import type { Products } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
const prisma = new PrismaClient();
const getProduct = async () => {
  const res = await prisma.products.findMany({
    select: {
      title: true,
    },
  });
  return res;
};
interface product {
  id: Number,
  title: String,
  price: Number,
  brandId: Number,
  
}

const Delete = ({ product }: { product: product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = async (id:any) => {
    await axios.delete(`/api/product/${id}`)
    router.refresh()
    setIsOpen(false);
  }

  return (
    <div>
      <button className="btn" onClick={handleModal}>
       Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {product.title}</h3>
        <div className="modal-action">
          <button type="button" className="btn" onClick={handleModal}>
            close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={()=>{
              handleDelete(product.id)
            }}
          >
            submit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
