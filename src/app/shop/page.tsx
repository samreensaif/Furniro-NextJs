"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Heart, Share2, ArrowRightLeft } from "lucide-react";
import { ProductFilterBar } from "@/components/Filterbar";
import Shopbottombar from "@/components/Shpbottombar";
import { searchName } from "@/globalState/globalState";
import { useAtom } from "jotai";

export default function ProductGrid() {
  interface ProductSection {
    title: string;
    description: string;
    isNew: boolean;
    tags: string[];
    price: number;
    productImage: string;
    dicountPercentage: number;
    _id: string;
  }

  const [cards, setCards] = useState<ProductSection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(8); // State for number of cards to show

  const itemsPerPage = show; // Use the dynamic 'show' value from ProductFilterBar

  const [search] = useAtom(searchName);

  useEffect(() => {
    const fetchData1 = async () => {
      const res: ProductSection[] = await client.fetch(`
        *[_type=='product'][] {
          'productImage':productImage.asset->url,
          description,
          dicountPercentage,
          tags,
          isNew,
          title,
          price
        }
      `);

      setCards(res);
    };

    fetchData1();
  }, []);


  useEffect(() => {
    const getData = async () => {
      let query = `*[_type=='product']`;
  
      if (search) {
        query = `*[_type=='product' && title match '${search}*']`;
      }
  
      query += `{ 'productImage':productImage.asset->url,
      description,
      dicountPercentage,
      tags,
      isNew,
      title,
      price
    }`;
  
      const res: ProductSection[] = await client.fetch(query);
      setCards(res);
    }
  
    getData();
  }, [search]); // Add 'search' as a dependency
  




  const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedCards = cards.slice(startIndex, endIndex);

const totalPages = Math.ceil(cards.length / itemsPerPage);

useEffect(() => {
  setCurrentPage(1);
}, [show]);



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
      <ProductFilterBar show={show} setShow={setShow} />

      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedCards.map((item: ProductSection, index: number) => {return(
            <Card
              key={index}
              className="group relative overflow-hidden shadow-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.productImage}
                  alt={item.title}
                  fill
                  className="object-center transition-transform group-hover:scale-105"
                />
              </div>

              {/* Card isNew/Old */}
              {item.isNew && (
                <div
                  className={`absolute left-4 top-4 rounded-full px-3 py-2 text-sm text-white
    ${item.isNew === true ? "bg-green-500" : "bg-red-500"}`}
                >
                  {item.isNew === true ? "New" : `-${item.dicountPercentage}%`}
                </div>
              )}

              {/* Discount Percentage */}
              {item.dicountPercentage > 0 && (
  <div className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm text-white bg-red-500">
    -{item.dicountPercentage}%
  </div>
)}


              {/* Hover Content */}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all group-hover:bg-opacity-40 z-10 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <Link
                  href={`/shop/ProductDetails?id=${index}&productName=${item.title}&productPrice=${item.price}&productImage=${item.productImage}&productDescription=${item.description}&productdicountPercentage=${item.dicountPercentage}&tags=${item.tags}&isNew=${item.isNew}`}
                >
                  <Button className="w-[202px] bg-white hover:bg-gray-200 text-black transition-all">
                    Add to Cart
                  </Button>
                </Link>
                <div className="flex justify-between  w-[202px] py-2">
                  <Button variant="no" size="icon" className="text-white">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                  <Button variant="no" size="icon" className="text-white">
                    <ArrowRightLeft className="h-4 w-4" /> Compare
                  </Button>
                  <Button variant="no" size="icon" className="text-white">
                    <Heart className="h-4 w-4" /> Like
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.description.slice(0, 20)}...
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 p-4">
                <div className="flex items-center gap-2">
                  <span className=" text-lg font-bold">Rs. {item.price}</span>
                </div>
              </CardFooter>
            </Card>

          )})}
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className="w-12"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            className="w-20"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </div>

      <Shopbottombar />
    </>
  );
}
