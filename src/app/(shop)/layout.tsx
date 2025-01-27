import { TopMenu } from "@/components";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      {children}
    </>
  )
}
