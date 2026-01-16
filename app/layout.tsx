import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
// import RegisterServiceWorker from "./register-sw"; // DISABLED - causing issues
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master Cycle Tracker - Hyrulean Maintenance Log",
  description: "Track your Master Cycle maintenance, log your adventures, and complete your Champion's Path",
  manifest: "/manifest.json",
  icons: {
    icon: '/master_cycle.png',
    apple: '/master_cycle.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1a24',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-stone text-aged-paper`}
      >
        <ErrorBoundary>
          <AppProvider>
            <div className="min-h-screen pb-20 md:pb-0 md:pt-20">
              <Navigation />
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
              </main>
            </div>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
