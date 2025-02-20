'use server'

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma"

export const getAllUsers = async()=>{
    const session = await auth()
    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            error: 'No eres admin'
        }
    }
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                name: 'desc'
            }
        })
        if(!users) return {
            ok: false,
            error: 'No hay usuarios'
        }
        return {
            ok: true,
            users: users
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: 'No se pudo obtener los usuarios'
        }
    }
}