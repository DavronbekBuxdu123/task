import { create } from "zustand";
import { User } from "@prisma/client";

interface UserStore {
  soqchi: User | null;
  setSoqchi: (user: User) => void;
  clearSoqchi: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  soqchi: null,
  setSoqchi: (user) => set({ soqchi: user }),
  clearSoqchi: () => set({ soqchi: null }),
}));
