"use client"; // Error components must be Client Components

import { ButtonPrimary } from "@/components/ui/buttons";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center flex-col h-screen gap-4">
      <h2 className="text-lg font-bold">Something went wrong!</h2>
      <ButtonPrimary
        handleClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
            window.location.reload();
          }
        }
        className="px-8"
      >
        Try again
      </ButtonPrimary>
    </div>
  );
}
