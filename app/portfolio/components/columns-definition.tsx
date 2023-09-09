"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export type Wallet = {
  id: string;
  totalInvested: number;
  description: string;
  assets: string[];
};

export const columns: ColumnModel<Wallet>[] = [
  {
    id: "id",
    header: "Id",
    cell: (row) => row.id,
  },
  {
    id: "description",
    header: "Descrição",
    cell: (row) => row.description,
  },
  {
    id: "createdAt",
    header: "Criada em",
    cell: (row) => row.createdAt,
  },
  {
    id: "assets",
    header: "Ativos",
    cell: (row) => {
      return row.assets.length ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{row.assets.length} ativo(s)</TooltipTrigger>
            <TooltipContent>
              {row.assets.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p>{row.assets.length} ativo(s)</p>
      );
    },
  },
  {
    id: "totalInvested",
    header: () => "Total Investido",
    cell: (row) => {
      const amount = parseFloat(row.totalInvested);
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: (row) => {
      const payment = row;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Renomear
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
