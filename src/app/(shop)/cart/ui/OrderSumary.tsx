"use client";

import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
    const router = useRouter();
    const[loading, setLoading]= useState(false)
    const { getSumaryInformation } = useCartStore()
    const { totalItems, subTotal, tax, total } = getSumaryInformation()


    useEffect(()=>{
        setLoading(true)
    },[])
    useEffect(() => {

      if ( totalItems === 0 && loading === true )   {
        router.replace('/empty')
      }
  
  
    },[ totalItems, loading ])
  
    if(!loading){
        return (
            <div className="flex mb-5">
            <div className="w-30 h-30 rounded bg-gray-300 animate-pulse"></div>
            <div className="flex-1 space-y-3">
                <div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
                <div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
                <div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
            </div>
        </div>
        )
    }
  return (
    <div className="grid grid-cols-2">
      <span>No. de productos</span>
      <span className="text-right">{totalItems=== 1 ?'1 artículo':`${totalItems} artículos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormatter(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormatter(tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormatter(total)}</span>
    </div>
  );
};
