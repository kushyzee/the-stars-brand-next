import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/actions/auth.actions";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-foreground-black">
        DashboardPage
      </h1>
      <form action={logout}>
        <Button variant="outline" type="submit">
          Logout
        </Button>
      </form>
    </div>
  );
}
