import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="p-8">
      <h1>Admin</h1>
      <p>Logged in as {session.user?.name ?? "admin"}.</p>
      <SignOutButton />
    </div>
  );
}
