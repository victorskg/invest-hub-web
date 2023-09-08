import "./globals.css";

import Footer from "@/components/layout/footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/layout/nav-bar";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invest Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col flex-auto min-h-screen",
          inter.className,
          children?.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Toaster duration={2000} />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
