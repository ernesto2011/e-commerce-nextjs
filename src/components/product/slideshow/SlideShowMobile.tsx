"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title?: string;
  className?: string;
}

export const SlideShowMobile = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
       <Swiper
       style={{
        width: '100vw',
        height: '500px'
       }}
        pagination
        autoplay={{
            delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
            images.map(image => (
                <SwiperSlide key={image}>
                    <ProductImage src={image} alt={title || ''} width={720} height={500} className=" object-fill" />
                </SwiperSlide>
        
            ))
        }
      </Swiper>
    </div>
  );
};
