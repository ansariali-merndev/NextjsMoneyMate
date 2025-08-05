import { Footer } from "@/components/block/Footer";
import { Header } from "@/components/block/Header";

export default function ApplicationLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
