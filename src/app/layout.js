import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modern-drawer/dist/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-phone-number-input/style.css";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import { CustomProvider } from "../store/CustomProvider/CustomProvider";
import AosInit from "@/components/AosInit";

export const metadata = {
  title: "Prevue",
  description: "Prevue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AosInit /> */}
        <ToastContainer />
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
