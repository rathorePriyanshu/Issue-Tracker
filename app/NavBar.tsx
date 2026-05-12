"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="mb-5 border-b px-5 py-4">
      <Flex justify="between">
        <Flex gap="6" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item className="cursor-pointer">
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
