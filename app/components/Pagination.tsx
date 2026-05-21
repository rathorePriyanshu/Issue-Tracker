"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params);
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        className="cursor-pointer"
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        className="cursor-pointer"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GoChevronLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        className="cursor-pointer"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <GoChevronRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        className="cursor-pointer"
        onClick={() => changePage(pageCount)}
        disabled={currentPage === pageCount}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
