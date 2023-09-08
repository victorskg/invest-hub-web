"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface DataTablePaginationProps {
  pIndex;
  pSize;
  pageCount: number;
  onPaginationChange: (pagination: Pagination) => any;
}

export function DataTablePagination({
  pIndex,
  pSize,
  pageCount,
  onPaginationChange,
}: DataTablePaginationProps) {
  const [pageSize, setPageSize] = useState(pSize);
  const [pageIndex, setPageIndex] = useState(pIndex);

  useEffect(() => {
    setPageIndex(pIndex);
    setPageSize(pSize);
  }, [pIndex, pSize]);

  function canPreviousPage() {
    return pageIndex > 0;
  }

  function canNextPage() {
    return pageIndex < pageCount - 1;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value);
              onPaginationChange({ pageIndex, pageSize: value });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {pageIndex + 1} de {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(0);
              onPaginationChange({ pageIndex: 0, pageSize: pageSize });
            }}
            disabled={!canPreviousPage()}
          >
            <span className="sr-only">Primeira página</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex - 1);
              onPaginationChange({
                pageIndex: pageIndex - 1,
                pageSize: pageSize,
              });
            }}
            disabled={!canPreviousPage()}
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex + 1);
              onPaginationChange({
                pageIndex: pageIndex + 1,
                pageSize: pageSize,
              });
            }}
            disabled={!canNextPage()}
          >
            <span className="sr-only">Próxima página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(pageCount - 1);
              onPaginationChange({
                pageIndex: pageCount - 1,
                pageSize: pageSize,
              });
            }}
            disabled={!canNextPage()}
          >
            <span className="sr-only">Última página</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
