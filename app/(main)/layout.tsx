import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavBar from "./NavBar";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <NavBar />
      <div className="p-5">{children}</div>
    </div>
  );
}
