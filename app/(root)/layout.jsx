import { Footer } from "@/components/block/Footer";
import { Header } from "@/components/block/Header";
import { UserProvider } from "@/context/UserContext";

export default function ApplicationLayout({ children }) {
  return (
    <UserProvider>
      <Header />
      {children}
      <Footer />
    </UserProvider>
  );
}
