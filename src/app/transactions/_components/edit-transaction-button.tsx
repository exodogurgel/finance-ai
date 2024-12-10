"use client";

import { useState } from "react";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpsertTransactionDialog } from "@/components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
}
