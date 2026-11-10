"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/cart-store";
import { useNavTheme } from "@/app/hooks/useNavTheme";

const links = [
  { href: "/#shop", label: "فروشگاه" },
  { href: "/#gallery", label: "گالری" },
  { href: "/custom-order", label: "سفارش طرح" },
  { href: "/orders", label: "سفارشات" },
  { href: "/aboutus", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

/**
 * لینک‌ها: روی هاور یک نوار مورب (هم‌زاویه با نوارهای نماد برند)
 * از راست باز می‌شود و رنگ متن وارونه می‌شود.
 */
const linkBase =
  "relative isolate px-3.5 py-2 text-sm font-bold " +
  "before:absolute before:inset-0 before:-z-10 before:origin-right " +
  "before:-skew-x-20 before:scale-x-0 before:transition-transform " +
  "before:duration-150 hover:before:scale-x-100";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  // زیر ناوبر بخش تیره است یا روشن؟ (data-nav-theme روی سکشن‌ها)
  const theme = useNavTheme(36);
  const isLight = theme === "light";
  const suffix = isLight ? "" : "-light";

  // فقط دو رنگ برند. روشن: Paper/Ink ، تیره: Ink/Paper
  const surface = isLight
    ? "bg-paper text-ink border-ink"
    : "bg-ink text-paper border-paper";
  const inverse = isLight ? "bg-ink text-paper" : "bg-paper text-ink";
  const fx = isLight
    ? "before:bg-ink hover:text-paper"
    : "before:bg-paper hover:text-ink";
  const fxActive = isLight
    ? "before:bg-ink before:scale-x-100 text-paper"
    : "before:bg-paper before:scale-x-100 text-ink";
  const rowHover = isLight ? "hover:bg-ink hover:text-paper" : "hover:bg-paper hover:text-ink";
  const rowLine = isLight ? "border-ink" : "border-paper";

  // بستن منو با تغییر صفحه
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // قفل اسکرول وقتی منوی موبایل بازه
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 border-b-2 font-vazirmatn transition-colors duration-150 ${surface}`}
    >
      <div className="flex h-16 w-full items-stretch justify-between md:h-[72px]">

        {/* ── لوگو: نماد + ورد‌مارک ── */}
        <Link
          href="/"
          aria-label="سایه — صفحه اصلی"
          className="flex shrink-0 items-center gap-3 px-4 sm:px-6 lg:px-8"
        >
          <Image
            src={`/logos/mark${suffix}.svg`}
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 md:h-9 md:w-9"
          />
          <Image
            src={`/logos/wordmark${suffix}.svg`}
            alt="سایه"
            width={94}
            height={25}
            priority
            className="hidden h-5 w-auto sm:block"
          />
        </Link>

        {/* ── منوی دسکتاپ ── */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex lg:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`${linkBase} ${isActive(l.href) ? fxActive : fx}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ── سمت چپ: احراز هویت + سبد ── */}
        <div className="flex items-stretch">
          {status === "loading" ? (
            <span className="hidden items-center px-5 text-xs text-graphite sm:flex">
              ...
            </span>
          ) : session ? (
            <div className="hidden items-center gap-1 px-4 sm:flex">
              <span className="max-w-[120px] truncate px-2 text-sm">
                {session.user?.name || "کاربر"}
              </span>
              <Link href="/profile" className={`${linkBase} ${fx}`}>
                پروفایل
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={`${linkBase} ${fx}`}
              >
                خروج
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-1 px-4 sm:flex">
              <Link href="/login" className={`${linkBase} ${fx}`}>
                ورود
              </Link>
              <Link
                href="/signup"
                className={`px-5 py-2.5 text-sm font-bold ${inverse} hover:opacity-80`}
              >
                عضویت
              </Link>
            </div>
          )}

          {/* سبد خرید: بلوک معکوس با لبهٔ مورب، مثل نوارهای نماد */}
          <Link
            href="/cart"
            aria-label={`سبد خرید، ${totalItems} آیتم`}
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)" }}
            className={`flex w-24 items-center justify-center gap-2 pr-3 md:w-28 ${inverse} hover:opacity-80`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="min-w-4 text-sm font-bold">
              {totalItems.toLocaleString("fa-IR")}
            </span>
          </Link>
        </div>

        {/* ── دکمهٔ منوی موبایل ── */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`flex w-16 items-center justify-center border-r-2 md:hidden ${rowLine} ${rowHover}`}
          aria-label="منو"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── منوی موبایل: تمام‌صفحه، تایپ درشت ── */}
      {menuOpen && (
        <div
          className={`fixed inset-x-0 bottom-0 top-16 overflow-y-auto md:hidden ${surface}`}
        >
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-baseline gap-4 border-b-2 px-6 py-5 text-4xl font-bold ${rowLine} ${rowHover}`}
              >
                <span className="w-8 text-sm font-normal opacity-60">
                  {(i + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
                </span>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 p-6">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className={`flex-1 border-2 py-3 text-center font-bold ${rowLine} ${rowHover}`}
                >
                  پروفایل
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`flex-1 border-2 py-3 text-center font-bold ${rowLine} ${rowHover}`}
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`flex-1 border-2 py-3 text-center font-bold ${rowLine} ${rowHover}`}
                >
                  ورود
                </Link>
                <Link
                  href="/signup"
                  className={`flex-1 py-3 text-center font-bold ${inverse}`}
                >
                  عضویت
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
