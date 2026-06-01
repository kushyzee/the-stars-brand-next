import Header from "@/features/header/components/Header";
import Footer from "@/features/shared/components/Footer";
import { getUser } from "@/features/auth/data/auth.data";
import { menu } from "@/lib/utilities";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const updatedMenu = [...menu];

  if (user) {
    updatedMenu.push({
      name: "Dashboard",
      path: "/admin/dashboard",
    });
  }
  return (
    <div>
      <Header menu={updatedMenu} />
      {children}
      <Footer />
    </div>
  );
}
