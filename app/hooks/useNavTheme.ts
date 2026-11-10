"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type NavTheme = "dark" | "light";

/**
 * تشخیص می‌دهد زیر ناوبر کدام بخش از صفحه است.
 * هر سکشن باید یکی از این‌ها را داشته باشد:
 *   data-nav-theme="dark"   (پس‌زمینه تیره  -> لوگوی سفید)
 *   data-nav-theme="light"  (پس‌زمینه روشن  -> لوگوی مشکی)
 *
 * offset = فاصلهٔ خطی که چک می‌شود از بالای صفحه (تقریباً وسط ناوبر)
 */
export function useNavTheme(offset = 48): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let current: NavTheme = "dark"; // پیش‌فرض

      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= offset && r.bottom > offset) {
          current = el.dataset.navTheme === "light" ? "light" : "dark";
        }
      });

      setTheme(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [offset, pathname]);

  return theme;
}
