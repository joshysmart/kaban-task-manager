import React from "react";
import { ButtonDestructive, ButtonSecondary } from "./ui/buttons";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
    title: string;
    description: string;
    isDark: boolean;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
};

export default function DeleteModal({
    title,
    description,
    isDark,
    setShowDeleteModal,
    handleDelete,
}: Props) {
    const ref = React.useRef(null);

    useOnClickOutside(ref, () => setShowDeleteModal(false));

    return (
        <div className="fixed top-0 flex right-0 items-center justify-center w-full h-screen bg-overlay z-[60] px-4 lg:px-0">
            <div
                className={cn(
                    "w-full md:w-[480px] flex flex-col gap-6 bg-white p-6 md:p-8 rounded-md",
                    {
                        "bg-dark-grey": isDark,
                    }
                )}
                ref={ref}
            >
                <h3 className="text-lg font-bold text-red">{title}</h3>
                <p className="text-[13px] font-medium text-medium-grey">
                    {description}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <ButtonDestructive
                        name="Delete"
                        handleClick={handleDelete}
                    />
                    <ButtonSecondary
                        name="Cancel"
                        isDark={isDark}
                        handleClick={() => setShowDeleteModal(false)}
                    />
                </div>
            </div>
        </div>
    );
}
