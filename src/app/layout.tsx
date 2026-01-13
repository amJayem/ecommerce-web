"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { store } from "@/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google"; // Import Inter font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] }); // Initialize Inter font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        {/* Apply Inter font class */}
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            <CartDrawer />
            {/* Global toast notifications */}
            <Toaster position="top-center" />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
