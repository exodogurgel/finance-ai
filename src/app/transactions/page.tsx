import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import { ArrowDownUpIcon } from "lucide-react";
import { TransactionsColumns } from "./_columns";

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold text-white">
          Adicionar transação <ArrowDownUpIcon />
        </Button>
      </div>

      <DataTable columns={TransactionsColumns} data={transactions} />
    </div>
  );
}
