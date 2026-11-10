import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const shopLinks = [
  { href: "/#shop", label: "فروشگاه" },
  { href: "/#gallery", label: "گالری" },
  { href: "/orders", label: "سفارشات" },
  { href: "/cart", label: "سبد خرید" },
];

const companyLinks = [
  { href: "/aboutus", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/profile", label: "حساب کاربری" },
];

// TODO: اطلاعات واقعی خودت را جایگزین کن
const contact = {
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  email: "info@sayeh.example",
  address: "تهران، خیابان نمونه، پلاک ۱",
  instagram: "https://instagram.com/",
  telegram: "https://t.me/",
};

export default function Footer() {
  const year = new Date().toLocaleDateString("fa-IR", { year: "numeric" });

  return (
    <footer
      data-nav-theme="dark"
      dir="rtl"
      className="relative mt-24 bg-[#0A0A0A] font-vazirmatn text-[#FAFAF9]"
    >
      {/* خط تزئینی بالای فوتر */}
      <div className="h-px w-full bg-gradient-to-l from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            {/* لوگوی عمودی: نماد + SAYEH (SVG) و تگ‌لاین با فونت واقعی سایت */}
            <Link
              href="/"
              aria-label="سایه — صفحه اصلی"
              className="inline-flex flex-col items-center gap-4"
            >
              <Image
                src="/logos/mark-light.svg"
                alt=""
                width={200}
                height={200}
                className="h-16 w-16 md:h-20 md:w-20"
              />
              <Image
                src="/logos/wordmark-light.svg"
                alt="سایه"
                width={376}
                height={100}
                className="h-7 w-auto md:h-8"
              />
              <span className="text-base font-bold">سایه · نقاشی روی شیشه</span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-400">
              سایه، جایی که نور از میان شیشه می‌گذرد و رنگ‌ها قصه می‌گویند.
              نقاشی‌های دست‌ساز روی شیشه، برای خانه‌ای با روحِ هنر.
            </p>

            <div className="mt-6 flex items-center gap-3">
            
              <a
                href={contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-neutral-300 transition hover:bg-white/10 hover:text-primary"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <nav aria-label="فروشگاه">
              <h3 className="mb-4 text-sm font-bold">فروشگاه</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                {shopLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="سایه">
              <h3 className="mb-4 text-sm font-bold">سایه</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold">تماس با ما</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-neutral-500" />
                <a href={`tel:${contact.phone}`} className="transition hover:text-primary">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-neutral-500" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-primary"
                  dir="ltr"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-neutral-500" />
                <span className="leading-6">{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {year} سایه · نقاشی روی شیشه. تمامی حقوق محفوظ است.</p>

          <div className="flex items-center gap-4">
            <Link href="/terms" className="transition hover:text-primary">
              قوانین و مقررات
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <Link href="/privacy" className="transition hover:text-primary">
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
