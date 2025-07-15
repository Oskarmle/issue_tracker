import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="violet" radius="large">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
