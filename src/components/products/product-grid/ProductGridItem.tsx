'use client'
import { ProductImage } from "@/components/product/product-image/ProductImage"
import { Product } from "@/interfaces"
import Link from "next/link"
import { useState } from "react"

interface Props{
    product: Product
}
export const ProductGridItem = ({product}:Props) => {
    const [displayImage, setDisplayImage] = useState(product.images[0])
    
  return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link href={`/product/${product.slug}`}>
        <ProductImage src={displayImage}
        onMouseEnter={() => setDisplayImage(product.images[1]?? product.images[0])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
        alt={product.title} width={300} height={300} className="rounded-md"/>
        </Link>
        <div className="p-4 flex flex-col">
            <Link 
            className="hover:text-blue-600 transition-colors"
            href={`/product/${product.slug}`}>{product.title}</Link>
            <span className="font-bold">${product.price}</span>
        </div>	
    </div>
  )
}
