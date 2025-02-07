import { getProductBySlug } from "@/actions";
import { titleFont } from "@/app/fonts/fonts";
import { QuantitySelector, SizeSelector, SlideShowMobile, StockLabel } from "@/components";
import { SlideShow } from "@/components/product/slideshow/SlideShow";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props{
  params:{
    slug:string
  }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({params}:Props) {
  const {slug} = params;
  const product = await getProductBySlug(slug)
  if(!product){
    notFound()
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
      <SlideShowMobile title={product.title} images={product.images} className="block sm:hidden"/>
      <SlideShow title={product.title} className="hidden sm:block" images={product.images}/> 
      </div>
      <div className="col-span-1 px-2  md:px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">$ {product.price}</p>
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        <QuantitySelector quantity={1} />
        <button className="btn-primary my-5">Agregar al carrito</button>
        <h3 className="font-bold text-sm">Descripción:</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
