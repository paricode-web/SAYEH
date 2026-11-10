"use client"

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Input() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex justify-center pt-4">
      <input
        className="glass-dark h-[60px] w-full max-w-[700px] px-4 text-paper outline-none placeholder:text-fog focus:border-paper"
        placeholder="جستجو در محصولات"
        type="text"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          const params = new URLSearchParams(searchParams.toString());
          params.set("search", value);
          router.push(`/?${params.toString()}`);
        }}
      />
    </div>
  );
}
