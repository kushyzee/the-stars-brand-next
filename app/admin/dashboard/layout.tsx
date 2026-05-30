import { AdminNav } from "@/features/admin/components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav />
      <main>{children}</main>
    </div>
  );
}
