'use server'

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
    try {
      const existingAddress = await prisma.userAddress.findUnique({
        where: { userId }
      });
  
      if (!existingAddress) {
        return {
          ok: false,
          message: "La dirección no existe, no es necesario eliminarla."
        };
      }
  
      await prisma.userAddress.delete({
        where: { userId }
      });
  
      return {
        ok: true,
        message: "Dirección eliminada correctamente."
      };
  
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "No se pudo eliminar la dirección"
      };
    }
  };
  