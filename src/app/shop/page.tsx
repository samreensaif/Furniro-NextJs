


import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"

import Shopbottombar from "@/components/Shpbottombar"
import { getProducts } from "@/services/getProducts"
import ProductGridClient from "@/components/ProductGridClient"
 // Assume this function fetches products from your data source

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <>
      <section className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Shop</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
              <Image src={"/rightA.png"} width={20} height={20} alt="arrow" />
            </span>
            <span>Shop</span>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductGridClient initialCards={products} />
      </Suspense>

      <Shopbottombar />
    </>
  )
}

