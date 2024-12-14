import { Navbar } from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Subscription() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full items-center justify-center">
        <h1>Subscription</h1>
      </div>
    </>
  );
}
