import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components";


export const metadata: Metadata = {
  title:{
    template:'%s - Teslo | Shop',
    default: 'Teslo | Shop'
  },
  description: "tienda virtual de productos",
  icons: {
    icon: "/teslo.ico",
  },
  keywords: ["teslo", "shop", "productos", "tienda", "ecommerce"],
  openGraph: {
    title: "Teslo | Shop",
    description: "tienda virtual de productos",
    url: "https://e-commerce-nextjs-roots.vercel.app/",
    siteName: "Teslo | Shop",
    images: [
      {
        url: "https://res.cloudinary.com/pruebas-test/image/upload/v1741460455/Galaxy-Tab-S7-e-commerce-nextjs-roots.vercel.app_kpw00q.png",
        width: 1920,
        height: 1080,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teslo | Shop",
    description: "tienda virtual de productos",
    images: ["https://res.cloudinary.com/pruebas-test/image/upload/v1741460455/Galaxy-Tab-S7-e-commerce-nextjs-roots.vercel.app_kpw00q.png"],
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
