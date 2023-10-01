import React from "react";
import { IconShowSidebar } from "@/app/assets/icons";
import { useNavHeightContext, useThemeContext } from "@/contexts";
import { CreateBoard, DeleteModal, EditBoard, NewTask, SideNav } from ".";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type Props = {
  boardNames?: {
    _id: string;
    slug: string;
  }[];
  board?: Board;
  user: any;
  children: React.ReactNode;
  showAddNewTask: boolean;
  showEditBoard: boolean;
  showDeleteBoard: boolean;
  createdBoard: boolean;
  setCreatedBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BottomSection({
  boardNames,
  board,
  user,
  createdBoard,
  setCreatedBoard,
  showAddNewTask,
  setShowAddNewTask,
  showEditBoard,
  setShowEditBoard,
  showDeleteBoard,
  setShowDeleteBoard,
  children,
}: Props) {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const { navbarHeight } = useNavHeightContext();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const myStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  const router = useRouter();
  const { userId } = useAuth();

  function handleDeleteBoard() {
    if (!userId) {
      return router.push("/sign-in");
    }
  }

  return (
    <>
      <section className="absolute bottom-0 flex w-full" style={myStyle}>
        <SideNav
          boardNames={boardNames}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          setCreatedBoard={setCreatedBoard}
        />
        <section
          className={`overflow-y-scroll ${
            showSidebar ? "md:w-[65%] lg:w-[80%]" : "w-[100%]"
          } transition-colors ${
            isDark ? "bg-very-dark-grey-dark-bg" : "bg-light-grey-light-bg"
          }`}
        >
          <div
            className={`w-full h-[1px] transition-colors ${
              isDark ? "bg-lines-dark" : "bg-lines-light"
            }`}
          />
          {children}
          <button
            className={`fixed left-0 w-14 flex items-center justify-center py-5 bottom-8 bg-main-purple rounded-[0_999px_999px_0] hover:bg-main-purple-hover ${
              showSidebar && "hidden"
            }`}
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <IconShowSidebar />
          </button>
        </section>
      </section>
      {createdBoard && (
        <CreateBoard
          isDark={isDark}
          setCreatedBoard={setCreatedBoard}
          user={user}
        />
      )}
      {showAddNewTask && (
        <NewTask
          setShowAddNewTask={setShowAddNewTask}
          isDark={isDark}
          boardColumns={board?.columns}
        />
      )}
      {showEditBoard && (
        <EditBoard
          setShowEditBoard={setShowEditBoard}
          isDark={isDark}
          board={board}
        />
      )}
      {showDeleteBoard && (
        <DeleteModal
          description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
          isDark={isDark}
          title="Delete this board?"
          setShowDeleteModal={setShowDeleteBoard}
          handleDelete={handleDeleteBoard}
        />
      )}
    </>
  );
}
