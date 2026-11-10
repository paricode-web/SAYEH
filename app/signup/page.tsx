"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const field =
  "w-full border-2 border-fog bg-paper px-4 py-3 text-ink placeholder:text-graphite focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    router.push("/login");
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-bg-base p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 border-2 border-ink bg-paper p-8"
      >
        <img src="/logos/mark.svg" alt="" className="mx-auto h-12 w-12" />

        <h1 className="text-center text-3xl font-bold text-ink">
          ساخت حساب کاربری
        </h1>

        <input
          type="text"
          placeholder="نام"
          aria-label="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />

        <input
          type="email"
          placeholder="ایمیل"
          aria-label="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />

        <input
          type="password"
          placeholder="رمز عبور"
          aria-label="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />

        {error && (
          <p role="alert" className="text-sm font-bold text-error">
            {error}
          </p>
        )}

        <button className="btn w-full py-3">ثبت نام</button>

        <p className="text-center text-sm text-graphite">
          حساب دارید؟{" "}
          <Link href="/login" className="link font-bold text-ink">
            وارد شوید
          </Link>
        </p>
      </form>
    </main>
  );
}
