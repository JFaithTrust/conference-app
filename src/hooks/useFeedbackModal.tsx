import { create } from "zustand";

interface FeedbackModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFeedbackModal = create<FeedbackModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFeedbackModal;
