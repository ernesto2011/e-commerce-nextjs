'use server'
import { prisma } from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender
}
export const getPaginateProductsWithImages = async ({page=1, take=12, gender}:PaginationOptions) =>{
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;
    try {
        
      const products = await prisma.product.findMany({
        take: take,
        skip: (page-1)*take,
        include:{
          ProductImage:{
            take:2,
            select:{
              url:true
            }
          }
        },
        where:{
          gender: gender
        }
      }) 
      const totalCount = await prisma.product.count({
        where:{
          gender: gender
        }
      });
       // Obtener el total de productos
      const totalPages = Math.ceil(totalCount / take);
      return{
        currentPage: page,
        totalPages: totalPages,
        products: products.map(product =>({
            ...product,
            images: product.ProductImage.map(image => image.url)
        })) 
      }
      
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los productos')   
    }
}