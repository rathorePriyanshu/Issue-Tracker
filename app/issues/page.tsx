import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./issueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const status = params.status;
  const orderBy = params.orderBy;
  const paramsPage = params.page;

  const page = Number(paramsPage) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const filterStatus = statuses.includes(status) ? status : undefined;

  const filteredOrderBy = columnNames.includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
    orderBy: filteredOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize || 10,
  });

  const issueItem = await prisma.issue.count({
    where: { status: filterStatus },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueItem}
        currentPage={page}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
