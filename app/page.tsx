import DashboardLayout from "@/components/DashboardLayout";
import React from "react";
import { getBoardNames } from "./api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

// Todo: Create navbar component.
// Todo: Create sideNav.
// Todo: Create view task.
// Todo: Create add task.
// Todo: Create edit task.
// Todo: Create add board.
// Todo: Create edit board.
// Todo: Create delete board.
// Todo: Create delete task.

/**
 * A functional component representing the Home page.
 * @returns {JSX.Element} The rendered JSX element.
 */
export default async function Home() {
  const user = await currentUser();
  // const user = null;
  let url;
  if (user) {
    url = `${process.env.DB_HOST}/user/names/${user.id}`;
  } else {
    redirect("/platform-launch");
  }
  const { data: boardNames } = await getBoardNames(url);

  return (
    <DashboardLayout
      boardNames={boardNames}
      board={{
        columns: [],
      }}
    >
      <Dashboard board={undefined} />
    </DashboardLayout>
  );
}