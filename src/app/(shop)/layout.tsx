import { TopMenu } from "@/components";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      <div className="px-0 sm:px-8">
        {children}
      </div>
    </>
  )
}
