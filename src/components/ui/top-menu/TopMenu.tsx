'use client'
import { titleFont } from "@/app/fonts/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu)
  const totalItemsInCart = useCartStore(state =>state.getTotalItems())
  const [loading, setLoading]= useState(false)
  useEffect(()=>{
    setLoading(true)
  },[])
  return (
    <nav className="flex px-5 justify-between items-center w-full">
        <div>
            <Link href='/'>
            <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
            <span> | Shop</span>
            </Link>
        </div>
        <div className="hidden sm:block">
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/gender/men'}>Hombres
            </Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/gender/women'}>Mujeres
            </Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/gender/kid'}>Niños
            </Link>
        </div>
        <div className="flex items-center">
            <Link href={'/search'} className="mx-2">
            <IoSearchOutline className="w-5 h-5"/>
            </Link>
            <Link href={
              (totalItemsInCart === 0 && loading) ? '/empty' : '/cart'
            } className="mx-2">
            <div className="relative">
              {loading && (totalItemsInCart > 0) && (
              <span className="fade-in absolute -top-2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-4 h-4">{totalItemsInCart}</span>) 
              }
              <IoCartOutline className="w-5 h-5"/>
            </div>
            </Link>
            <button 
            onClick={openMenu}
            className="m-2 p-2 rounded-sm transition-all hover:bg-gray-100">
               Menú
            </button>
        </div>
    </nav>
  )
}
