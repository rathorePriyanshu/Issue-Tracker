import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  close: number;
  total?: number;
}

const IssueSummary = ({ open, inProgress, close, total }: Props) => {
  const containers: {
    label: string;
    value: number | undefined;
    status: Status | "";
    color: string;
  }[] = [
    { label: "Total", value: total, status: "", color: "bg-blue-500" },
    { label: "Open", value: open, status: "OPEN", color: "bg-red-500" },
    {
      label: "In Progress",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "bg-violet-500",
    },
    { label: "Close", value: close, status: "CLOSE", color: "bg-green-500" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label} className={`h-20 w-40  ${container.color}`}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold" color="gray">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
