import Image from "next/image";
import Link from "next/link";
import type { Product as PrismaProduct } from "@prisma/client";

interface ProductCardProps {
  product: PrismaProduct & {
    images: { id: string; url: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // اولین عکسی که با https شروع می‌شود، وگرنه placeholder
  const mainImage =
    product.images?.find((image) => image.url.startsWith("https://"))?.url ||
    "/images/placeholder.jpg";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block cursor-pointer border-2 border-fog bg-paper p-4 text-right transition-colors hover:border-ink"
    >
      {/* بخش عکس */}
      <div className="relative mb-4 h-70 w-full overflow-hidden border border-fog bg-glass">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* بخش مشخصات */}
      <h2 className="text-lg font-bold text-ink">{product.name}</h2>
      <p className="my-2 line-clamp-2 text-sm text-graphite">
        {product.features}
      </p>

      {/* بخش قیمت و وضعیت */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold text-ink">
          {product.price.toLocaleString()} تومان
        </span>

        {product.countInStock > 0 ? (
          <span className="border border-ink px-2 py-1 text-xs text-ink">
            موجود در انبار
          </span>
        ) : (
          <span className="bg-glass px-2 py-1 text-xs text-graphite">
          تمام شد
          </span>
        )}
      </div>
    </Link>
  );
}
