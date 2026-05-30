import { AdminNav } from "@/features/admin/components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav />
      <main className="pt-16 lg:pt-20">{children}</main>
    </div>
  );
}
