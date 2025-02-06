
export default function LayoutPage({children}:{
  children:React.ReactNode
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10 ">
        {children}
      </div>
    </div>
  )
}