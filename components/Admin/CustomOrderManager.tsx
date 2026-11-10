import { CustomOrder } from "@prisma/client";

type Props = {
  orders: CustomOrder[];
};

export default function CustomOrderManager({ orders }: Props) {
  return (
    <section className="w-full">
      <h2 className="mb-5 text-xl font-bold text-ink sm:text-2xl">
        سفارش‌های اختصاصی
      </h2>

      {orders.length === 0 ? (
        <div className="bg-glass p-4 text-center text-sm text-graphite">
          هنوز سفارشی نیومده
        </div>
      ) : (
        <div className="max-h-[600px] space-y-4 overflow-y-auto">
          {orders.map((o) => (
            <div key={o.id} className="border-2 border-fog bg-paper p-4 md:p-6">
              <div className="mb-3 flex flex-col gap-2 border-b border-fog pb-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-ink">{o.name}</h3>
                <a
                  href={`tel:${o.phone}`}
                  dir="ltr"
                  className="link w-fit text-sm font-bold text-ink"
                >
                  {o.phone}
                </a>
              </div>

              <p className="mb-3 whitespace-pre-wrap text-sm leading-7 text-ink">
                {o.description}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                {o.size && (
                  <span className="border border-ink px-2 py-1 text-ink">{o.size}</span>
                )}
                {o.budget && (
                  <span className="border border-ink px-2 py-1 text-ink">{o.budget}</span>
                )}
                <span className="bg-glass px-2 py-1 text-graphite">
                  {new Date(o.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {o.imageUrl && (
                <a href={o.imageUrl} target="_blank" rel="noreferrer" className="mt-4 block w-fit">
                  <img
                    src={o.imageUrl}
                    alt="عکس مرجع"
                    className="h-32 w-32 border border-fog object-cover"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
