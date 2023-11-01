"use client";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import type { Brand } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
const prisma = new PrismaClient();

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("/api/product", {
      title: name,
      price: Number(price),
      brandId: Number(brandId),
    });
    setName("");
    setPrice("");
    setBrandId("");
    router.refresh();
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add Product
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">name</label>
              <input
                type="text"
                className="input input-bordered font-bold"
                placeholder="product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                className="input input-bordered font-bold"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand name</label>
              <select
                name=""
                id=""
                className="select select-bordered"
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="" disabled>
                  select Brand
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleModal}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
