import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import FooterSection from "@/components/footer";
import NavbarComponent from "@/components/navbar";
import { headers } from 'next/headers';
import ContextProvider from '../context';

const dmSans = DM_Sans({
  variable: "--font-saans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Token Risk Scanner",
  description: "Scan any cryptocurrency token for risk analysis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider cookies={cookies}>
            <NavbarComponent />
            {children}
            <FooterSection />
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
