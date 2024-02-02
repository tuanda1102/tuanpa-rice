import { create } from 'zustand';

interface INewFeedStore {
  priceMenu: number | null;
  actions: {
    setPriceMenu: (priceMenu: number) => void;
  };
}

const useNewFeedStore = create<INewFeedStore>((set) => {
  return {
    priceMenu: null,
    actions: {
      setPriceMenu: (priceMenu) => set({ priceMenu }),
    },
  };
});

/**
 * Export all actions of Global Store
 * @returns - Actions function
 */
export const useNewFeedStoreActions = () =>
  useNewFeedStore((state) => state.actions);

/**
 * Export state
 * @returns - state
 */
export const usePriceMenu = () => useNewFeedStore((state) => state.priceMenu);
