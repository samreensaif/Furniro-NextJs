// //src\app\blog\page.tsx

// "use client";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import Image from "next/image";

// import { Button } from "@/components/ui/button";

// import { client } from "@/sanity/lib/client";
// import BlogCenter from "@/components/BlogCenter";
// import Shopbottombar from "@/components/Shpbottombar";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // Interface for relatedPostMain
// interface RelatedPost {
//   relatedPostDate: string; // The date of the related post
//   relatedPostTitle: string; // The title of the related post
//   relatedPostImage: string; // The URL of the related post image
// }

// interface Ires {
//   categoryNumber: number;
//   categoryName: string;
// }

// interface RelatedPost {
//   relatedPostDate: string;
//   relatedPostTitle: string;
//   relatedPostImage: string;
// }

// export default function Blog() {
//   const [res, setRes] = useState<Ires[]>([]);
//   const [rPost, setRPost] = useState<RelatedPost[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res: Ires[] = await client.fetch(`

//       *[_type=='blogPage'][0].sections[2].categorySection[]{
//       'categoryNumber':categoryNumber,
//       'categoryName':categoryName
//     }
      
//       `);
//       setRes(res);

//       const rPost: RelatedPost[] = await client.fetch(`
      
//  *[_type=='blogPage'][0].sections[3].relatedPostMain[]{
//       'relatedPostDate':relatedPostDate,
//       'relatedPostTitle':relatedPostTitle,
//       'relatedPostImage':relatedPostImage.asset->url
//     }
  
//       `);

//       setRPost(rPost);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="w-full relative bg-white flex flex-col items-start justify-start leading-normal tracking-normal">
//       <main className="flex flex-col justify-start mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
//         {/* heading */}

//         <section className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-12 md:py-16">
//           <div className="container mx-auto px-4 text-center">
//             <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
//             <h1 className="text-3xl md:text-4xl font-medium mb-4">Blog</h1>
//             <div className="flex items-center justify-center gap-2 text-sm">
//               <Link href="/" className="hover:underline">
//                 Home
//               </Link>
//               <span>
//                 <Image src={"/rightA.png"} width={20} height={20} alt="arrow" />
//               </span>
//               <span>Blog</span>
//             </div>
//           </div>
//         </section>

//         {/* mainsection */}
//         <section className="w-full mt-6 flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-10">
//           {/* cards */}
//           <div className="w-full">
//             <BlogCenter />
//           </div>

//           {/* sidebar */}
//           <aside className="relative w-full lg:w-1/3 flex flex-col items-center gap-6">
//             <div className="relative w-full">
//               <Input placeholder="Search..." className="mb-6 h-12 w-full" />
//               <div className="absolute top-3 right-4">
//                 <Search />
//               </div>
//             </div>

//             <div className="bg-white w-full px-6">
//               <h3 className="text-2xl font-semibold mb-6">Categories</h3>

//               {res.map((category, index) => {
//                 return (
//                   <ul key={index} className="text-darkgray px-1">
//                     <li className="flex justify-between py-3">
//                       <Link href="#" className="hover:text-black">
//                         {category.categoryName}
//                       </Link>
//                       <p>{category.categoryNumber}</p>
//                     </li>
//                   </ul>
//                 );
//               })}
//             </div>

//             {/* related post */}
//             <div className="border border-darkgray w-full px-6 py-4 mt-6">
//               <h1 className="text-2xl font-medium mb-6">Recent Posts</h1>

//               {rPost.map((item, index) => {
//                 return (
//                   <div className="flex gap-3 mb-6" key={index}>
//                     <Image
//                       src={item.relatedPostImage}
//                       width={80}
//                       height={80}
//                       alt="rp1"
//                     />
//                     <div className="flex flex-col">
//                       <p>{item.relatedPostTitle}</p>
//                       <p className="text-gray-400">{item.relatedPostDate}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </aside>
//         </section>

//         {/* four-button div */}
//         <div className="flex gap-4 items-center justify-center my-8">
//           <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
//             1
//           </Button>
//           <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
//             2
//           </Button>
//           <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
//             3
//           </Button>
//           <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
//             Next
//           </Button>
//         </div>

//         <Shopbottombar />
//       </main>
//     </div>
//   );
// }


// src/app/blog/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCenter from "@/components/BlogCenter";
import Shopbottombar from "@/components/Shpbottombar";
import { fetchBlogCategories, fetchRelatedPosts } from "@/services/data";

export default async function Blog() {
  // Server-side data fetching
  const categories = await fetchBlogCategories();
  const relatedPosts = await fetchRelatedPosts();

  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start leading-normal tracking-normal">
      <main className="flex flex-col justify-start mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        {/* heading */}
        <section className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Blog</h1>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>
                <Image src={"/rightA.png"} width={20} height={20} alt="arrow" />
              </span>
              <span>Blog</span>
            </div>
          </div>
        </section>

        {/* mainsection */}
        <section className="w-full mt-6 flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-10">
          {/* cards */}
          <div className="w-full">
            <BlogCenter />
          </div>

          {/* sidebar */}
          <aside className="relative w-full lg:w-1/3 flex flex-col items-center gap-6">
            <div className="relative w-full">
              <Input placeholder="Search..." className="mb-6 h-12 w-full" />
              <div className="absolute top-3 right-4">
                <Search />
              </div>
            </div>

            <div className="bg-white w-full px-6">
              <h3 className="text-2xl font-semibold mb-6">Categories</h3>

              {categories.map((category: { categoryName: string; categoryNumber: number }, index: number) => (
                <ul key={index} className="text-darkgray px-1">
                  <li className="flex justify-between py-3">
                    <Link href="#" className="hover:text-black">
                      {category.categoryName}
                    </Link>
                    <p>{category.categoryNumber}</p>
                  </li>
                </ul>
              ))}
            </div>

            {/* related post */}
            <div className="border border-darkgray w-full px-6 py-4 mt-6">
              <h1 className="text-2xl font-medium mb-6">Recent Posts</h1>

              {relatedPosts.map((item: { relatedPostImage: string; relatedPostTitle: string; relatedPostDate: string }, index:number) => (
                <div className="flex gap-3 mb-6" key={index}>
                  <Image
                    src={item.relatedPostImage}
                    width={80}
                    height={80}
                    alt="rp1"
                  />
                  <div className="flex flex-col">
                    <p>{item.relatedPostTitle}</p>
                    <p className="text-gray-400">{item.relatedPostDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* four-button div */}
        <div className="flex gap-4 items-center justify-center my-8">
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
            1
          </Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
            2
          </Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
            3
          </Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f]">
            Next
          </Button>
        </div>

        <Shopbottombar />
      </main>
    </div>
  );
}
