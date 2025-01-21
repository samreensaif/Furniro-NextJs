//src\components\hero\Hero.tsx
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function Hero() {


  const res = await client.fetch(`
    *[_type == 'landingPage'][0]{
  'mainHeading1':sections[0].mainHeading1,
  'mainHeading2':sections[0].mainHeading2,
  'para1':sections[0].para1,
  'smallHeading':sections[0].smallHeading,
  'btnText':sections[0].btnText,
  'heroImage':sections[0].heroImage.asset->url,
    
}
  
  `);

  

  return (
    <div className="flex flex-col mb-[56.67px]">

<main className="flex-1">
  {/* Hero section with background image */}
  <section
    className="relative sm:h-[600px] bg-cover bg-center exsm:h-[300px] exsm:m-auto"
    style={{ backgroundImage: `url(${res.heroImage})` }}
  >
    <div className="container h-full flex items-center justify-center sm:justify-end px-4">
      {/* Content container, adjusts on small screens */}
      <div
        className="
        relative z-10 bg-[#FFF9F3] p-6 
        max-w-[180px] left-[50px]

        exsm:max-w-[140px] exsm:left-[60px] exsm:p-4
        xsm:max-w-[200px] xsm:left-[60px] xsm:p-5
        sm:max-w-[280px] sm:left-0 sm:p-6
        md:max-w-[350px] md:left-0 md:p-8
        lg:left-[-40px] lg:max-w-[543px]
        "
      >
        <p className="text-sm uppercase tracking-wide mb-2 exsm:mt-[20px]">
          {res.smallHeading}
        </p>
        <h1
          className="
          text-lg font-bold text-[#B88E2F] mb-4
          exsm:text-[16px] exsm:leading-tight
          xsm:text-2xl
          sm:text-3xl
          "
        >
         {res.mainHeading1}
         <br/>
          {res.mainHeading2}
        </h1>
        <p className="text-gray-600 mb-6 exsm:hidden sm:block">
          {res.para1}
        </p>

        <div className="">
          <Link href="/shop">
          <Button className="bg-[#B88E2F] hover:bg-[#A17B2A] text-white px-6 py-4">
            {res.btnText}
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
</main>

      
    </div>
  );
}
