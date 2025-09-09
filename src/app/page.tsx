"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="p-10 text-lg">Loading products...</p>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow p-4 flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={160}
              className="w-40 h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-500 text-center">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
