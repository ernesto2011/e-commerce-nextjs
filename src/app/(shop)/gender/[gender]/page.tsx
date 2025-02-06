import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation"

interface Props{
  params:{
    gender:string
  }
  searchParams:{
    page:string
  }

}

const labels:Record<string, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': ' para todos'	
}
export default async function CategoryByIdPage({searchParams, params}:Props) {
  const {gender} = params;
  
  // if(!validCategories.includes(params.id)){
  //   notFound();
  // }
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const {products, currentPage, totalPages} = await getPaginateProductsWithImages({page, gender:gender as Gender})
    if(products.length === 0){
      redirect(`/gender/${gender}`)
    }

  return (
    <>
    <Title title={`Articulos de ${labels[gender]}`} subtitle="Todos los productos" className="mb-2"/>
    <ProductGrid products={products} />
    <Pagination totalPages={totalPages} />
    </>
  )
}
