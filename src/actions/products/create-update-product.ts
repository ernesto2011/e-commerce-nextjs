'use server'
import { prisma } from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import {z} from 'zod'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL || '' );

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
      .number()
      .min(0)
      .transform( val => Number(val.toFixed(2)) ),
    inStock: z.coerce
      .number()
      .min(0)
      .transform( val => Number(val.toFixed(0)) ),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform( val => val.split(',') ),
    tags: z.string(),
    gender: z.nativeEnum(Gender), 
  });
export const createUpdateProduct = async(formData:FormData) =>{
    const data = Object.fromEntries(formData)
    const result = productSchema.safeParse(data)
    if(!result.success){
        console.log(result.error)
        return {ok:false}
    }
    const product = result.data
    product.slug = product.title.toLowerCase().replace(/ /g, '-').trim();
    const {id,...rest} = product
    try {
        const prismaTx = await prisma.$transaction(async(tx)=>{
            console.log(tx);
            
            let product: Product;
            const tagsArray = rest.tags.split(',').map(tag=>tag.trim().toLowerCase())
            if(id){
                product = await prisma.product.update({
                    where:{id},
                    data:{
                        ...rest,
                        sizes:{
                            set: rest.sizes as Size[]
                        },
                        tags:{
                            set: tagsArray
                        }
                    }
                })
            }else{
                product = await prisma.product.create({
                    data:{
                        ...rest,
                        sizes:{
                            set: rest.sizes as Size[]
                        },
                        tags:{
                            set: tagsArray
                        }
                    }
                })
            }
            if(formData.getAll('images')){
                const images = await uploadFles(formData.getAll('images') as File[])
                if(!images){
                    throw new Error('No se pudo subir las imagenes')
                }
                await prisma.productImage.createMany({
                    data: images.map(image =>({
                        url:image!,
                        productId: product.id
                    }))
                })
            }
            return {product}
        });
        revalidatePath('/admin/products')
        revalidatePath(`/admin/product/${product.slug}`)
        revalidatePath(`/products/${product.slug}`)
        return{
            ok:true, 
            product:prismaTx.product,
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message:'revisar los logs, no se pudo actualizar'
        }
    }
}

const uploadFles = async(images:File[])=>{
    try {
        const uploadedFiles = images.map(async(image)=>{
            try {
                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64')
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`,{
                folder:'nextjs-store'
                }).then((res)=>res.secure_url)
            } catch (error) {
                console.log(error)
                return null
            }
        })
        const uploadedImages = await Promise.all(uploadedFiles)
        return uploadedImages;
    } catch (error) {
        console.log(error)
        return null;
    }
}