import type { Metadata, Viewport } from "next";
import { Outfit, Nunito } from "next/font/google";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirokaï Experience",
  description:
    "Plonge dans l'univers des Mirokaï — créatures magiques de la planète Nimira.",
  applicationName: "Mirokaï",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mirokaï",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000f23",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <body>
        <div className="mx-auto flex min-h-[100svh] w-full max-w-[440px] flex-col bg-ink-gradient">
          {children}
        </div>
        <PWARegister />
      </body>
    </html>
  );
}
