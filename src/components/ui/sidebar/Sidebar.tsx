'use client'
import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)
  const closeSession = ()=>{
    logout()
    closeMenu()
 
  }
  return (
    <div>
      {
        isSideMenuOpen && (
          <div
          className="fixed top-0 w-screen h-screen z-10 bg-black opacity-30" />
        )
      }
      {
        isSideMenuOpen &&(
          <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" 
          />
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-[150px] sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline
          onClick={closeMenu}
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input className="w-full bg-gray-50 py-1 pl-10 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 " type="text" placeholder="buscar..." />
        </div>
        <Link 
        onClick={closeMenu}
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        href='/profile'>
          <IoPersonOutline size={30}/>
          <span className="ml-2 text-xl ">Perfil</span>
        </Link>
        <Link 
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        href='/'>
          <IoTicketOutline size={30}/>
          <span className="ml-2 text-xl ">Órdenes</span>
        </Link>
        <Link 
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={closeMenu}
        href='/auth/login'>
          <IoLogInOutline size={30}/>
          <span className="ml-2 text-xl ">Ingresar</span>
        </Link>
        <button
        className="flex w-full items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={closeSession}
        >
          <IoLogOutOutline size={30}/>
          <span className="ml-2 text-xl ">Salir</span>
        </button>
        <div className="w-full h-px bg-gray-300 my-10"/>
        <Link 
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        href='/'>
          <IoShirtOutline size={30}/>
          <span className="ml-2 text-xl ">Productos</span>
        </Link>
        <Link 
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        href='/'>
          <IoTicketOutline size={30}/>
          <span className="ml-2 text-xl ">Órdenes</span>
        </Link>
        <Link 
        className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
        href='/'>
          <IoPeopleOutline size={30}/>
          <span className="ml-2 text-xl ">Usuarios</span>
        </Link>
      </nav>
    </div>
  )
}
