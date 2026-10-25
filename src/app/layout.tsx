import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sentheepan.vercel.app"),
  title: "Sentheepan Ellankovan | Portfolio",
  description:
    "Full-Stack Developer — MERN, Next.js and AI integrations. Building scalable web architectures.",
  authors: [{ name: "Sentheepan Ellankovan", url: "https://github.com/Senthee1811" }],
  creator: "Sentheepan Ellankovan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sentheepan Ellankovan | Portfolio",
    description:
      "Full-Stack Developer — MERN, Next.js and AI integrations. Building scalable web architectures.",
    siteName: "Sentheepan Ellankovan Portfolio",
  },
  icons: {
    icon: "/images/me/avatar.jpg",
    apple: "/images/me/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans selection:bg-[var(--accent)] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
