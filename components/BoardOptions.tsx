import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
type Props = {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
};

export default function BoardOptions({
  setShowDropDown,
  setShowEditBoard,
  setShowDeleteBoard,
  isDark,
}: Props) {
  const ref = React.useRef(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const initails =
    (user?.username && user?.username.charAt(0).toUpperCase()) || "U";
  useOnClickOutside(ref, () => setShowDropDown(false));

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={`absolute right-0 top-[135%] w-[192px] p-4 rounded-lg ${
        isDark ? "bg-very-dark-grey-dark-bg text-white" : "bg-white text-base"
      }`}
      ref={ref}
    >
      <div className="flex flex-col gap-4">
        <button
          className="text-left text-[13px] font-medium text-medium-grey"
          onClick={() => setShowEditBoard(true)}
        >
          Edit Board
        </button>
        <button
          className="text-left text-red text-[13px] font-medium"
          onClick={() => setShowDeleteBoard(true)}
        >
          Delete Board
        </button>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center justify-center w-8 h-8 text-white bg-green-600 rounded-full">
          <Image
            src={user?.profileImageUrl ?? ""}
            alt={initails}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <h3 className="">{user?.username ?? "No user"}</h3>
      </div>
      {isSignedIn && (
        <SignOutButton>
          <button
            className="px-4 py-1 mt-4 text-base font-medium rounded-full bg-red"
            onClick={() => setShowDropDown(false)}
          >
            Sign out
          </button>
        </SignOutButton>
      )}
      {!isSignedIn && (
        <Link
          href={"/sign-in"}
          className="block px-4 py-1 mt-4 text-base font-medium text-center bg-green-700 rounded-full"
          onClick={() => setShowDropDown(false)}
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
