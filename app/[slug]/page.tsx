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

  console.log(user);

  const boardUrl = user
    ? `${process.env.DB_HOST}/user/${slug}`
    : `${process.env.DB_HOST}/${slug}`;
  const { data: board } = await getBoard(boardUrl);

  const boardNameUrl = user
    ? `${process.env.DB_HOST}/user/names/${user.id}`
    : `${process.env.DB_HOST}/names`;
  const { data: boardNames } = await getBoardNames(boardNameUrl);

  return (
    <DashboardLayout boardNames={boardNames} board={board} user={user}>
      <Dashboard board={board} />
    </DashboardLayout>
  );
}
