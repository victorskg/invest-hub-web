"use client";

import {
  DataTablePagination,
  Pagination,
} from "@/components/ui/data-table-pagination";

import { Button } from "@/components/ui/button";
import CreateUpdateDialog from "./create-update-dialog.tsx";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./columns";
import { useState } from "react";
import { useWalletPaginated } from "@/lib/api/wallet";

export default function Portfolio() {
  const emptyDataContent = (
    <span className="font-normal text-muted-foreground">
      Nenhuma carteira encontrada. Clique{" "}
      <a
        className="cursor-pointer hover:border-b-2"
        onClick={openCreateWalletDialog}
      >
        aqui
      </a>{" "}
      para criar uma.
    </span>
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data, error, isLoading } = useWalletPaginated(pageIndex, pageSize);

  function openCreateWalletDialog() {
    setDialogOpen(!isDialogOpen);
  }

  function onPaginationChange(pagination: Pagination) {
    setPageIndex(pagination.pageIndex);
    setPageSize(pagination.pageSize);
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfólio</h2>
          <p className="text-muted-foreground">
            Gerencie suas carteiras de investimento.
          </p>
        </div>
        <div className="ml-auto mr-4">
          <Button onClick={openCreateWalletDialog}>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Nova Carteira
          </Button>
        </div>
      </div>
      <DataTable
        error={error}
        isLoading={isLoading}
        columns={columns}
        data={data}
        emptyDataContent={emptyDataContent}
      ></DataTable>
      <DataTablePagination
        pageCount={data?.pageCount || 0}
        onPaginationChange={onPaginationChange}
      />
      <CreateUpdateDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
