import { create } from "zustand";

interface UserState {
  userDetail: { id: number; username: string; avatar: string } | null;
  setUser: (user: { id: number; username: string; avatar: string } | null) => void;
  logout: () => void;
}

const useUserDetail = create<UserState>((set) => ({
  userDetail: null,
  setUser: (user) => set({ userDetail: user }),
  logout: () => set({ userDetail: null }),
}));

export default useUserDetail;