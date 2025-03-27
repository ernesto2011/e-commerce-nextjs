'use client'
import { changeRoleUser } from "@/actions";
import type { User } from "@/interfaces"
interface Props {
    users:User[];
}
export const UsersTable = ({users}:Props) => {
  return (
    <table className="min-w-full ">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-xs md:text-sm font-medium text-gray-900 md:px-6 py-4 text-left">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user)=>(
                <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="text-xs md:text-sm text-gray-900 font-light md:px-6 py-4 whitespace-nowrap">
                    {user.name} 
                  </td>
                  
                  <td className="text-xs md:text-sm text-gray-900 font-light md:px-6 ">
                   <select className="w-full text-xs md:text-sm  text-gray-900" name="" id=""
                    value={user.role}
                    onChange={(e)=>changeRoleUser(user.id, e.target.value)}
                   >
                    <option value={'admin'}>Admin</option>
                    <option value={'user'}>User</option>
                   </select>
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
  )
}
