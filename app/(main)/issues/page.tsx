'use client';
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueTable from "../../components/IssueTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const IssuesPage = () => {
  // Route protection
  const { status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") redirect("/auth/login");

  return (
    <div className="flex flex-col max-w-xxl gap-10">
      <IssueTable />
      <div className="flex max-w-xl gap-3 items-center">
        <Text>Create a new issue here</Text>
        <Button size="2">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssuesPage;
