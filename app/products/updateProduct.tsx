"use client";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
interface product {
    id: Number,
    title: String,
    price: Number,
    brandId: Number,
    
  }
  
const UpdateProduct = ({ brands,product }: { brands: Brand[],product:product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brandId, setBrandId] = useState(product.brandId);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.patch(`/api/product/${product.id}`, {
      title: name,
      price: Number(price),
      brandId: Number(brandId),
    });
    router.refresh();
  };

  return (
    <div>
      <button className="btn btn-warning" onClick={handleModal}>
        Update
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
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand name</label>
              <select
                name=""
                id=""
                className="select select-bordered"
                onChange={(e) => setBrandId(Number(e.target.value))}
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

export default UpdateProduct;
