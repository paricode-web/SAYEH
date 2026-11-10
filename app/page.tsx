import Navbar from "@/components/layout/Navbar";
import { prisma } from "@/lib/prisma";
import Slider from "@/components/home/Slider";
import ProductSlider from "@/components/home/ProductSwiper";
import ProductCard from "@/components/home/ProductCard";
import Input from "@/components/home/Input";
import Link from "next/link";
import Gallery from "@/components/home/Gallery";
import AboutPreview from "@/components/home/AboutPreviw";
import Footer from "@/components/layout/Footer";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;

  const products = await prisma.product.findMany({
    where: search
      ? {
          name: {
            contains: search,
          },
        }
      : {},
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const images = await prisma.gallery.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-bg-base pb-16 text-right text-ink"
      dir="rtl"
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 pt-24 sm:gap-12 sm:px-6 sm:pt-28 lg:px-8">

        {/* Brand Intro */}
        <div className="w-full bg-ink p-6 text-center text-paper sm:p-10 md:p-16">

          <img
            src="/logos/mark-light.svg"
            alt=""
            className="mx-auto mb-6 h-12 w-12 sm:h-16 sm:w-16"
          />

          <h1 className="mb-3 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
           SAYEH
          </h1>

          <p className="mb-8 text-sm text-fog sm:text-base md:text-lg">
            تلالو نور و رنگ روی شیشه‌های دست‌ساز
          </p>

          <div className="mx-auto w-full max-w-xl">
            <Input />
          </div>

          {/* Search Results */}
          {search && (
            <div className="mx-auto mt-2 w-full max-w-xl overflow-hidden text-right">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block min-h-[48px] border-b border-fog bg-paper px-4 py-3 text-sm text-ink hover:bg-glass sm:text-base"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Main Slider */}
        <div className="w-full">
          <Slider />
        </div>

        {/* Featured Products */}
        <section className="w-full">
          <h2 className="mb-5 border-b-2 border-ink pb-3 text-xl font-bold text-ink sm:mb-6 sm:text-2xl">
            محصولات ویژه
          </h2>

          <ProductSlider products={products} />
        </section>

        {/* All Products */}
        <section id="shop" className="w-full">
          <h2 className="mb-5 border-b-2 border-ink pb-3 text-xl font-bold text-ink sm:mb-6 sm:text-2xl">
            همه محصولات فروشگاه
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/chatpage" className="btn px-8 py-4">
              محصول مناسب خود را پیدا کنید
            </Link>
            <Link href="/custom-order" className="btn px-8 py-4">طرح خودت رو بساز</Link>
          </div>

          <div id="gallery" className="mt-10">
            <Gallery images={images} />
          </div>
        </section>

        <AboutPreview />
        <Footer />
      </div>
    </main>
  );
}
