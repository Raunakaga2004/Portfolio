import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getContent } from "@/lib/getContent";
import AdminTabs from "./AdminTabs";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="p-8 text-fortext">
      <AdminTabs content={await getContent()} />
    </div>
  );
}
