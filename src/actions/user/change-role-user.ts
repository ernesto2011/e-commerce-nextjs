'use server'

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const changeRoleUser = async(id:string, role:string)=>{
    const session = await auth()
    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            error: 'No tienes los permisos para realizar esta acción'
        } 
    }
    try {
        const newRole = role === 'admin' ? 'admin' : 'user'
        const user = await prisma.user.update({
            where: {id},
            data: {role: newRole}
        })
        if(!user) return {
            ok: false,
            error: 'No se pudo cambiar el rol'
        }
        revalidatePath('/admin/users')
        return {
            ok: true,
            message: 'Rol cambiado correctamente'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: 'No se pudo cambiar el rol'
        }
    }
}