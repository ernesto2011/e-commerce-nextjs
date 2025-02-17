'use client'

import { useCartStore } from "@/store"
import { currencyFormatter } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ProductsInCart = () => {

    const [loading, setLoading] = useState(false)
    const productsInCart = useCartStore(state => state.cart)
    useEffect(()=> {
        setLoading(true)
    },[])
    
    if(!loading){
        return(
            <div className="flex mb-5">
                <div className="w-30 h-30 rounded bg-gray-300 animate-pulse"></div>
                <div className="flex-1 ml-5 space-y-3">
                    <div className="w-full h-10 rounded bg-gray-300 animate-pulse"></div>
                    <div className="w-full h-10 rounded bg-gray-300 animate-pulse"></div>
                    <div className="w-full h-10 rounded bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        )
   
    }
  return (
    <>
     {
            productsInCart.map(product =>(
              <div key={`${product.slug}- ${product.size}`} className="flex mb-5">
                <Image 
                style={{width:'100px', height:'100px'}}
                src={`/products/${product.image}`} width={100}  height={100} alt={product.title} className="mr-5 rounded"/>
                <div>
                  <span>
                    <p>{product.title}  ({product.quantity})</p>
                  </span>
                  <p>talla: {product.size}</p>
                  <p className="font-bold"> {currencyFormatter(product.price * product.quantity)}</p>
                 
                </div>
              </div>
            ))
          }
    </>
  )
}
