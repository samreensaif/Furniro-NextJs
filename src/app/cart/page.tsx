
"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartTotals from "@/components/CartTotals";
import Shopbottombar from "@/components/Shpbottombar";
import RelatedProducts from "@/components/Relatedproducts";
import Link from "next/link";

interface IProduct {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  qty: number;
  dicountPercentage: number;
  total:number;
}

function CartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cartItem, setCartItem] = useState<IProduct[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const updatedCart = cart ? JSON.parse(cart) : [];

    const id = searchParams.get("id");
    const productName = searchParams.get("productName");
    const productPrice = Number(searchParams.get("productPrice"));
    const productImage = searchParams.get("productImage");
    const qty = Number(searchParams.get("qty") || 1);
    const dicountPercentage = Number(searchParams.get("dicountPercentage") || 0);
    

    if (productName && productPrice && productImage && id) {
      const isDuplicate = updatedCart.some(
        (item: IProduct) => item.productName === productName
      );
      if (!isDuplicate) {
        updatedCart.push({
          id,
          productName,
          productImage,
          productPrice,
          qty,
          dicountPercentage,
        });
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItem(updatedCart);
      router.replace("/cart");
    }
  }, [searchParams, router]);

  function handleRemoveItem(index: number) {
    const removedCard = [...cartItem];
    removedCard.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(removedCard));
    setCartItem(removedCard);
  }

  return (
    <>
      {/* Banner Section */}
      <section className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-12 md:py-16 mb-6">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Cart</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
              <Image src={"/rightA.png"} width={20} height={20} alt="arrow" />
            </span>
            <span>Cart</span>
          </div>
        </div>
      </section>

      {/* Middle Section */}
      <div className="w-full flex flex-col lg:flex-row gap-8 px-6 md:px-12 lg:px-24 mb-16">
        {/* Left Div - Cart Items */}
        <div className="w-full lg:w-[817px]">
          {cartItem.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-[#f9f1e7]">
              {/* Table Header */}
              <thead className="bg-[#f9f1e7] h-14 text-[16px] leading-[24px]">
                <tr>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">Product</th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">Price</th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">Quantity</th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">SubTotal</th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {cartItem.map((item: IProduct, index) =>{
                  return(
<tr key={index} className="text-center">
                    {/* Product Details */}
                    <td className="border border-[#f9f1e7] flex flex-col items-center justify-center gap-4 p-4">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        width={108}
                        height={105}
                        className="max-w-full"
                      />
                      <p className="text-[#9f9f9f]">{item.productName}</p>
                    </td>
                    {/* Price */}
                    <td className="border border-[#f9f1e7] text-[#9f9f9f]">Rs. {item.productPrice}</td>
                    {/* Quantity */}
                    <td className="text-[#9f9f9f] mb-10 flex justify-center items-center h-full">
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          const updatedCart = [...cartItem];
                          updatedCart[index].qty = Number(e.target.value) || 1;
                          setCartItem(updatedCart);
                        }}
                        className="w-16 text-center"
                      />
                    </td>
                    {/* SubTotal */}
                    <td className="border border-[#f9f1e7] text-[#9f9f9f]">
                      Rs. {(item.productPrice * item.qty * (100 - item.dicountPercentage)) / 100}
                    </td>

                    {/* Action */}
                    <td className="border border-[#f9f1e7]">
                      <Button variant={"no"} onClick={() => handleRemoveItem(index)}>
                        <Trash size={28} fill="#b88e2f" />
                      </Button>
                    </td>
                  </tr>

                  )} )}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Right Div - Totals */}
        <div className="w-full lg:w-[393px]">
          <CartTotals
            cartData={{
              totalItems: cartItem.reduce((sum, item) => sum + item.qty, 0),
              subTotal: cartItem.reduce((sum, item) => sum + item.productPrice * item.qty, 0),
              totalPrice: cartItem.reduce(
                (sum, item) =>
                  sum +
                  (item.productPrice * item.qty * (100 - item.dicountPercentage)) / 100,
                0
              ),
              productName: cartItem.map(item => item.productName),
              qty: cartItem.reduce((sum, item) => sum + item.qty, 0),
            }}
          />
        </div>
      </div>

      <RelatedProducts />

      <Shopbottombar />
    </>
  );
}

export default function Cart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}