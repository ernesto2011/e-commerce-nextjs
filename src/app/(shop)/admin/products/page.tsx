export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginateProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormatter } from '@/utils';
import Link from 'next/link';


interface Props {
  searchParams: {
    page?: string
  }
}
export default async function Orders({searchParams}:Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const {products, totalPages} = await getPaginateProductsWithImages({page})
  return (
    <>
      <Title title="Administración de productos" />
      <div className='flex justify-end mb-5'>
        <Link href={'.+/admin/products/new'} className='btn-primary'>
          Nuevo producto
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product)=>(
                <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link  href={`product/${product.slug}`}>
                    <ProductImage src={product.ProductImage[0]?.url} alt={product.title} width={100} height={100} className='w-20 h-20 object-cover rounded'/>
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/product/${product.slug}`} className="hover:underline" title='Editar producto'>
                    {product.title}
                    </Link>
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {currencyFormatter(product.price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(', ')}
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}
