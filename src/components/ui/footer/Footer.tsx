import { titleFont } from "@/app/fonts/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-4">
        <Link href='/'>
            <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
            <span> | Shop</span>
            <span> © All rights reserved</span>
            <span> {new Date().getFullYear()}</span>
        </Link>
    </div>
  )
}
