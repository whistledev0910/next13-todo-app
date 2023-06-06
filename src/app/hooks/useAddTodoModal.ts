import { create } from "zustand";

interface IAddTodoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddTodoModal = create<IAddTodoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddTodoModal;
