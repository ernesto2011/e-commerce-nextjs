export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrderById() {
  const {ok, orders=[]}= await getOrdersByUser()
  if(!ok){
    redirect('/auth/login')
  }
  return (
    <>
      <Title title="Todas las ordenes" />

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full hidden md:table">
          <thead className="bg-gray-200 border-b">
            <tr>
              {['#ID', 'Nombre completo', 'Estado', 'Opciones',].map((header) => (
                <th key={header} className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order)=>(
                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                      order.isPaid
                      ?(<>
                        <IoCardOutline className="text-green-800" />
                        <span className='mx-2 text-green-800'>Pagada</span>
                      </>
                      ):(
                        <>
                        <IoCardOutline className="text-red-800" />
                        <span className='mx-2 text-red-800'>No Pagada</span>
                        </>
                      )
                    }
                    
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      Ver orden
                    </Link>
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
        <div className='md:hidden space-y-2'>
            {
              orders.map((order)=>(
                <div key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 gap-2">
                  <div className="px-6 whitespace-nowrap text-sm font-normal text-gray-900">
                    <p><span className='font-semibold'>Id: </span>{order.id.split('-').at(-1)}</p>
                  </div>
                  <div className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                    <p className='capitalize '><span className='font-semibold'>Nombre: </span>{order.OrderAddress?.firstName} {order.OrderAddress?.lastName} </p>
                  </div>
                  <div className="flex items-center text-sm  text-gray-900 font-light px-6 whitespace-nowrap">
                    <p className='flex flex-row items-center gap-1 justify-center'>
                      <span className='font-semibold'>Estado: </span>
                    {
                      order.isPaid
                      ?(<>
                        <IoCardOutline className="text-green-800" />
                        <span className=' text-green-800'>Pagada</span>
                      </>
                      ):(
                        <>
                        <IoCardOutline className="text-red-800" />
                        <span className=' text-red-800'>No Pagada</span>
                        </>
                      )
                    }
                    </p>

                  </div>
                  <div className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${order.id}`} className="hover:underline hover:text-blue-700">
                      Ver orden
                    </Link>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    </>
  );
}
