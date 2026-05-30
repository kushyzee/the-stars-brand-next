import Header from "@/features/header/components/Header";
import Footer from "@/features/shared/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
