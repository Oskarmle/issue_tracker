"use client";
import { Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

type IssueForm = {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.title}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>{issue.status}</Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.updatedAt).toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueTable;
