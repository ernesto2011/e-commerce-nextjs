import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSumary } from "./ui/OrderSumary";

export const metadata = {
  title: "Mi carrito",
  description: "Mi carrito",
};

export default function Cartpage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Carrito" />
        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más cosas</span>
            <Link href={'/'} className="underline mb-5">
              Continua comprando
            </Link>
            <ProductsInCart />
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h1 className="text-2xl font-bold">Resumen de pedido</h1>
            <OrderSumary />
            <div className="mt-5 mb-2 w-full">
              <Link 
              className="flex btn-primary justify-center "
              href={'/checkout/address'}>
              Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
