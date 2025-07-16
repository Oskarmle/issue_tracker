'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  // Route protection
  const { status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") redirect("/auth/login");

  return <div>hello world</div>;
}
