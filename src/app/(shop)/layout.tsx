import { Footer, Sidebar, TopMenu } from "@/components";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      <Sidebar/>
      <div className="px-0 sm:px-8">
        {children}
      </div>
      <Footer/>
    </>
  )
}
