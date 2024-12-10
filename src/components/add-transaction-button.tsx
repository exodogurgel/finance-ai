"use client";

import { useState } from "react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";

export function AddTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar transação <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
}
