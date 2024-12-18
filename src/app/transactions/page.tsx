import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import { TransactionsColumns } from "./_columns";
import { AddTransactionButton } from "@/components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function TransactionsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <ScrollArea>
          <DataTable columns={TransactionsColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
}
