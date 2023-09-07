"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const navigation = [
    {
      name: "Página inicial",
      href: "/",
    },
    {
      name: "Portfólio",
      href: "/portfolio",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navigation.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-semibold transition-colors hover:text-primary",
              isActive ? "" : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
