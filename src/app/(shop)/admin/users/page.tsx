export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getAllUsers, getPaginatedOrders } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function Orders() {
  const {ok, users=[]}= await getAllUsers()
  if(!ok){
    redirect('/auth/login')
  }
  return (
    <>
      <Title title="Todas las ordenes" />

      <div className="mb-10">
       <UsersTable users={users} />
      </div>
    </>
  );
}
