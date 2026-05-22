import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const close = await prisma.issue.count({
    where: { status: "CLOSE" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const total = await prisma.issue.count();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5" className="max-h-[100%]">
        <IssueSummary
          open={open}
          close={close}
          inProgress={inProgress}
          total={total}
        />
        <IssuesChart open={open} close={close} inProgress={inProgress} />
      </Flex>
      <Box>
        <LatestIssues />
      </Box>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
