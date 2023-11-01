import React from "react";
import Link from "next/link";
import AddProduct from "./addProduct";
import { PrismaClient } from "@prisma/client";
import Delete from "./deleteProduct";
const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      Brand: true,
    },
  });
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany({});
  return res;
};

const Products = async () => {
  const products = await getProducts();
  const brands = await getBrands();
  return (
    <div className="p-10">
      <div className="mb-2">
          <AddProduct brands={brands}/>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-x">
          <thead className="bg-slate-300">
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Brand Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product.id}>
                  <th>{(index = index + 1)}</th>
                  <th>{product.title}</th>
                  <td>{product.price}</td>
                  <td>{product.Brand.name}</td>
                  <td> <Delete product={product}/> </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
