'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props{
   totalPages: number 
}
export const Pagination = ({totalPages}:Props) => {
    const pathName = usePathname()
    const searchParams= useSearchParams()
    let currentPage = Number(searchParams.get('page')) ?? 1;
    const createPageUrl= (pageNumber:number | string)=>{
        const params = new URLSearchParams(searchParams);
        if(pageNumber === "...") return `${pathName}?${params.toString()}`;
        if(Number(pageNumber)<=0) return `${pathName}`;
        if(Number(pageNumber)>totalPages) return `${pathName}?${params.toString()}`;
        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    }
  return (
<div className="flex text-center justify-center mt-5 mb-16">
  <nav aria-label="Page navigation example">
    <ul className="flex list-style-none">
      <li className="page-item flex items-center"><Link className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
      href={createPageUrl(currentPage-1)}
      >
        <IoChevronBackOutline />
        </Link></li>
      <li className="page-item"><a className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" href="#">1</a></li>
      <li className="page-item active"><a className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md" href="#">2 <span className="visually-hidden" /></a></li>
      <li className="page-item"><a className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" href="#">3</a></li>
      <li className="page-item flex items-center"><Link className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
      href={createPageUrl(currentPage+1)}
      >
        <IoChevronForwardOutline />
        </Link></li>
    </ul>
  </nav>
</div>

  )
}
