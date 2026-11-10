// app/admin/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import type { UploadApiResponse } from "cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

const MAX_IMAGE = 4 * 1024 * 1024; // ۴ مگابایت

/** هر اکشن ادمین باید اول این را صدا بزند؛ Server Actionها endpoint عمومی‌اند. */
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("دسترسی غیرمجاز");
  }
  return session;
}

export async function uploadImage(formData: FormData) {
  await requireAdmin();

  const image = formData.get("image");
  const productId = String(formData.get("productId") ?? "");

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("فایلی انتخاب نشده");
  }
  if (!image.type.startsWith("image/")) {
    throw new Error("فقط فایل عکس مجاز است");
  }
  if (image.size > MAX_IMAGE) {
    throw new Error("حجم عکس بیشتر از ۴ مگابایت است");
  }
  if (!productId) {
    throw new Error("محصول انتخاب نشده");
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "sayeh/products" }, (error, result) => {
          if (error || !result) reject(error ?? new Error("آپلود ناموفق بود"));
          else resolve(result);
        })
        .end(buffer);
    }
  );

  await prisma.productImage.create({
    data: {
      url: uploadResult.secure_url,
      productId,
    },
  });

  revalidatePath("/admin");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (name.length < 2) throw new Error("نام محصول معتبر نیست");
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("قیمت معتبر نیست");
  }

  // اسلاگ ساده برای جلوگیری از خطای یکتا بودن
  const slug = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  await prisma.product.create({
    data: {
      name,
      slug,
      price,
      category: "دستی", // فیلدهای اجباری اسکیما
      features: "ویژگی‌های پیش‌فرض",
      countInStock: 10,
    },
  });

  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!id) throw new Error("شناسهٔ محصول نیست");
  if (name.length < 2) throw new Error("نام محصول معتبر نیست");
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("قیمت معتبر نیست");
  }

  await prisma.product.update({
    where: { id },
    data: { name, price },
  });

  revalidatePath("/admin");
}

export async function deleteItem(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("شناسهٔ محصول نیست");

  let inUse = false;

  try {
    // عکس‌ها و محصول با هم حذف می‌شوند؛ اگر محصول حذف نشد، عکس‌ها هم برمی‌گردند
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2003"
    ) {
      inUse = true; // محصول داخل سفارش‌ها استفاده شده
    } else {
      throw e;
    }
  }

  revalidatePath("/admin");
  // redirect باید بیرون از try/catch باشد
  redirect(inUse ? "/admin?error=product-in-use" : "/admin");
}