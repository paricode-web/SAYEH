import { Katibeh } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast"
import GlassCursor from "@/components/home/GlassCursor";
const katibeh = Katibeh({
  weight: ["400"],
  subsets: ["arabic", "latin"],
  variable: "--font-katibeh",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "SAYEH",
    template: "%s |SAYEH",
  },
  description:
    "فروشگاه قاب ویترای دست‌ساز؛ تلالو نور و رنگ روی شیشه‌های هنری.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
    <script
      dangerouslySetInnerHTML={{
        __html: `try{if(localStorage.getItem("sayeh-mode")==="night")document.documentElement.dataset.mode="night"}catch(e){}`,
      }}
    />
  </head>
      <body className={`${katibeh.variable} bg-bg-base font-vazirmatn min-h-screen`} >
        <Toaster position="top-center" />
        <GlassCursor />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
} 