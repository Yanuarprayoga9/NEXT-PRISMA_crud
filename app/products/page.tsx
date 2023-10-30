import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      Brand:true
    },
  });
  return res;
};

const Products = async () => {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="p-10">
      <div className="overflow-x-auto">
        <table className="table table-x">
          <thead className="bg-slate-300">
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <th>{product.title}</th>
                  <td>{product.price}</td>
                  <td>{product.Brand.name}</td>
                  <td>
                    edit delete
                  </td>
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
