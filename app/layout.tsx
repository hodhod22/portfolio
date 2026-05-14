import { Metadata } from "next"; // ← Lägg till denna import
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ← Nu fungerar Metadata
  title: "Min Portfolio | Frontend-utvecklare",
  description:
    "Portfolio för en frontend-utvecklare specialiserad på Next.js, TypeScript och modern webbutveckling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="sv" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatWidget />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
