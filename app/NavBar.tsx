"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className="mb-5 px-5 py-4 bg-[#ffffff] border-[#e7dfd1] border-b shadow-sm">
      <Flex justify="between">
        <Flex gap="4" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NextLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

export const NextLinks = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  const currentPath = usePathname();

  return (
    <ul className="flex gap-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const AuthStatus = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <button
        onClick={() => signIn("google", { callbackUrl: pathname })}
        className="nav-link"
      >
        Login
      </button>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="cursor-pointer">
            <button
              onClick={() => signOut({ callbackUrl: pathname })}
              className="cursor-pointer"
            >
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
