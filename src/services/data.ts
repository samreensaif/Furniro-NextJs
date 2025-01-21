"use server"

import { client } from "@/sanity/lib/client";

export async function fetchProducts() {
  const res = await client.fetch(`
    *[_type=='product'][]{
      'productImage': productImage.asset->url,
      description,
      dicountPercentage,
      tags,
      isNew,
      title,
      price,
      _id
    }
  `);
  return res;
}
