"use client";
import { Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

type IssueForm = {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  User: {
    firstName: string;
    lastName: string;
  };
};

const IssueTable = () => {
  const [issues, setIssues] = useState<IssueForm[]>([]);

  const fetchIssues = async () => {
    try {
      const response = await fetch("/api/issues");
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching issues:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadIssues = async () => {
      const fetchedIssues = await fetchIssues();
      setIssues(fetchedIssues);
      console.log("Issues loaded", fetchedIssues);
    };
    loadIssues();
  }, []);

  return (
    <div>
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-zinc-900">
              Title
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">
              Created At
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">
              Updated At
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-zinc-900">
              User
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.title}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>
                <span
                  className={classNames({
                    "bg-green-100 text-green-800": issue.status === "OPEN",
                    "bg-yellow-100 text-yellow-800":
                      issue.status === "IN_PROGRESS",
                    "bg-red-100 text-red-800": issue.status === "CLOSED",
                    "p-1.5 rounded-xl": true,
                  })}
                >
                  {issue.status}
                </span>
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.updatedAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>{`${issue.User.firstName} ${issue.User.lastName}`}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueTable;
