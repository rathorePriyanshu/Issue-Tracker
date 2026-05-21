import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa6";
import { IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;
  const orderBy = params.orderBy;

  if (issues.length === 0)
    return <Text className="block mt-1">No issues found.</Text>;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.classname}
            >
              <NextLink
                href={{
                  query: { ...params, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === orderBy && <FaArrowUp className="inline" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="md:hidden block">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  {
    label: "CreatedAt",
    value: "createdAt",
    classname: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
