import { Prisma } from "@prisma/client";
type UserWithOrders = Prisma.UserGetPayload<{
  include: {
    orders: {
      include: {
        items: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

type Props = {
  users: UserWithOrders[];
};

export default function OrderManager({ users }: Props) {
  return (
    <section className="w-full">
      <h2 className="mb-5 text-xl font-bold text-ink sm:text-2xl">
        مدیریت سفارشات
      </h2>

      <div className="max-h-[450px] space-y-5 overflow-y-auto pr-1 md:max-h-[600px] md:pr-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="border-2 border-fog bg-paper p-4 md:p-6"
          >
            {/* اطلاعات کاربر */}
            <div className="mb-4 border-b border-fog pb-3">
              <h3 className="truncate text-lg font-bold text-ink md:text-xl">
                {user.name}
              </h3>
              <p className="mt-1 break-all text-xs text-graphite md:text-sm">
                {user.email}
              </p>
            </div>

            {user.orders.length === 0 ? (
              <div className="bg-glass p-3 text-center text-sm text-graphite md:p-4">
                هیچ سفارشی ثبت نشده
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-fog bg-glass p-3 md:p-4"
                  >
                    {/* Order Header */}
                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="break-all text-sm font-bold text-ink md:text-base">
                        سفارش #{order.id.slice(0, 8)}
                      </p>

                      <span className="w-fit border-2 border-ink px-3 py-1 text-xs font-bold text-ink md:text-sm">
                        {order.total.toLocaleString()} تومان
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 border border-fog bg-paper px-3 py-2 text-sm sm:flex-row sm:justify-between"
                        >
                          <span className="truncate text-ink">
                            {item.product.name}
                          </span>
                          <span className="text-graphite">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
