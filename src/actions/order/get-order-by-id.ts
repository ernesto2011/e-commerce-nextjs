'use server'

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma"

export const getOrderById = async(orderId:string)=>{
    const session = await auth()
    if(!session?.user){
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }
    try {
        const order = await prisma.order.findUnique({
            where: {id: orderId},
            include: {
                OrderAddress: true,
                OrderItem: {
                    select:{
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    
                    }
                }
            }
        })
        if(!order) throw `No existe la orden con id ${orderId}`
        if(session.user.role === 'user'){
            if(order.userId !== session.user.id) throw `${orderId} no es de ese usuario`
    
        }
        return {
            ok: true,
            order: order
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo obtener la orden'
        }   
    }
}