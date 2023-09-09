"use client";

import { DataTable, DataTableState } from "@/components/ui/data-table";
import {
  DataTablePagination,
  Pagination,
} from "@/components/ui/data-table-pagination";

import { Button } from "@/components/ui/button";
import CreateUpdateDialog from "./components/create-update-dialog";
import { Input } from "@/components/ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { columns } from "./components/columns-definition";
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

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tableState, setTableState] = useState<DataTableState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data, error, isLoading, mutate } = useWalletPaginated(
    tableState.pageIndex,
    tableState.pageSize,
    tableState.searchTerm
  );

  function openCreateWalletDialog() {
    setDialogOpen(!isDialogOpen);
  }

  function onCreateOrUpdate() {
    mutate();
  }

  function onPaginationChange(pagination: Pagination) {
    setTableState({
      ...tableState,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = event.target.value.trim();
    event.preventDefault();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setTableState({ ...tableState, pageIndex: 0, searchTerm: newSearchTerm });
    }, 1000);

    setTimeoutId(newTimeoutId);
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
        <div className="flex flex-row gap-2 ml-auto mr-4">
          <Input
            type="search"
            placeholder="Pesquise pela descrição..."
            className="md:w-[100px] lg:w-[300px]"
            onChange={handleSearchChange}
          />
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
        pIndex={tableState.pageIndex}
        pSize={tableState.pageSize}
        pageCount={data?.pageCount || 0}
        onPaginationChange={onPaginationChange}
      />
      <CreateUpdateDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        createdOrUpdatedEvent={onCreateOrUpdate}
      />
    </div>
  );
}
