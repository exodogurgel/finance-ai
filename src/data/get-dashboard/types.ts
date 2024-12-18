import { transactionCategory, TransactionType } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: transactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
