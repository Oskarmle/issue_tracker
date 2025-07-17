import { prisma } from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IssuePageProps {
  params: { id: string };
}

const IssuePage = async ({ params }: IssuePageProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
    include: {
      User: { select: { firstName: true, lastName: true } },
    },
  });

  if (!issue) return notFound();
  return (
    <div className="p-4 flex flex-col max-w-full">
      <Heading>{issue.title}</Heading>
      <div className="space-x-3 flex flex-col">
        <Text>
          Issue opened by: {issue.User.firstName} {issue.User.lastName}
        </Text>
        <Text>Issue opened: {issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose max-w-100" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssuePage;
