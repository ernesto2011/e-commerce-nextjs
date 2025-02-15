import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components";


export const metadata: Metadata = {
  title:{
    template:'%s - Teslo | Shop',
    default: 'Teslo | Shop'
  },
  description: "tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
