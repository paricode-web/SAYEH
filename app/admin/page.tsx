// app/admin/page.tsx
import OrderManager from "@/components/Admin/OrdersManager";
import PictureManager from "@/components/Admin/PictureManager";
import { prisma } from "@/lib/prisma"; // اصلاح نام ایمپورت
import { redirect } from "next/navigation";
import ProductManager from "@/components/Admin/ProductManager";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary";
import Link from "next/link";

/* ───────── Brand tokens ─────────
   Ink #0A0A0A · Paper #FAFAF9 · Glass #EDEDEB · Graphite #6B6B6B · Fog #D6D6D6
   قوانین: گوشهٔ تیز، بدون شیشه‌ای/بلور، هاور دکمه = وارونه شدن،
   هاور لینک = خط‌زیر ضخیم بدون تغییر رنگ. */

const inputCls =
  "w-full border-2 border-[#D6D6D6] bg-[#FAFAF9] px-4 py-3 text-sm md:text-base " +
  "text-[#0A0A0A] placeholder:text-[#6B6B6B] outline-none transition-colors " +
  "focus:border-[#0A0A0A]";

const buttonCls =
  "inline-flex w-full items-center justify-center border-2 border-[#0A0A0A] " +
  "bg-[#0A0A0A] px-6 py-3 text-sm md:text-base font-bold text-[#FAFAF9] " +
  "transition-colors hover:bg-[#FAFAF9] hover:text-[#0A0A0A]";

const cardCls = "border border-[#D6D6D6] bg-[#EDEDEB]";

/** نوار برچسب بالای هر کارت: شماره + اسلش اریب + عنوان کوتاه */
function CardLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#D6D6D6] bg-[#FAFAF9] px-5 py-3 text-xs text-[#6B6B6B] md:px-8">
      <span className="font-bold text-[#0A0A0A]">
        {n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
      </span>
      <span
        aria-hidden
        className="inline-block h-3.5 w-px bg-[#0A0A0A]/40"
        style={{ transform: "skewX(-20deg)" }}
      />
      {children}
    </div>
  );
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  const users = await prisma.user.findMany({
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
  });

  const products = await prisma.product.findMany();

  async function uploadImage(formData: FormData) {
    "use server";

    const image = formData.get("image") as File;

    if (!image || image.size === 0) {
      throw new Error("فایلی انتخاب نشده");
    }

    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "lumina-products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    const imageUrl = (uploadResult as any).secure_url;

    const productId = formData.get("productId") as string;

    await prisma.productImage.create({
      data: {
        url: imageUrl,
        productId,
      },
    });
  }

  async function createProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;

    // ساخت یک اسلاگ ساده بر اساس نام محصول برای اینکه ارور یکتا بودن نگیریم
    const slug = name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    await prisma.product.create({
      data: {
        name: name,
        slug: slug,
        price: Number(price),
        category: "دستی", // فیلدهای اجباری اسکیما رو اینجا پر می‌کنیم
        features: "ویژگی‌های پیش‌فرض",
        countInStock: 10,
      },
    });
  }

  async function updateProduct(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
      },
    });
  }

  async function deleteItem(formdata: FormData) {
    "use server";
    const id = formdata.get("id") as string;

    await prisma.product.delete({
      where: {
        id,
      },
    });
    redirect("/admin");
  }

  const orderCount = users.reduce((sum, u) => sum + u.orders.length, 0);
  const fa = (n: number) => n.toLocaleString("fa-IR");

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FAFAF9] font-vazirmatn text-[#0A0A0A]"
    >
      {/* تایپ خیلی درشت که از لبهٔ صفحه بیرون می‌زند */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-6 select-none text-[22vw] font-black leading-none tracking-[0.12em] text-[#EDEDEB] md:top-0"
        style={{ direction: "ltr" }}
      >
        ADMIN
      </span>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:px-8 md:pt-32">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 border-b-2 border-[#0A0A0A] pb-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest text-[#6B6B6B]">
              پنل مدیریت
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
              سایه
            </h1>
            <p className="mt-3 text-sm text-[#6B6B6B] md:text-base">
              محصولات، تصاویر و سفارشات.
            </p>
          </div>

          <Link
            href="/admin/gallery"
            className="inline-flex items-center justify-center border-2 border-[#0A0A0A] bg-[#0A0A0A] px-8 py-3 text-sm font-bold text-[#FAFAF9] transition-colors hover:bg-[#FAFAF9] hover:text-[#0A0A0A] md:self-end"
          >
            مدیریت گالری
          </Link>
        </header>

        {/* Stats — بلوک‌های مربعی با خط جداکننده */}
        <dl className="mb-10 grid grid-cols-3 border border-[#D6D6D6] bg-[#FAFAF9] md:mb-14">
          {[
            { label: "محصول", value: products.length },
            { label: "سفارش", value: orderCount },
            { label: "کاربر", value: users.length },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-5 md:px-8 md:py-7 ${
                i > 0 ? "border-r border-[#D6D6D6]" : ""
              }`}
            >
              <dd className="text-3xl font-black md:text-5xl">{fa(s.value)}</dd>
              <dt className="mt-1 text-xs text-[#6B6B6B] md:text-sm">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* گرید نامتقارن: ستون باریک (فرم‌ها) + ستون پهن (سفارشات) */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ستون راست در RTL */}
          <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
            {/* Create Product */}
            <section className={cardCls}>
              <CardLabel n={1}>افزودن محصول</CardLabel>

              <form action={createProduct} className="space-y-4 p-5 md:p-8">
                <h2 className="text-xl font-black md:text-2xl">
                  محصول جدید
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="نام محصول"
                  required
                  className={inputCls}
                />

                <input
                  type="number"
                  name="price"
                  placeholder="قیمت"
                  required
                  className={inputCls}
                />

                <button className={buttonCls}>ذخیره محصول</button>
              </form>
            </section>

            {/* Upload */}
            <section className={cardCls}>
              <CardLabel n={2}>تصاویر محصول</CardLabel>

              <div className="p-5 md:p-8">
                <PictureManager
                  products={products}
                  uploadImage={uploadImage}
                />
              </div>
            </section>
          </div>

          {/* Orders */}
          <section className={`${cardCls} lg:col-span-7`}>
            <CardLabel n={3}>سفارشات</CardLabel>

            <div className="max-h-[520px] overflow-y-auto p-5 md:max-h-[640px] md:p-8">
              <OrderManager users={users} />
            </div>
          </section>
        </div>

        {/* Product Manager — تمام‌عرض */}
        <section className={`mt-6 lg:mt-8 ${cardCls}`}>
          <CardLabel n={4}>مدیریت محصولات</CardLabel>

          <div className="p-5 md:p-8">
            <ProductManager
              products={products}
              deleteItem={deleteItem}
              updateProduct={updateProduct}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
