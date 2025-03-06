'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import clsx from "clsx"
import { login, registerUser } from "@/actions"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

type FormInputs = {
    name:string,
    email:string,
    password:string
  }
export const RegisterForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [errorMessage, setErrorMessage]= useState('')
    const {register, handleSubmit, formState:{errors}} = useForm<FormInputs>()
    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
        setErrorMessage('')
        const {name, email, password} = data
        const resp = await registerUser(name, email, password)
        if(!resp.ok){
            setErrorMessage(resp.message)
            return; 
        }
        await login(email.toLocaleLowerCase(), password)
        const validUrl =callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";
        window.location.replace(validUrl);
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {
            errors.name?.type === 'required' && (
                <span></span>
            )
        }
        <label htmlFor="email">Nombre completo</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500': errors.name  
                }
            )
          }
          type="text" 
          {...register('name', {
            required: true,
            minLength: 3
          })}
          />
          <label htmlFor="email">Correo electrónico</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500': errors.email 
                }
            )
          }
          type="email" 
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
          />

        <label htmlFor="email">Contraseña</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500': errors.password 
                }
            )
          }
          type="password" 
          {...register('password', {
            required: true,
            minLength: 6
          })}
          />
        {
            errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
            )
        }
        <button className="btn-primary"> Crear</button>

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </form>
  )
}
