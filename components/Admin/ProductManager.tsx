
import type { Product} from "@prisma/client";
type Props = {
  products: Product[];
  deleteItem: (formData: FormData) => Promise<void>;
  updateProduct: (formData: FormData) => Promise<void>;
};

const field =
  "border-2 border-fog bg-paper px-4 py-3 text-sm text-ink focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink";

export default function ProductManager({
  products,
  deleteItem,
  updateProduct,
}: Props) {
  return (
    <section className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">
        مدیریت محصولات
      </h2>

      <div className="space-y-5 md:space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border-2 border-fog bg-paper p-4 sm:p-6"
          >
            {/* Header */}
            <div className="mb-5 flex flex-col gap-4 border-b border-fog pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-ink sm:text-xl">
                  {product.name}
                </h3>
                <p className="mt-1 break-all text-xs text-graphite sm:text-sm">
                  شناسه: {product.id.slice(0, 8)}
                </p>
              </div>

              <span className="w-fit border-2 border-ink px-4 py-2 text-sm font-bold text-ink">
                {product.price.toLocaleString()} تومان
              </span>
            </div>

            {/* فرم ویرایش */}
            <form
              action={updateProduct}
              className="grid grid-cols-1 gap-4 lg:grid-cols-3"
            >
              <input type="hidden" name="id" value={product.id} />

              <input
                type="text"
                name="name"
                defaultValue={product.name}
                className={field}
              />

              <input
                type="number"
                name="price"
                defaultValue={product.price}
                className={field}
              />

              <button type="submit" className="btn py-3 text-sm">
                ذخیره تغییرات
              </button>
            </form>

            {/* حذف */}
            <div className="mt-5 flex justify-end">
              <form action={deleteItem}>
                <input type="hidden" name="id" value={product.id} />

                <button
                  type="submit"
                  className="border-2 border-error bg-paper px-5 py-3 text-sm font-bold text-error hover:bg-error hover:text-paper"
                >
                  حذف محصول
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
