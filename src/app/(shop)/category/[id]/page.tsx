import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation"

interface Props{
  params:{
    id:Category
  }

}

const labels:Record<Category, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': ' para todos'	
}
const products = initialData.products;
export default function CategoryByIdPage({params}:Props) {
  const {id} = params;
  // if(!validCategories.includes(params.id)){
  //   notFound();
  // }
  const productsByCategory = products.filter(product => product.gender === id);
  return (
    <>
    <Title title={`Articulos de ${labels[id]}`} subtitle="Todos los productos" className="mb-2"/>
    <ProductGrid products={productsByCategory} />
    </>
  )
}
