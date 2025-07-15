import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueTable from "../../components/IssueTable";

const IssuesPage = () => {
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
