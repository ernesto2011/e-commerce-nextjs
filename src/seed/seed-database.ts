import { initialData } from "./seed";
import {prisma} from '../lib/prisma'

async function main(){
    console.log('clean database');
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    
    console.log('cleaned database<<<<>>>>');
    const {categories, products, users}= initialData
    await prisma.user.createMany({
        data: users
    })
    
    const categoriesData = categories.map((name) =>({name}))
    await prisma.category.createMany({
        data:categoriesData
    })
    const categoryDB = await prisma.category.findMany();
    const categoriesMap = categoryDB.reduce((map, category)=>{
        map[category.name.toLocaleLowerCase()]= category.id;
        return map
    },{} as Record<string, string>)

    products.forEach(async (product)=>{
       const {type, images, ...rest} = product;
       const dbProduct = await prisma.product.create({
        data:{
            ...rest,
            categoryId: categoriesMap[type]
        }
       })
       const imagesData = images.map(image=>({
        url:image,
        productId: dbProduct.id
       }))
       await prisma.productImage.createMany({
        data:imagesData
       })
    })
    console.log('seed executed');
}

(()=>{
    if ( process.env.NODE_ENV === 'production' ) return;
    main();
})();