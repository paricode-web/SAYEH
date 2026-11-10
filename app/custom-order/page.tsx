import type { Metadata } from "next";
import CustomOrderForm from "@/components/custom-order/CustomOrderForm";
export const metadata: Metadata = {
  title: "سفارش طرح اختصاصی",
  description: "طرح خودت را بفرست؛ روی شیشه می‌نشیند.",
};

export default function CustomOrderPage() {
  return (
    <main
      dir="rtl"
      data-nav-theme="light"
      className="min-h-screen bg-bg-base px-4 pb-24 pt-28 text-ink"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-5 text-sm tracking-[0.5em] text-graphite">
            CUSTOM ORDER
          </p>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            طرحِ خودت.
            <br />
            روی شیشه.
          </h1>

          <p className="mt-8 max-w-md leading-8 text-graphite">
            عکس یا ایده‌ات رو بفرست. بعد از دیدنش باهات تماس می‌گیریم و دربارهٔ
            اندازه، قیمت و زمان حرف می‌زنیم.
          </p>

          <ol className="mt-10 space-y-4">
            {["ایده‌ات رو می‌فرستی", "با هم هماهنگ می‌کنیم", "روی شیشه می‌شینه"].map(
              (step, i) => (
                <li key={step} className="flex items-baseline gap-4 border-t-2 border-ink pt-4">
                  <span className="text-sm text-graphite">
                    {(i + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
                  </span>
                  <span className="text-xl font-bold">{step}</span>
                </li>
              )
            )}
          </ol>
        </div>

        <CustomOrderForm />
      </div>
    </main>
  );
}
