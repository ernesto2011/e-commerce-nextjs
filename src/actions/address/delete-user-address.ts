'use server'

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async(userId: string)=>{
    try {
        const address = await prisma.userAddress.delete({
            where: {userId}
        })
        if(!address) return {
            ok: false,
            error: 'No hay dirección para ese usuario'
        }
        return {
            ok: true,
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: 'No se pudo eliminar la dirección'
        }
    }
}