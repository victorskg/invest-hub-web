"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Loader2 } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DataTableProps<TData> {
  error: any;
  isLoading: boolean;
  columns: ColumnModel<TData>[];
  data: TData[];
  emptyDataContent: React.ReactNode;
}

export interface ColumnModel<TData> {
  id: string;
  header: () => any;
  cell: (data: TData) => any;
}

export interface DataTableState {
  pageIndex: number;
  pageSize: number;
  searchTerm: string;
}

export function DataTable<TData>({
  error,
  isLoading,
  columns,
  data,
  emptyDataContent,
}: DataTableProps<TData>) {
  const tableData = data?.result;
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Oops! Ocorreu um erro ao buscar seus dados.",
        description: `${error}`,
      });
    }
  }, [error, toast]);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c: ColumnModel<TData>) => (
                <TableHead key={c.id}>{flexRender(c.header, {})}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : tableData?.length ? (
              tableData.map((d: TData, index) => (
                <TableRow key={index}>
                  {columns.map((c: ColumnModel<TData>) => (
                    <TableCell key={c.id}>
                      {flexRender(c.cell(d), {})}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {flexRender(emptyDataContent, {})}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
