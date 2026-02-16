import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "© BAYVINE DIGITAL",
  description: "CREATIVE DIGITAL SOLUTIONS FOR YOU.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/svg+xml" },
      // { url: "/bayvine.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/svg+xml" }],
  },
};

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
				<NavBar />
        <PageTransition>{children}</PageTransition>
			</body>
		</html>
	)
}
