import { create } from "zustand";
import { BoardState, Column, ColumnType } from "../types/board";
import { getDataFromLocal, setDataToLocal } from "../utils/storage";
import { STORAGE_KEYS } from "../types/storage";

interface IBoardStore {
  board: BoardState;
  getBoard: () => void;
  setBoard: (board: BoardState) => void;
}

const initialBoard: BoardState = {
  columns: [
    {
      id: "todo",
      items: [
        { id: "1", createAt: "123", status: "todo", title: "Hello" },
        { id: "2", createAt: "345", status: "todo", title: "Hello 2" },
      ],
    },
    { id: "inprogress", items: [] },
    { id: "done", items: [] },
  ],
};

const useBoard = create<IBoardStore>((set) => ({
  board: { columns: [] },
  getBoard: async () => {
    const board = await getTodoListGroupedByColumn();
    set({ board });
  },
  setBoard: (board) => {
    setDataToLocal(STORAGE_KEYS.BOARD, board);
    set({ board });
  },
}));

const getTodoListGroupedByColumn = async () => {
  const board = await getDataFromLocal(STORAGE_KEYS.BOARD);

  if (
    Object.keys(board).length === 0 ||
    Object.keys(board.columns).length === 0
  ) {
    setDataToLocal(STORAGE_KEYS.BOARD, initialBoard);
    return initialBoard;
  }
  return board;
};

export default useBoard;
