'use server'

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async(userId: string)=>{
    try {
        const address = await prisma.userAddress.delete({
            where: {userId}
        })
        return {
            ok: true,
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al eliminar la dirección')
    }
}