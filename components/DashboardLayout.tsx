"use client";
import React from "react";
import Navbar from "./Navbar";
import { NavHeightProvider } from "@/contexts";
import BottomSection from "./BottomSection";

type Props = {
  children: React.ReactNode;
  boardNames?: {
    _id: string;
    slug: string;
  }[];
  board: Board;
};
export default function DashboardLayout({
  boardNames,
  board,
  children, // will be a page or nested layout
}: Props) {
  const [showAddNewTask, setShowAddNewTask] = React.useState(false);
  const [showEditBoard, setShowEditBoard] = React.useState(false);
  const [showDeleteBoard, setShowDeleteBoard] = React.useState(false);
  const [createdBoard, setCreatedBoard] = React.useState(false);

  return (
    <NavHeightProvider>
      <Navbar
        setShowAddNewTask={setShowAddNewTask}
        setShowEditBoard={setShowEditBoard}
        setShowDeleteBoard={setShowDeleteBoard}
        board={board}
        createdBoard={createdBoard}
        setCreatedBoard={setCreatedBoard}
        boardNames={boardNames}
      />
      <BottomSection
        boardNames={boardNames}
        board={board}
        showAddNewTask={showAddNewTask}
        showEditBoard={showEditBoard}
        showDeleteBoard={showDeleteBoard}
        setShowEditBoard={setShowEditBoard}
        setShowAddNewTask={setShowAddNewTask}
        setShowDeleteBoard={setShowDeleteBoard}
        setCreatedBoard={setCreatedBoard}
        createdBoard={createdBoard}
      >
        {children}
      </BottomSection>
    </NavHeightProvider>
  );
}
