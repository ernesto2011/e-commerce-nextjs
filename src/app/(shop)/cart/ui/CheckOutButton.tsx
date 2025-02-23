"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";


export const CheckOutButton = () => {
    const session = useSession()
    const handleClick = ()=>{
        if(session.status === 'unauthenticated'){
            toast.info('Inicia sesión para continuar')
        }
    }
  return (
    <Link
      onClick={handleClick}
      className="flex btn-primary justify-center "
      href={
        session.status === 'authenticated' ? '/checkout/address' : '/auth/login'
      }
    >
      Checkout
    </Link>
  );
};
