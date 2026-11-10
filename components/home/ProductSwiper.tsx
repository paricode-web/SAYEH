"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  features: string;
  countInStock: number;
}

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <div
      className="my-6 w-full overflow-hidden px-1 text-right sm:my-8 sm:px-2 md:px-4"
      dir="rtl"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.15}
        spaceBetween={12}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          480: { slidesPerView: 1.4, spaceBetween: 14 },
          640: { slidesPerView: 2, spaceBetween: 18 },
          768: { slidesPerView: 2.3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 28 },
        }}
        className="!pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full border-2 border-fog bg-paper p-3 transition-colors hover:border-ink sm:p-4">

              {/* Image */}
              <div className="h-52 w-full overflow-hidden bg-glass sm:h-56 md:h-60 lg:h-64">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-graphite">
                    بدون تصویر
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="mt-3 truncate text-sm font-bold text-ink sm:text-base">
                {product.name}
              </h3>

              {/* Price + Stock */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-ink sm:text-sm">
                  {product.price.toLocaleString()} تومان
                </span>

                {product.countInStock > 0 ? (
                  <span className="whitespace-nowrap border border-ink px-2 py-1 text-[10px] text-ink sm:text-xs">
                    موجود
                  </span>
                ) : (
                  <span className="whitespace-nowrap bg-glass px-2 py-1 text-[10px] text-graphite sm:text-xs">
                    ناموجود
                  </span>
                )}
              </div>

              {/* Button */}
              <Link
                href={`/product/${product.slug}`}
                className="btn mt-4 w-full py-2.5 text-xs sm:text-sm"
              >
                مشاهده محصول
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
