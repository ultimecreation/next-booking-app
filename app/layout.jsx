import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
const inter = Inter({
  subsets: ['latin']
})

export const metadata = {
  title: "Booking App",
  description: "Book a meeting/conference room for your meeting",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
