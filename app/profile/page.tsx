import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base font-bold text-ink">
        Login required
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-bg-base font-bold text-ink"
      >
        کاربر پیدا نشد
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-bg-base px-4 py-6 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl border-2 border-ink bg-paper p-5 sm:p-8">

        {/* User Info */}
        <div className="mb-8 border-b-2 border-ink pb-8 text-center">
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            {user.name}
          </h1>

          <p className="mt-2 break-all text-sm text-graphite sm:text-base">
            {user.email}
          </p>

          <div className="mt-4 inline-flex border-2 border-ink px-5 py-2 text-sm font-bold text-ink sm:text-base">
            {user.orders.length} سفارش ثبت شده
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {user.orders.map((order) => (
            <div
              key={order.id}
              className="border-2 border-fog bg-paper p-4 sm:p-6"
            >
              {/* Order Header */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-graphite">شماره سفارش</p>
                  <p className="break-all text-sm font-bold text-ink sm:text-base">
                    {order.id}
                  </p>
                </div>

                <span className="w-fit border border-ink px-4 py-1 text-sm text-ink">
                  {order.status}
                </span>
              </div>

              {/* Total */}
              <div className="mb-5 bg-glass p-3">
                <p className="text-sm text-graphite sm:text-base">
                  مبلغ کل:
                  <span className="mr-2 font-bold text-ink">
                    {order.total.toLocaleString()} تومان
                  </span>
                </p>
              </div>

              <h3 className="mb-3 font-bold text-ink">محصولات</h3>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 border border-fog bg-glass p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-ink">{item.product.name}</p>
                      <p className="mt-1 text-sm text-graphite">
                        تعداد: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-ink">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
