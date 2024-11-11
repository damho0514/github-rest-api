import * as Toast from "@radix-ui/react-toast";
import React from "react";
import { useToastStore } from "../store/toastStore";

export default function ToastUI() {
  const { open, type, message, hideToast } = useToastStore();
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={`grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${
          type === "error"
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
        open={open}
        onOpenChange={hideToast}
      >
        <Toast.Title className="mb-[5px] text-[15px] font-medium [grid-area:_title]">
          {type === "error" ? "Error" : "Success"}
        </Toast.Title>
        <Toast.Description>{message}</Toast.Description>
        <Toast.Action className="[grid-area:_action]" asChild altText="Dismiss">
          <button
            onClick={hideToast}
            className="inline-flex h-[25px] items-center justify-center rounded px-2.5 text-xs font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]"
            style={{
              backgroundColor:
                type === "error" ? "rgb(248, 113, 113)" : "rgb(72, 187, 120)",
              color: "#fff",
            }}
          >
            Dismiss
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}
