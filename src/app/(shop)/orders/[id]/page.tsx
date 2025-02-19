import { getOrderById } from "@/actions";
import { PayPalButton, Title } from "@/components";
import { currencyFormatter } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({params}:Props) {
  const  { id }= params;
  const {ok, order} = await getOrderById(id)
  if(!ok){
    redirect('/')
  }
  const address = order!.OrderAddress
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Orden # ${id}`} />
        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div  className={
              clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                'bg-red-500':!order!.isPaid,
                'bg-green-700':order!.isPaid,
                }
              )
            }>
              <IoCardOutline size={25}/>
              {/* <span className="mx-2"> Pendiente de pago</span> */}
              <span className="mx-2">
                {
                  order?.isPaid ? "pagado": "Pendiente de pago"
                }
              </span>
            </div>
          
          {
            order!.OrderItem.map(item =>(
              <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                <Image 
                style={{width:'100px', height:'100px'}}
                src={`/products/${item.product.ProductImage[0].url}`} width={100}  height={100} alt={item.product.title} className="mr-5 rounded"/>
                <div>
                  <p>{item.product.title}</p>
                  <p>$ {item.price} x {item.quantity}</p>
                  <p className="font-bold">Subtotal: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))
          }
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-semibold">Dirección de entrega</h2>
            <div className="mb-10">
            <p className="text-xl">{address!.firstName} {address!.lastName}</p>
            <p>{address!.address}</p>
            <p>{address!.address2 || 'N/A'}</p>
            <p>{address!.postalCode}</p>
            <p>{address!.city}, {address!.countryId}</p>
            <p>{address!.phone}</p>
            </div>
            <div className="w-ful h-px rounded bg-gray-300 mb-10 " />
            <h1 className="text-2xl font-bold">Resumen de pedido</h1>
            <div className="grid grid-cols-2">
              <span>No. de productos</span>
              <span className="text-right">
                {order!.itemsInOrder ===1 ? ' ! artículo': `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormatter(order!.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormatter(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{currencyFormatter(order!.total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
            <PayPalButton amount={order!.total} orderId={order!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

