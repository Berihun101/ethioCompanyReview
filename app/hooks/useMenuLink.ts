import { create } from "zustand";


interface MenuLinkStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useMenuLink = create<MenuLinkStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useMenuLink;