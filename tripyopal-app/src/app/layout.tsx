import type { Metadata } from "next";
import { Baloo_2, Geist, Geist_Mono, Yellowtail } from "next/font/google";
import FloatingChatWidget from "./components/assistant/FloatingChatWidget";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const baloo = Baloo_2({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TripYopal",
  description: "Plataforma turística para descubrir Yopal, Casanare con chatbot, mapas, eventos y rutas inteligentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${yellowtail.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <FloatingChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
