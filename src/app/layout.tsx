import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { InstallPrompt } from '@/components/pwa/InstallPrompt';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bookiz Dashboard",
    description: "BI Dashboard for Bookiz SaaS Application",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" className="h-full bg-gray-50">
            <body className={`${inter.className} h-full`}>
            {children}
            <InstallPrompt />
            </body>
            </html>
        </ClerkProvider>
    );
}
