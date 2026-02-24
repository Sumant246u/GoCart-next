import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "GoCart.",
  description: "GoCart. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>

        {/* Skip link for keyboard & screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
        >
          Skip to main content
        </a>

        <StoreProvider>
          <Banner/>
          <Header/>

          {/* ✅ ONE main landmark */}
          <main id="main-content" role="main">
            {children}
          </main>

          <Footer/>
          <Toaster />
        </StoreProvider>

      </body>
    </html>
  );
}
