"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import {
  transactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: transactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export async function addTransaction(params: AddTransactionParams) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  addTransactionSchema.parse(params);

  await db.transaction.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");
}
