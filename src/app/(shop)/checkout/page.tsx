import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Checkout",
  description: "Mi carrito",
};
const productsInCart =[
  initialData.products[0],
  initialData.products[1],
  // initialData.products[2],
  // initialData.products[3],
]
export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar orden" />
        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Editar carrito</span>
            <Link href={'/cart'} className="underline mb-5">
              Editar carrito
            </Link>
          
          {
            productsInCart.map(product =>(
              <div key={product.slug} className="flex mb-5">
                <Image 
                style={{width:'100px', height:'100px'}}
                src={`/products/${product.images[0]}`} width={100}  height={100} alt={product.title} className="mr-5 rounded"/>
                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price *3}</p>
                </div>
              </div>
            ))
          }
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-semibold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Ernesto López</p>
              <p>Av. Siempre viva</p>
              <p>Col. centro</p>
              <p>Alcaldia Venustiano Carranza</p>
              <p>Ciudad de México</p>
              <p>CP 00133</p>
              <p>123 456 789</p>
            </div>
            <div className="w-ful h-px rounded bg-gray-300 mb-10 " />
            <h1 className="text-2xl font-bold">Resumen de pedido</h1>
            <div className="grid grid-cols-2">
              <span>No. de productos</span>
              <span className="text-right">3 productos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$115</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">3 productos</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link 
              className="flex btn-primary justify-center "
              href={'/orders/123234'}>
                Pagar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
