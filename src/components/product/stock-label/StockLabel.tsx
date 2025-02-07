'use client'
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/app/fonts/fonts"
import { get } from "http";
import { use, useEffect, useState } from "react";

interface Props{
    slug: string;
}
export const StockLabel = ({slug}:Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
       getStock()
    },[])
    const getStock = async()=>{
        const stock = await getStockBySlug(slug)
        setStock(Number(stock))
        setIsLoading(false)
    }
  return (
    <>
    {isLoading ? (
        <h1 className={`bg-gray-200 animate-pulse rounded`}> &nbsp; </h1>) 
    : 
    (<h1 className={`${titleFont.className} antialiased font-bold text-lg`}>Stock: {stock}</h1>)
  }
    </>
  )
}
