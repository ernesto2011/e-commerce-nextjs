'use client'

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export const GoBack = () => {
    const router = useRouter();
    const onGoBack = () => {
        router.back();
    }
  return (
    <div>
        <button 
        onClick={onGoBack}
        className="flex items-center gap-1 text-sm text-gray-500 font-semibold mb-5 hover:underline"
        >
            <IoArrowBackOutline className="h-5=6 w-6" />Atrás
        </button>
    </div>
  )
}
