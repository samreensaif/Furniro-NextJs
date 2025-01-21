//src\components\photogallery\PhotoGallery.tsx
import React from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';

async function PhotoGallery() {



const res = await client.fetch(`
  *[_type=='landingPage'][].sections[1]{

  'fImage':fImage.asset->url
}
  `);
  


  return (
    <section className="w-full max-w-[1440px] mx-auto mt-10 px-4">
      <div className="text-center space-y-3 mb-6 sm:space-y-4 sm:mb-10">
        <h3 className="text-sm font-semibold text-gray-600 sm:text-[16px]">
          Share your setup with
        </h3>
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl ">
          #FuniroFurniture
        </h2>
      </div>

      <div className="relative w-full aspect-[4/3] exsm:aspect-[3/4] sm:aspect-video md:aspect-[16/9] lg:aspect-[21/9] mx-auto">
        <Image
          src={res[0].fImage}
          alt="share"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}

export default PhotoGallery;
