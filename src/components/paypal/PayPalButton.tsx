'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import { setTransactionId } from "@/actions";

interface Props{
  orderId: string;
  amount: number;
}

export const PayPalButton = ({orderId, amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = (Math.round(amount* 100))/100;
  if (isPending) {
    return (
      <div className="animate-pulse mb-11 md:mb-16">
        <div className="h-8 md:h-10 bg-gray-300 rounded"></div>
        <div className="h-8 md:h-10 bg-gray-300 rounded mt-2"></div>
      </div>
    )
  }
  const createOrder = async(data:CreateOrderData, actions:CreateOrderActions):Promise<string> =>{
    const transactionid = await actions.order.create({
      purchase_units:[
        {
          amount:{
            value: `${roundedAmount}`,
          }
       
        }
      ]
    })
    //console.log({transactionid});
    const {ok} = await setTransactionId(orderId, transactionid)
    if(!ok) throw new Error('No se pudo actualizar la orden')
    return transactionid
  }
  return (
    <PayPalButtons
      createOrder={createOrder}
      // onApprove={}
    />
  )
}
