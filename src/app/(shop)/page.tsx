export const revalidate = 60
import { getPaginateProductsWithImages } from '@/actions';
import { ProductGrid, Title } from '@/components'
import { Pagination } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string
  }
}


export default async function page({searchParams}:Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const {products, totalPages} = await getPaginateProductsWithImages({page})
  if(products.length === 0){
    redirect('/')
  }
  return (
    <div>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2"/>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
