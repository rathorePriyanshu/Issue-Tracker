import { IssueStatusBadge, Link } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { FaArrowUp } from "react-icons/fa6";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const status = params.status;
  const orderBy = params.orderBy;

  const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      classname: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const filterStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
  });

  return (
    <div>
      <IssueActions />
      {issues.length === 0 ? (
        <Text className="block mt-1">No issues found.</Text>
      ) : (
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
                  <div className="md:hidden block ">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
