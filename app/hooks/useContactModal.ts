import { create } from "zustand";

interface ContactModalStore {
  isOpen: boolean;
  data: any; // This will store the modal's dynamic data (e.g., company information)
  open: (data: any) => void;
  close: () => void;
}

const useContactModal = create<ContactModalStore>((set) => ({
  isOpen: false,
  data: null, // Initial value for the modal data
  open: (data) => set({ isOpen: true, data }), // Open modal and set data
  close: () => set({ isOpen: false, data: null }), // Close modal and reset data
}));

export default useContactModal;
