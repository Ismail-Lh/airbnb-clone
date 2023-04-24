import { create } from 'zustand';

interface SearchModalStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModalStore = create<SearchModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModalStore;
