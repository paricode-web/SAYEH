import type { Product } from "@prisma/client";

type Props = {
  uploadImage: (formData: FormData) => Promise<void>;
  products: Product[];
};

const field =
  "w-full border-2 border-fog bg-paper p-3 text-sm text-ink focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink";

export default function PictureManager({ uploadImage, products }: Props) {
  return (
    <section className="w-full border-2 border-fog bg-paper p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">
        آپلود عکس
      </h2>

      <form action={uploadImage} className="flex flex-col gap-4">
        <input type="file" name="image" accept="image/*" className={field} />

        <select name="productId" className={field}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn w-full py-3">
          آپلود
        </button>
      </form>
    </section>
  );
}
