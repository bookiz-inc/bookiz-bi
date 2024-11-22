import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookiz Dashboard",
  description: "BI Dashboard for Bookiz SaaS Application",
  icons: {
    icon: '/images/bookiz-logo.png',  
    apple: '/images/bookiz-logo.png'  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <Sidebar />
          <div className="lg:pl-72">
            <Header />
            <main className="py-8 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}