import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createWallet } from "@/lib/api/wallet.ts";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUpdateDialog({
  open = false,
  onOpenChange,
}: CreateUpdateDialogProps) {
  const { toast } = useToast();
  const [isSubmiting, setSubmiting] = useState(false);
  const formSchema = z.object({
    description: z
      .string({
        required_error: "A descrição da carteira é obrigatória.",
      })
      .min(3, {
        message: "A descrição da carteira deve ter pelo menos 3 caracteres.",
      })
      .max(255, {
        message: "A descrição da carteira deve ter no máximo 255 caracteres.",
      }),
    createdAt: z.date({
      required_error: "A data de criação é obrigatória.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      createdAt: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmiting(true);
    createWallet(values)
      .then((result) => {
        toast({
          title: "Tudo certo!",
          description: `A carteira '${result.description}' foi criada com sucesso.`,
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Oops! Ocorreu um erro ao criar a carteira",
          description: `${err}.`,
        });
      })
      .finally(() => {
        setSubmiting(false);
        openChange(false);
      });
  }

  function openChange(isOpen: boolean) {
    onOpenChange(isOpen);
    if (!isOpen) form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Carteira</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descrição da carteira..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de criação</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {isSubmiting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
