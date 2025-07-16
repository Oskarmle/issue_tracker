"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="flex space-x-6 border-b px-5 h-14 items-center border-gray-200  justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={classNames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <Button color="gray" onClick={() => signOut()}>
        Sign out
      </Button>
    </nav>
  );
};

export default NavBar;
