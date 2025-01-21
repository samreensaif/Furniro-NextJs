//src\components\cartTotals\CartTotals.tsx
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';



interface CartTotalsProps {
  cartData: {
    totalItems: number;
    totalPrice: number;
    subTotal:number;
    productName: string[];
    qty:number;
  };
}

function CartTotals({ cartData }: CartTotalsProps) {



const { totalItems, totalPrice,subTotal,productName,qty } = cartData;


    

    

    
  return (
    <div className='w-[90%] max-w-[393px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1280px] mx-auto flex flex-col  items-center bg-[#f9f1e7] p-4 sm:p-6 md:p-8 rounded-md'>

      <div>
        <h1 className='text-[28px] sm:text-[32px] leading-[40px] sm:leading-[48px] text-center font-semibold mt-[15px] mb-[40px] sm:mb-[61px]'>
          Cart Totals
        </h1>
      </div>

      <div className='text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full mb-[20px] sm:mb-[31px]'>
        <p>Total Items:</p>
        <p className='text-[#a5a4ae]'>{totalItems}</p>
      </div>
      <div className='text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full mb-[20px] sm:mb-[31px]'>
        <p>Subtotal:</p>
        <p className='text-[#a5a4ae]'>Rs. {subTotal}</p>
      </div>
    <div className='mb-[20px] text-[14px] text-gray-400 sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full'> 
      <p>After discount:</p>
    </div>
      <div className='text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full'>
        <p>Total Price</p>
        <p className='text-[#b88e2f] text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px]'>
          Rs. {totalPrice}
        </p>
      </div>

      <div className='mt-[30px] sm:mt-[42px] mb-[50px] sm:mb-[80px]'>





      



        <Link href={`/checkout?totalItems=${totalItems}&totalPrice=${totalPrice}&productName=${productName}&subTotal=${subTotal}&qty=${qty}`}>
          <Button
            variant="outline"
            className="w-full sm:w-[222px] border-black rounded-[12px] sm:rounded-[15px] text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px] px-6 py-4 sm:px-10 sm:py-6"
          >
            Check Out
          </Button>
        </Link>
      </div>

    </div>
  );
}

export default CartTotals;
