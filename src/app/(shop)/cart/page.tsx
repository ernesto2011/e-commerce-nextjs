import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mi carrito",
  description: "Mi carrito",
};
const productsInCart =[
  initialData.products[0],
  initialData.products[1],
  // initialData.products[2],
  // initialData.products[3],
]
export default function Cartpage() {
  if(productsInCart.length === 0){
    redirect('/empty')
  }
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
          
          {
            productsInCart.map(product =>(
              <div key={product.slug} className="flex mb-5">
                <Image 
                style={{width:'100px', height:'100px'}}
                src={`/products/${product.images[0]}`} width={100}  height={100} alt={product.title} className="mr-5 rounded"/>
                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price}</p>
                  <QuantitySelector quantity={2}/>
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))
          }
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
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
