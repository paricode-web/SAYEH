"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createCustomOrder,
  type CustomOrderState,
} from "@/app/actions/createCustomOrder"; // مسیر را با جای واقعی فایل هماهنگ کن

const initial: CustomOrderState = { ok: false, message: "" };

const field =
  "w-full border-2 border-fog bg-paper px-4 py-3 text-ink placeholder:text-graphite focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink";
const label = "mb-1 block text-sm font-bold text-ink";

const sizes = [
  "کوچک (حدود ۲۰×۳۰)",
  "متوسط (حدود ۳۰×۴۰)",
  "بزرگ (حدود ۵۰×۷۰)",
  "اندازهٔ دیگر (توی توضیح می‌نویسم)",
];

const budgets = [
  "تا ۱ میلیون تومان",
  "۱ تا ۳ میلیون",
  "۳ تا ۱۰ میلیون",
  "بالاتر از ۱۰ میلیون",
  "هنوز نمی‌دونم",
];

export default function CustomOrderForm() {
  const [state, action, pending] = useActionState(createCustomOrder, initial);
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <div className="border-2 border-ink bg-ink p-8 text-paper sm:p-12">
        <h2 className="text-5xl font-black">رسید.</h2>
        <p className="mt-4 text-fog">{state.message}</p>
        <Link href="/" className="btn btn-on-dark mt-8 px-8 py-3">
          برگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 border-2 border-ink bg-paper p-6 sm:p-8"
    >
      <div>
        <label htmlFor="name" className={label}>اسم</label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          defaultValue={v.name}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="phone" className={label}>شمارهٔ موبایل</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          dir="ltr"
          placeholder="09123456789"
          defaultValue={v.phone}
          className={`${field} text-right`}
        />
      </div>

      <div>
        <label htmlFor="description" className={label}>طرحت چیه؟</label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          minLength={10}
          maxLength={2000}
          placeholder="سوژه، حال‌وهوا، رنگ‌ها، جایی که می‌خوای بزنیش..."
          defaultValue={v.description}
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="size" className={label}>اندازه</label>
          <select id="size" name="size" defaultValue={v.size ?? ""} className={field}>
            <option value="">انتخاب کن</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={label}>بودجه</label>
          <select id="budget" name="budget" defaultValue={v.budget ?? ""} className={field}>
            <option value="">انتخاب کن</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="image" className={label}>عکس مرجع (اختیاری)</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className={`${field} file:me-3 file:border-0 file:bg-ink file:px-3 file:py-1 file:text-sm file:font-bold file:text-paper`}
        />
        <p className="mt-1 text-xs text-graphite">حداکثر ۴ مگابایت.</p>
      </div>

      {/* تله‌ی ربات‌ها */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state.message && !state.ok && (
        <p
          role="alert"
          className="border-2 border-error px-4 py-2 text-sm font-bold text-error"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "دارم می‌فرستم..." : "بفرست"}
      </button>
    </form>
  );
}
