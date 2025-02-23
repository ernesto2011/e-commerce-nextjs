'use client'

import { ProductImage, QuantitySelector } from "@/components"
import { CartProduct } from "@/interfaces"
import { useCartStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const ProductsInCart = () => {
    const updateProductInCart = useCartStore(state => state.updateProductQuantity)
    const removeProductInCart = useCartStore(state => state.removeProduct)
    const [loading, setLoading] = useState(false)
    const productsInCart = useCartStore(state => state.cart)
    useEffect(()=> {
        setLoading(true)
    },[])
    const handleDeleteProduct = (product:CartProduct)=>{
      removeProductInCart(product)
      toast.info('Producto eliminado del carrito correctamente')
    }
    
    if(!loading){
        return(
            <div className="flex mb-5">
                <div className="w-30 h-30 rounded bg-gray-300 animate-pulse"></div>
                <div className="flex-1 ml-5 space-y-3">
                    <div className="w-full h-6 rounded bg-gray-300 animate-pulse"></div>
                    <div className="w-3/4 h-6 rounded bg-gray-300 animate-pulse"></div>
                    <div className="w-3/4 h-6 rounded bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        )
   
    }
  return (
    <>
     {
            productsInCart.map(product =>(
              <div key={`${product.slug}- ${product.size}`} className="flex mb-5">
                <ProductImage
                style={{width:'100px', height:'100px'}}
                src={product.image} width={100}  height={100} alt={product.title} className="mr-5 rounded"/>
                <div>
                  <Link 
                  className="hover:underline cursor-pointer"
                  href={`product/${product.slug}`}>
                    <p>{product.title}</p>
                  </Link>
                  <p>talla: {product.size}</p>
                  <p>$ {product.price}</p>
                  <QuantitySelector quantity={product.quantity} onQuantityChanged={quantity=>updateProductInCart(product, quantity)
                  }/>
                  <button 
                  onClick={()=>handleDeleteProduct(product)}
                  className="underline mt-3">Remover</button>
                </div>
              </div>
            ))
          }
    </>
  )
}
