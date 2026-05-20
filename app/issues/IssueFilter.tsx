"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const IssueFilter = () => {
  const statuses: { label: string; value?: Status | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Close", value: "CLOSE" },
  ];
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter Issues..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value!} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
