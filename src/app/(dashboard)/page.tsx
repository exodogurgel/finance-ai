import { Navbar } from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "@/data/get-dashboard";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("?month=01");
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboard} />

            <div className="grid-rows1 grid grid-cols-3 gap-6">
              <TransactionsPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
