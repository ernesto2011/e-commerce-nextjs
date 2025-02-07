'use server'
import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (slug: string):Promise<number> => {
  try {
    const stock = await prisma.product.findUnique({
      select: {
        inStock: true,
      },
      where: {
        slug: slug,
      },
    });

    return stock?.inStock ??0;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el stock del producto')
  }
};
