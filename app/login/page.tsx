"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const field =
  "w-full border-2 border-fog bg-paper px-4 py-3 text-ink placeholder:text-graphite focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("ایمیل یا رمز عبور اشتباه است.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-bg-base p-4"
    >
      <div className="flex w-full max-w-md flex-col gap-6 border-2 border-ink bg-paper p-8">

        {/* Header */}
        <div className="text-center">
          <img src="/logos/mark.svg" alt="" className="mx-auto mb-5 h-12 w-12" />

          <h2 className="mb-2 text-3xl font-bold text-ink">
            به Lumina خوش اومدید
          </h2>

          <p className="text-sm text-graphite">
            برای ورود به حساب کاربری وارد شوید
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="border-2 border-error px-4 py-2 text-center text-sm font-bold text-error"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-ink">ایمیل</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-ink">رمز عبور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn mt-2 w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "در حال بررسی..." : "ورود به حساب"}
          </button>

          <div className="text-center text-sm text-graphite">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="link font-bold text-ink">
              ثبت نام کنید
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
