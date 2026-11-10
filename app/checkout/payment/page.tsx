"use client";

import toast from "react-hot-toast"
import { createOrder } from "@/app/actions/createOrders"
import { useCartStore } from "@/lib/cart-store"
import { useCheckoutStore } from "@/lib/checkout-store"
import { useRouter } from "next/navigation"
import { startPayment } from "@/app/actions/startPayment"

export default function PaymentPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  const handlePayment = async () => {
    try {
      const orderData = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      const result = await createOrder(orderData)
      const payment = await startPayment(result.orderId)
      const authority = payment.authority

      router.push(`/checkout/payment/${authority}`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("خطایی رخ داد")
      }
    }
  }

  if (!shippingInfo) {
    return (
      <div dir="rtl" className="min-h-screen bg-bg-base px-4">
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-center">
          <div className="border-2 border-ink bg-glass px-6 py-5">
            <p className="text-lg font-bold text-ink">
              لطفاً اول اطلاعات ارسال را تکمیل کنید
            </p>
          </div>

          <button onClick={() => router.push("/checkout")} className="btn px-6 py-3">
            برگشت به فرم اطلاعات
          </button>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-bg-base px-4 pb-16 pt-28">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 border-b-2 border-ink pb-6">
          <p className="mb-2 text-sm font-bold text-graphite">Lumina Vitray</p>

          <h1 className="text-3xl font-bold text-ink">خلاصه سفارش</h1>

          <p className="mt-2 text-sm text-graphite">
            اطلاعات سفارش را بررسی کنید و سپس پرداخت را انجام دهید.
          </p>
        </div>

        {/* Shipping */}
        <div className="mb-5 border-2 border-fog bg-paper p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">اطلاعات ارسال</h2>

            <span className="border border-ink px-3 py-1 text-xs font-bold text-ink">
              آدرس تحویل
            </span>
          </div>

          <div className="grid gap-3 text-sm text-graphite">
            <p>
              <span className="font-bold text-ink">نام:</span>{" "}
              {shippingInfo.fullName}
            </p>
            <p>
              <span className="font-bold text-ink">تماس:</span>{" "}
              {shippingInfo.phone}
            </p>
            <p>
              <span className="font-bold text-ink">آدرس:</span>{" "}
              {shippingInfo.city}، {shippingInfo.address}
            </p>
            <p>
              <span className="font-bold text-ink">کد پستی:</span>{" "}
              {shippingInfo.postalCode}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mb-5 border-2 border-fog bg-paper p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">محصولات</h2>
            <span className="text-sm text-graphite">{items.length} آیتم</span>
          </div>

          <div className="flex flex-col divide-y divide-fog">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-graphite">
                    تعداد: {item.quantity}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-bold text-ink">
                  {(item.price * item.quantity).toLocaleString()} تومان
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="border-2 border-ink bg-paper p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-graphite">مبلغ قابل پرداخت</p>

              <p className="mt-1 text-3xl font-bold text-ink">
                {totalPrice.toLocaleString()}
                <span className="mr-2 text-sm font-medium text-graphite">
                  تومان
                </span>
              </p>
            </div>

            <button onClick={handlePayment} className="btn px-8 py-4">
              پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
