'use client'

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export const GoBack = () => {
    const router = useRouter();
    const onGoBack = () => {
        router.back();
    }
  return (
        <button 
        onClick={onGoBack}
        className="flex items-center text-sm text-gray-500 font-semibold mb-4 hover:underline px-5 sm:px-0"
        >
            <IoArrowBackOutline className="h=7 w-7" />Atrás
        </button>
  )
}
