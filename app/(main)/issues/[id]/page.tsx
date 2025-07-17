import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{issue.title}</h1>
      <p>{issue.description}</p>
      <p className="text-gray-500 mt-2">
        Status: <strong>{issue.status}</strong>
      </p>
      <p className="text-sm mt-1">
        Reported by: {issue.User.firstName} {issue.User.lastName}
      </p>
    </div>
  );
};

export default IssuePage;
