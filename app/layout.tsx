import type { Metadata } from "next";
// import { Inter, Noto_Sans_Thai, Roboto } from "@next/font/google";
import { Kanit, Noto_Sans_Thai } from 'next/font/google';
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomerProviders from "./providers";
import SideBar from "./components/SideBar";

// const inter = Inter({ subsets: ["latin"] });

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '700'],
  subsets: ['thai', 'latin'],

});

const kanit = Kanit({
  weight: ['300', '400', '500', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomerProviders>
        <body className={`${kanit.className} antialiased`}>
          <Header />
          {/* <SideBar/> */}
          {children}
          <Footer />
        </body>
      </CustomerProviders>
    </html>
  );
}
