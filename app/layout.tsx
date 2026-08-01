import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from "../lib/authContext";
import { NavProvider } from '../lib/navContext';
import ScrollToTop from './components/scrollToTop';
import { routing } from '../lib/i18n/routing';
import defaultMessages from '../messages/en.json';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mnemonic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col m-0 p-0">
        {/* Default/fallback intl context for routes outside app/[locale] (e.g. /admin) */}
        <NextIntlClientProvider locale={routing.defaultLocale} messages={defaultMessages}>
          <NavProvider>
           <AuthProvider>
            {children}
            <ScrollToTop />
           </AuthProvider>
          </NavProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 