import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props{
selectedSize: Size;
availableSizes: Size[];
}
export const SizeSelector = ({selectedSize, availableSizes}:Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles:</h3>
      <div className="flex">
        {
          availableSizes.map(size => (
            // <button key={size} className={`mr-2 border rounded-md px-3 py-2 ${selectedSize === size ? 'bg-blue-500 text-white' : ''}`}>{size}</button>
            <button 
            key={size}
            className={
              clsx(
                'mx-3 hover:underline text-lg',
                {
                  'underline': size === selectedSize
                }
              )
            }
            >{size}</button>
          ))
        }
      </div>
    </div>
  )
}
