import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const BASE_URL = "https://thestarbrand.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "The Stars Brand",
    template: "%s | The Stars Brand",
  },

  description:
    "The Stars Brand is a Nigerian fashion label based in Ibadan, specialising in custom tailoring, crochet, ankara styles, and vintage shirts. Designs that make you bold, confident and unforgettable.",

  keywords: [
    "The Stars Brand",
    "Nigerian fashion",
    "custom tailoring Nigeria",
    "ankara styles",
    "crochet fashion Nigeria",
    "vintage shirts Nigeria",
    "fashion designer Ibadan",
    "bespoke clothing Nigeria",
    "Nigerian fashion label",
    "African fashion",
  ],

  authors: [{ name: "Adejumobi Esther" }],

  creator: "Adejumobi Esther",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "The Stars Brand",
    title:
      "The Stars Brand: Designs that make you bold, confident & unforgettable",
    description:
      "Nigerian fashion label based in Ibadan. Custom tailoring, crochet, ankara styles, and vintage shirts crafted with precision and passion.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Stars Brand: Nigerian Fashion Label",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "The Stars Brand: Designs that make you bold, confident & unforgettable",
    description:
      "Nigerian fashion label based in Ibadan. Custom tailoring, crochet, ankara styles, and vintage shirts crafted with precision and passion.",
    images: ["/og-image.jpg"],
    creator: "@thestarsbrand",
    site: "@thestarsbrand",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // verification: {
  //   google: 'replace-with-google-search-console-token',
  // },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        playfair.variable,
        montserrat.variable,
        lora.variable,
      )}
    >
      <body>
        <main>
          <Toaster richColors />
          {children}
        </main>
      </body>
    </html>
  );
}
