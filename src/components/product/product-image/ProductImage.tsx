import Image from "next/image";
interface Props{
    src?:string;
    alt:string;
    width:number;
    height:number;
    className?:React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
    onMouseEnter?: () => void;	
    onMouseLeave?: () => void;
}
export const ProductImage = ({src, alt, width,height,className, style, onMouseEnter,onMouseLeave}:Props) => {
    const localSrc = (src)
    ? src.startsWith('http')
        ? src
        : `/products/${src}`
    : '/imgs/placeholder.jpg';
  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

    />
  );
};
