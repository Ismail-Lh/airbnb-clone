import { create } from 'zustand';

interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModalStore = create<IProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModalStore;
