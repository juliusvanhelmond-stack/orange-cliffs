import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brand } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal"],
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const isPreview = !brand.siteUrl;

export const metadata: Metadata = {
  ...(brand.siteUrl ? { metadataBase: new URL(brand.siteUrl) } : {}),
  title: {
    default: "Orange Cliffs · A family holiday home in Scarborough, South Africa",
    template: "%s · Orange Cliffs, Scarborough",
  },
  description:
    "A spacious, relaxed holiday home for up to eight guests in Scarborough on the Cape Peninsula, South Africa. Slow mornings, ocean views, and Kalk Bay and Cape Point within reach.",
  applicationName: "Orange Cliffs",
  openGraph: {
    type: "website",
    siteName: "Orange Cliffs",
    locale: "en_GB",
  },
  // Until the production domain is set, keep the preview out of search indexes.
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#354b3d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${newsreader.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Hidden reveal states only apply once this runs, so content never depends on JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
