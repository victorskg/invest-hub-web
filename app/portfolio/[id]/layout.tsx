"use client";

import { Metadata } from "next";
import { SWRConfig } from "swr";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import { createContext } from "react";
import { format } from "date-fns";
import { useWallet } from "@/lib/api/wallet";

interface WalletLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export const WalletContext = createContext();

export default function WalletLayout({ children, params }: WalletLayoutProps) {
  const walletId = params.id;
  const useWalletSwr = useWallet(walletId);
  const { data, error, isLoading } = useWalletSwr;
  const sidebarNavItems = [
    {
      title: "Patrimônio",
      href: `/portfolio/${params.id}`,
    },
    {
      title: "Proventos",
      href: "/examples/forms/account",
    },
    {
      title: "Rebalanceamento",
      href: "/examples/forms/appearance",
    },
  ];

  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        <div className="hidden space-y-8 p-8 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {data?.description}
            </h2>
            <p className="text-muted-foreground">
              {data?.createdAt &&
                "Carteira criada em " +
                  format(new Date(data.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <WalletContext.Provider value={{ useWalletSwr }}>
              <div className="flex-1">{children}</div>
            </WalletContext.Provider>
          </div>
        </div>
      </SWRConfig>
    </>
  );
}
