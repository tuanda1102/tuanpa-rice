import { create } from 'zustand';

import { type IUser } from '@/types/user';

interface IGlobalStore {
  authUser: IUser | null;
  actions: {
    setAuthUser: (authUser: IUser) => void;
  };
}

const useGlobalStore = create<IGlobalStore>((set) => {
  return {
    authUser: null,
    actions: {
      setAuthUser: (authUser) => set({ authUser }),
    },
  };
});

/**
 * Export all actions of Global Store
 * @returns - Actions function
 */
export const useGlobalStoreActions = () =>
  useGlobalStore((state) => state.actions);

/**
 * Export state
 * @returns - state
 */
export const useAuthUser = () => useGlobalStore((state) => state.authUser);
