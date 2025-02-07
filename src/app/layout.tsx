import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
