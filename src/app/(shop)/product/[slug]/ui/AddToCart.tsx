'use client'
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"
import { toast } from "react-toastify"
interface Props{
    product:Product
}

export const AddToCart = ({product}:Props) => {
    const addProductToCart = useCartStore(state=>state.addProductToCart);
    const [size, setSize]= useState<Size|undefined>()
    const [quantity, setQuantity]= useState<number>(1)
    const [posted, setPosted] = useState(false)
    const addToCart = ()=>{
        setPosted(true)
        if(!size) return;
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            size: size
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        toast.success('Producto agregado al carrito correctamente')

    }
  return (
    <>
        {
            posted && !size && (<span className="mt-2 text-red-500 fade-in">
                debe seleccionar una talla*
            </span>)
        }
        <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity}/>
        <button
        onClick={addToCart}
         className="btn-primary my-5">Agregar al carrito</button>
    </>
  )
}
