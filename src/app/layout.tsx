"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { store } from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          <CartDrawer />
          {/* Global toast notifications */}
          <Toaster position="top-center" />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
