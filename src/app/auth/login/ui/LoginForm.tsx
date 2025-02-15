'use client'

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationCircleOutline } from "react-icons/io5";

 
 export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate,undefined,);
    
    useEffect(()=>{
        if(state === 'Success'){
            //redirect('/')
            window.location.replace('/')
        }
    },[state])
    
   return (
    <form action={dispatch} className="flex flex-col">

    <label htmlFor="email">Correo electrónico</label>
    <input
      className="px-5 py-2 border bg-gray-200 rounded mb-5"
      type="email"
      name="email" />


    <label htmlFor="password">Contraseña</label>
    <input
      className="px-5 py-2 border bg-gray-200 rounded mb-5"
      type="password"
      name="password"
      />
     {state === 'CredentialsSignin' && (
            <div className="flex flex-row justify-center items-center gap-1 mb-4">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Credenciales inválidas</p>
            </div>
          )}
    {/* <button
      type="submit"
      className="btn-primary">
      Ingresar
    </button> */}
    <LoginButton />


    {/* divisor l ine */ }
    <div className="flex items-center my-5">
      <div className="flex-1 border-t border-gray-500"></div>
      <div className="px-2 text-gray-800">O</div>
      <div className="flex-1 border-t border-gray-500"></div>
    </div>

    <Link
      href="/auth/new-account" 
      className="btn-secondary text-center">
      Crear una nueva cuenta
    </Link>

  </form>
   )
 }
 function LoginButton() {
    const {pending} = useFormStatus()
  return (
    <button
      type="submit"
      className={
        clsx({
            'btn-primary': !pending,
            'bg-gray-500 text-white py-2 px-4 rounded transition-all':pending
        })
      }
      disabled={pending}
      >
        {pending ? 
        (
            
            <div className="flex flex-row gap-2 justify-center items-center">
                <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-white" />
                validando
            </div>

        )
        : 
        'Ingresar'}
    </button>
  );
}
 