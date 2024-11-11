import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastStore {
  open: boolean;
  type: ToastType;
  message: string;
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  open: false,
  type: "success",
  message: "",
  showToast: (type, message) => set({ open: true, type, message }),
  hideToast: () => set({ open: false, message: "" }),
}));
