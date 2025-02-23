'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormatter} from "@/utils"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isPlacingOreder, setIsPlacingOrder] = useState(false);
    const address = useAddressStore(state => state.address)
    const { getSumaryInformation } = useCartStore()
    const { totalItems, subTotal, tax, total } = getSumaryInformation()
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);
    useEffect(()=>{
        setLoading(true)
    },[])
    const onPlaceOrder = async() => {
        setIsPlacingOrder(true)
        const productsinCart = cart.map(product => {
            return {
                productId: product.id,
                quantity: product.quantity,
                size: product.size
            }
        })
        const resp = await placeOrder(productsinCart, address)
        if(!resp.ok){
            setIsPlacingOrder(false)
            setErrorMessage(resp.message!)
            return;
        }
        clearCart();
        router.replace('/orders/'+ resp.order!.id)
    }
    if(!loading){
        return(
            <div className="bg-white rounded-xl shadow-xl p-7">
            <div className="h-96 rounded bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col gap-2 mt-5">
              <div className="h-5 rounded bg-gray-300 animate-pulse"></div>
              <div className="h-5 rounded bg-gray-300 animate-pulse"></div>
              <div className="h-5 rounded bg-gray-300 animate-pulse"></div>
              <div className="h-5 rounded bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        )}

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
    <h2 className="text-2xl mb-2 font-semibold">Dirección de entrega</h2>
    <div className="mb-10">
      <p className="text-xl">{address.firstName} {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.address2 || 'N/A'}</p>
      <p>{address.postalCode}</p>
      <p>{address.city}, {address.country}</p>
      <p>{address.phone}</p>
    </div>
    <div className="w-ful h-px rounded bg-gray-300 mb-10 " />
    <h1 className="text-2xl font-bold">Resumen de pedido</h1>
    <div className="grid grid-cols-2">
      <span>No. de productos</span>
      <span className="text-right">{totalItems===1 ? 'Un producto': `${totalItems} productos` }</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormatter(subTotal)}</span>

      <span>Impuestos (15%) </span>
      <span className="text-right">{currencyFormatter(tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormatter(total)}</span>
    </div>
    <div className="mt-5 mb-2 w-full">
        <p className="text-red-500">{errorMessage}</p>
      <button 
      onClick={onPlaceOrder}
      className={
        clsx({
          'btn-primary w-32': !isPlacingOreder,
          'btn-disabled': isPlacingOreder
        } 
        )
      }
      >
        {
            isPlacingOreder ? (
            <div className="flex flex-row gap-2 justify-center items-center">
            <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-white" />
                validando
            </div>
            ): 'Colocar orden'
        }
      </button>
    </div>
  </div>
  )
}
