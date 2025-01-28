import { notFound } from "next/navigation"

interface Props{
  params:{
    id:string
  }

}
const validCategories =[
  'men',
  'women',
  'kids',
]

export default function CategoryByIdPage({params}:Props) {
  if(!validCategories.includes(params.id)){
    notFound();
  }
  return (
    <div>CategoryByIdPage</div>
  )
}
