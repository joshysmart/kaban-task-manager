import React from "react";
import { getBoard, getBoardNames } from "../api";
import Dashboard from "@/components/Dashboard";
import DashboardLayout from "@/components/DashboardLayout";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: Props) {
  const boardUrl = `${process.env.DB_HOST}/${slug}`;
  const { data: board } = await getBoard(boardUrl);

  const boardNameUrl = `${process.env.DB_HOST}/names`;
  const { data: boardNames } = await getBoardNames(boardNameUrl);

  return (
    <DashboardLayout boardNames={boardNames} board={board}>
      <Dashboard board={board} />
    </DashboardLayout>
  );
}
