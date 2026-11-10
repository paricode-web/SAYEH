"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, select, label";
const TEXT = "input, textarea, [contenteditable='true']";

/**
 * کرسر برند «سایه»: یک نوار مورب (هم‌زاویه با نوارهای نماد) که
 * رنگ زیرش رو وارونه می‌کنه (mix-blend: difference).
 * روی لینک و دکمه به یک بلوک پهن تبدیل می‌شه، با کلیک کوچیک می‌شه،
 * روی فیلدهای متنی ناپدید می‌شه و روی لمسی/موبایل اصلاً فعال نمی‌شه.
 */
export default function GlassCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("glass-cursor-active");
    el.dataset.hidden = "1";

    let tx = 0, ty = 0, x = 0, y = 0;
    let raf = 0;
    let first = true;

    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      paint();
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      if (first || reduce) {
        x = tx;
        y = ty;
        paint();
        first = false;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }

      const t = e.target as Element | null;
      el.dataset.hidden = t?.closest(TEXT) ? "1" : "0";
      el.dataset.link = t?.closest(INTERACTIVE) ? "1" : "0";
    };

    const onDown = () => (el.dataset.pressed = "1");
    const onUp = () => (el.dataset.pressed = "0");
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) el.dataset.hidden = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
      root.classList.remove("glass-cursor-active");
    };
  }, []);

  return (
    <div ref={ref} className="gc" aria-hidden>
      <div className="gc-shape" />
    </div>
  );
}
