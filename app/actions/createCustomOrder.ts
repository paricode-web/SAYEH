// app/actions/customOrder.ts  (یا هر جایی که الان فایلت هست)
"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type CustomOrderState = {
  ok: boolean;
  message: string;
  values?: Record<string, string>;
};

const MAX_FILE = 4 * 1024 * 1024; // ۴ مگابایت (سقف بدنهٔ Netlify حدود ۶ مگابایت است)

/** ارقام فارسی/عربی → انگلیسی */
function toEnglishDigits(s: string) {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/**
 * آپلود امضادار به Cloudinary بدون نیاز به پکیج.
 * اگر شکست بخورد null برمی‌گرداند (و دلیلش در لاگ سرور چاپ می‌شود).
 */
async function uploadReference(file: File): Promise<string | null> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud || !key || !secret) {
    console.error(
      "[custom-order] CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET تنظیم نشده‌اند"
    );
    return null;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "sayeh/custom-orders";
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
      .digest("hex");

    const body = new FormData();
    body.append("file", file);
    body.append("api_key", key);
    body.append("timestamp", timestamp);
    body.append("folder", folder);
    body.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      { method: "POST", body }
    );

    if (!res.ok) {
      console.error("[custom-order] Cloudinary:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return typeof data.secure_url === "string" ? data.secure_url : null;
  } catch (e) {
    console.error("[custom-order] upload failed:", e);
    return null;
  }
}

export async function createCustomOrder(
  _prev: CustomOrderState,
  formData: FormData
): Promise<CustomOrderState> {
  // تله‌ی ربات‌ها: آدم این فیلد را نمی‌بیند و پر نمی‌کند
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true, message: "رسید." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phone = toEnglishDigits(phoneRaw).replace(/[\s-]/g, "");
  const description = String(formData.get("description") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();

  const values = { name, phone: phoneRaw, description, size, budget };
  const fail = (message: string): CustomOrderState => ({
    ok: false,
    message,
    values,
  });

  if (name.length < 2) return fail("اسمت را بنویس.");
  if (!/^09\d{9}$/.test(phone)) return fail("شمارهٔ موبایل درست نیست.");
  if (description.length < 10) return fail("طرح را کمی بیشتر توضیح بده.");
  if (description.length > 2000) return fail("توضیح خیلی بلند است. کوتاهش کن.");

  let imageUrl: string | null = null;
  const file = formData.get("image");

  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) return fail("فقط عکس قبول می‌کنیم.");
    if (file.size > MAX_FILE) return fail("عکس بزرگ‌تر از ۴ مگابایت است.");

    imageUrl = await uploadReference(file);
    if (!imageUrl) {
      return fail("عکس آپلود نشد. دوباره امتحان کن یا بدون عکس ثبت کن.");
    }
  }

  try {
    await prisma.customOrder.create({
      data: {
        name,
        phone,
        description,
        size: size || null,
        budget: budget || null,
        imageUrl,
      },
    });
  } catch (e) {
    console.error("[custom-order] db error:", e);
    return fail("ثبت نشد. دوباره امتحان کن.");
  }

  revalidatePath("/admin");
  return { ok: true, message: "رسید. به‌زودی بهت زنگ می‌زنیم." };
}