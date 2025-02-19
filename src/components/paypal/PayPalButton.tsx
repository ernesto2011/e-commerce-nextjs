'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
//import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  if (isPending) {
    return (
      <div className="animate-pulse mb-11 md:mb-16">
        <div className="h-8 md:h-10 bg-gray-300 rounded"></div>
        <div className="h-8 md:h-10 bg-gray-300 rounded mt-2"></div>
      </div>
    )
  }
  //const createOrder = (data:CreateOrderData, actions:CreateOrderActions):Promise<string> =>{

  //}
  return (
    <PayPalButtons
      // createOrder={}
      // onApprove={}
    />
  )
}
