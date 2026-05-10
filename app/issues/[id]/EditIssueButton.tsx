import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";

const EditIssueButton = ({ IssueId }: { IssueId: number }) => {
  return (
    <Button>
      <BsPencilSquare />
      <Link href={`/issues/${IssueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
