'use client'
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast"
import CartDrawer from "../cart/cartDrawer";
type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    features: string;
    category: string;
    countInStock: number;
    images: {
      id: string;
      url: string;
    }[];
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10"
      dir="rtl"
    >
      <div className="mx-auto overflow-hidden border-2 border-ink bg-paper">
        <div className="flex flex-col-reverse md:flex-row-reverse">

          {/* اطلاعات محصول */}
          <div className="flex w-full flex-1 flex-col justify-center p-5 sm:p-7 md:p-10 lg:p-14">

            <h1 className="mb-4 text-2xl font-bold leading-tight text-ink sm:text-3xl md:mb-5 md:text-5xl">
              {product.name}
            </h1>

            <div className="mb-5 flex items-end gap-2 sm:mb-6">
              <span className="text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
                {product.price.toLocaleString()}
              </span>
              <span className="pb-0.5 text-xs text-graphite sm:pb-1 sm:text-sm">
                تومان
              </span>
            </div>

            <div className="mb-5 h-px w-full bg-fog sm:mb-6" />

            <p className="mb-6 max-w-xl text-sm leading-7 text-graphite sm:mb-8 sm:text-base sm:leading-8">
              {product.features}
            </p>

            {/* موجودی */}
            <div className="mb-6 sm:mb-8">
              {product.countInStock > 0 ? (
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <span className="inline-flex items-center gap-2 border-2 border-ink px-3.5 py-1.5 text-xs font-bold text-ink sm:px-4 sm:text-sm">
                    <span className="h-2 w-2 bg-ink" />
                    موجود
                  </span>
                  <span className="text-xs text-graphite sm:text-sm">
                    تعداد موجودی: {product.countInStock}
                  </span>
                </div>
              ) : (
                <span className="inline-flex items-center gap-2 border-2 border-fog bg-glass px-3.5 py-1.5 text-xs font-bold text-graphite sm:px-4 sm:text-sm">
                  <span className="h-2 w-2 border border-graphite" />
                  ناموجود
                </span>
              )}
            </div>

            <button
              className="btn w-full py-3.5 text-sm sm:px-6 sm:py-4 sm:text-base md:w-fit md:min-w-[260px]"
              onClick={() => {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0]?.url ?? "/images/placeholder.jpg",
                });

                setIsCartOpen(true);

                toast.success(`${product.name} به سبد خرید اضافه شد`);
              }}
            >
              افزودن به سبد خرید
            </button>
          </div>

          {/* تصویر محصول */}
          <div className="relative h-[320px] w-full flex-1 overflow-hidden border-b-2 border-ink bg-glass sm:h-[420px] md:h-auto md:min-h-[560px] md:border-b-0 md:border-r-2">
            <Image
              src={product.images[0]?.url ?? "/images/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />

            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
