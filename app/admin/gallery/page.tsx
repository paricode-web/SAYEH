// app/admin/gallery/page.tsx
import Link from "next/link";
import { addGalleryImage } from "./actions";

/* ───────── Brand tokens ─────────
   Ink #0A0A0A · Paper #FAFAF9 · Glass #EDEDEB · Graphite #6B6B6B · Fog #D6D6D6 */

const labelCls = "block text-sm font-bold text-[#0A0A0A]";

const fieldCls =
  "w-full border-2 border-[#D6D6D6] bg-[#FAFAF9] px-4 py-3 text-sm md:text-base " +
  "text-[#0A0A0A] placeholder:text-[#6B6B6B] outline-none transition-colors " +
  "focus:border-[#0A0A0A]";

const fileCls =
  "block w-full cursor-pointer border-2 border-dashed border-[#D6D6D6] bg-[#FAFAF9] " +
  "px-4 py-4 text-sm text-[#6B6B6B] transition-colors hover:border-[#0A0A0A] " +
  "file:ml-4 file:cursor-pointer file:border-2 file:border-[#0A0A0A] file:bg-[#0A0A0A] " +
  "file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#FAFAF9] " +
  "file:transition-colors hover:file:bg-[#FAFAF9] hover:file:text-[#0A0A0A]";

export default function GalleryAdmin() {
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
        GALLERY
      </span>

      <div className="relative mx-auto max-w-2xl px-4 pb-16 pt-28 sm:px-6 md:pt-32">
        {/* بازگشت */}
        <Link
          href="/admin"
          className="mb-8 inline-block text-sm font-medium underline decoration-2 decoration-transparent underline-offset-4 transition-[text-decoration-color] hover:decoration-[#0A0A0A]"
        >
          ← بازگشت به پنل مدیریت
        </Link>

        {/* Header */}
        <header className="mb-10 border-b-2 border-[#0A0A0A] pb-8">
          <p className="mb-3 text-xs font-bold tracking-widest text-[#6B6B6B]">
            گالری
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            افزودن اثر
          </h1>
          <p className="mt-3 text-sm text-[#6B6B6B] md:text-base">
            یک اثر جدید به گالری سایه اضافه کنید.
          </p>
        </header>

        {/* Form card */}
        <section className="border border-[#D6D6D6] bg-[#EDEDEB]">
          <div className="flex items-center gap-3 border-b border-[#D6D6D6] bg-[#FAFAF9] px-5 py-3 text-xs text-[#6B6B6B] md:px-8">
            <span className="font-bold text-[#0A0A0A]">۰۱</span>
            <span
              aria-hidden
              className="inline-block h-3.5 w-px bg-[#0A0A0A]/40"
              style={{ transform: "skewX(-20deg)" }}
            />
            اثر جدید
          </div>

          <form
            action={addGalleryImage}
            encType="multipart/form-data"
            className="space-y-6 p-5 md:p-8"
          >
            <div className="space-y-2">
              <label htmlFor="title" className={labelCls}>
                عنوان تصویر
              </label>
              <input
                id="title"
                name="title"
                placeholder="مثلاً: پنجره نورانی"
                className={fieldCls}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className={labelCls}>
                توضیحات
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="توضیح کوتاه دربارهٔ اثر..."
                rows={4}
                className={`${fieldCls} resize-none`}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className={labelCls}>
                تصویر اثر
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className={fileCls}
              />
              <p className="text-xs text-[#6B6B6B]">
                اثر را روی زمینهٔ سفید یا روشن عکس بگیرید تا با صفحه یکی شود.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center border-2 border-[#0A0A0A] bg-[#0A0A0A] py-4 text-sm font-bold text-[#FAFAF9] transition-colors hover:bg-[#FAFAF9] hover:text-[#0A0A0A] md:text-base"
            >
              آپلود تصویر
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
