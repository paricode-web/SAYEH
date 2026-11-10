"use client"

import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  // حالت خالی بودن سبد
  if (items.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg-base"
      >
        <p className="text-2xl font-bold text-ink">سبد خرید شما خالیه</p>
        <Link href="/" className="btn px-8 py-3">
          برو به فروشگاه
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <div dir="rtl" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
        <h1 className="mb-8 border-b-2 border-ink pb-4 text-2xl font-bold text-ink sm:text-3xl">
          سبد خرید
        </h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-4 border-2 border-fog bg-paper p-4 sm:flex-row sm:items-center"
            >
              {/* Image + name */}
              <div className="flex flex-1 items-center gap-4">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-16 w-16 border border-fog object-cover sm:h-20 sm:w-20"
                />

                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-graphite">
                    {item.price.toLocaleString()} تومان
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between gap-3 sm:justify-center">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="کم کردن"
                  className="flex h-8 w-8 items-center justify-center border-2 border-ink text-ink hover:bg-glass disabled:opacity-30"
                >
                  -
                </button>

                <span className="w-6 text-center font-bold text-ink">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  aria-label="زیاد کردن"
                  className="flex h-8 w-8 items-center justify-center border-2 border-ink text-ink hover:bg-glass"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-sm text-graphite underline underline-offset-4 hover:text-error"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <div className="mt-8 flex flex-col gap-5 border-t-2 border-ink pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-bold text-ink">
            جمع کل: {totalPrice.toLocaleString()} تومان
          </span>

          <Link href="/checkout" className="btn px-6 py-3">
           برو پرداخت
          </Link>
        </div>
      </div>
    </div>
  )
}
