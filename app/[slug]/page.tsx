import React from "react";
import { getBoard, getBoardNames } from "../api";
import Dashboard from "@/components/Dashboard";
import DashboardLayout from "@/components/DashboardLayout";
import { currentUser } from "@clerk/nextjs";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: Props) {
  const user = await currentUser();
  console.log(user, "user");

  // .catch((err) => {
  // console.log(err);
  // });

  const boardUrl = user ? `/user/${slug}` : `/${slug}`;
  const { data: board } = await getBoard(boardUrl);

  const boardNameUrl = user ? `/user/names/${user.id}` : "/names";
  const { data: boardNames } = await getBoardNames(boardNameUrl);

  return (
    <DashboardLayout boardNames={boardNames} board={board}>
      <Dashboard board={board} />
    </DashboardLayout>
  );
}
