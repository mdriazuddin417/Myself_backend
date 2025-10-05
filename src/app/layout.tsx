import AuthProvider from "@/providers/AuthProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "MD Riaz Uddin | Web & Software Developer",
  description:
    "MD Riaz Uddin is a skilled Web Developer, Software Developer, and React/React Native Developer building modern, scalable applications.",
  keywords: [
    "MD Riaz Uddin",
    "Web Developer",
    "Software Developer",
    "React Developer",
    "React Native Developer",
    "Frontend Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "MD Riaz Uddin" }],
  creator: "MD Riaz Uddin",
  openGraph: {
    title: "MD Riaz Uddin | Web & Software Developer",
    description:
      "Building fast, modern web and mobile applications using React, Next.js, and Node.js.",
    url: "https://myportfolio-frontend-lemon.vercel.app", // 🔁 replace with your site URL
    siteName: "MD Riaz Uddin Portfolio",
    images: [
      {
        url: "https://myportfolio-frontend-lemon.vercel.app/og-image.jpg", // 🔁 replace with your image
        width: 1200,
        height: 630,
        alt: "MD Riaz Uddin Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Riaz Uddin | Web & Software Developer",
    description:
      "Professional web and mobile app developer specializing in React, Next.js, and React Native.",
    creator: "@your_twitter_handle", // 🔁 replace with your handle if you have one
    images: ["https://myportfolio-frontend-lemon.vercel.app/og-image.jpg"], // 🔁 same as above
  },
  metadataBase: new URL("https://myportfolio-frontend-lemon.vercel.app"), // 🔁 your site base URL
};
// import { generateMetadata as generateSEOMetadata } from "@/lib/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster richColors position="top-center" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
