import { create } from "zustand";
import { getIdentity } from "../services/identity";

export const useIdentityStore = create((set) => ({
  identity: getIdentity(),
  setIdentity: (identity) => set({ identity }),
  clearIdentity: () => set({ identity: null }),
}));
