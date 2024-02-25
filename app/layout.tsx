import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tríade Barbearia" ,
  description: "Barbearia",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple:[ "/favicon.ico?v=4"],
    shortcut:["./favicon.ico" ]
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
        <div className="flex-1">{children}</div>
          < Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
