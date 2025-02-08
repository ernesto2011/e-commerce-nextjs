import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function CartEmptyPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-90px)] ">
      <IoCartOutline size={100} className="opacity-20" />
      <div className="text-3xl font-semibold">Tu carrito está vacío</div>
      <Link href="/" className="text-blue-500 text-2xl">
        Regresar
      </Link>
    </div>
  )
}