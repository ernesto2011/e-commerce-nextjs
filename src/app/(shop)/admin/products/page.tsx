export const revalidate = 0;

import { getPaginateProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormatter } from '@/utils';
import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Orders({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginateProductsWithImages({ page });

  return (
    <>
      <Title title="Administración de productos" />
      <div className="flex justify-end mb-5">
        <Link href={'/admin/product/new'} className="btn-primary">
          Nuevo producto
        </Link>
      </div>
      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full hidden md:table">
          <thead className="bg-gray-200 border-b">
            <tr>
              {['Imagen', 'Título', 'Precio', 'Género', 'Stock', 'Tallas'].map((header) => (
                <th key={header} className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className="hover:underline" title="Editar producto">
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormatter(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.gender}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.inStock}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Versión móvil - Cards */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex gap-4">
                <Link href={`product/${product.slug}`} className="flex-shrink-0">
                  <ProductImage
                    src={product.ProductImage[0]?.url}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/admin/product/${product.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                    {product.title}
                  </Link>
                  <p className="text-gray-700 text-sm">{currencyFormatter(product.price)}</p>
                  <p className="text-gray-500 text-xs">Género: {product.gender}</p>
                  <p className="text-gray-500 text-xs">Stock: {product.inStock}</p>
                  <p className="text-gray-500 text-xs">Tallas: {product.sizes.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
