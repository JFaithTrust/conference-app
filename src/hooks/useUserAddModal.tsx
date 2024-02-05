import { create } from "zustand";

interface UserAddModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserAddModal = create<UserAddModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUserAddModal;
