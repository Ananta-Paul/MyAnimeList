import GlobalState from "@/context";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/auth_provider";
import Layout from "@/components/layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyAnimeList",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        <meta
          name="google-site-verification"
          content="MTwpej2v_tmEG66_55Pm99962srvOP-XhlptsvSM1L0"
        />
      </head>
      <GoogleTagManager gtmId="GTM-5ZDSG9K8" />
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-8ZJWDGFB5B" />{" "}
        <NextAuthProvider>
          <GlobalState>{children}</GlobalState>
        </NextAuthProvider>
      </body>
    </html>
  );
}
