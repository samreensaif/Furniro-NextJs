//src\components\browserange\Browserange.tsx
import React from 'react';
import Image from 'next/image';

import { client } from '@/sanity/lib/client';


async function  Browserange() {

  interface Icard {
    cardHeading: string
    cardImage: string
  }
  
  const res: Icard[] = await client.fetch(`*[_type=='landingPage'][0].sections[2].card[]{
   'cardHeading':cardHeading,
  'cardImage':cardImage.asset->url
}`)

  
  

  return (
    <section className="px-4  mx-auto mb-20 font-poppins  w-[1183px] exsm:w-[80%] ">
      
      {/* Top Heading Section */}
      <div className="flex flex-col items-center text-center w-full ">
        <h1 className="text-2xl  leading-[36px]  font-bold text-black">
          Browse The Range
        </h1>
        <p className="text-16 leading-[24px]  text-black mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Card Body Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5   exsm:pl-1  ">
        {(res).map((item: Icard, index: number) => {return(

<div className="flex flex-col  items-center shadow-lg rounded-md overflow-hidden " key={index}>
            
            {/* Top Image Container */}
            <div className='transition-transform duration-300 hover:scale-105'>
              <Image
                src={item.cardImage}
                alt="images"
                width={381}
                height={480}
                className="rounded-lg"
              />
            </div>

            {/* Card Text Section */}
            <div className="mt-4">
              <h2 className=" text-4xl  
              leading-[28px] 
              font-semibold 
              text-[24px]
               text-black 
               text-center">
                {item.cardHeading}
              </h2>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}

export default Browserange;
