import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../lib/authContext";
import { NavProvider } from '../lib/navContext';
import ScrollToTop from './components/scrollToTop';
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
        <NavProvider>
         <AuthProvider>
          {children}
          <ScrollToTop />
         </AuthProvider>
        </NavProvider>
      </body>
    </html>
  );
} 