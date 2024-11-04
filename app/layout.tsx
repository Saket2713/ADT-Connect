import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google"; // Import Inter from the correct package
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ["latin"] });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ADT-Connect",
  description: "Video calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl:'/icons/yoom-logo.svg',
            socialButtonsVariant:"iconButton"
          },

          variables:{
            colorText:'#fff',
            colorPrimary:'#0E78F9',
            colorBackground:"#1c1f2e",
            colorInputBackground:"#252a41",

          }
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-dark-2`}
        >
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
