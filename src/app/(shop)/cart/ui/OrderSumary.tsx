"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
    const[loading, setLoading]= useState(false)
    const { getSumaryInformation } = useCartStore()
    const { totalItems, subTotal, tax, total } = getSumaryInformation()


    useEffect(()=>{
        setLoading(true)
    },[])
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
      <span className="text-right">{subTotal}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{tax}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{total}</span>
    </div>
  );
};
