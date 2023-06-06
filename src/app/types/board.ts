interface BoardState {
  columns: Column[];
}

type ColumnType = "todo" | "inprogress" | "done";

export enum CHILDREN_OF_BOARD_TYPES {
  COLUMN = "COLUMN",
  CARD = "CARD",
}

interface Column {
  id: ColumnType;
  items: Todo[];
}

interface Todo {
  id: string;
  title: string;
  createAt: string;
  status: ColumnType;
}

export type { BoardState, ColumnType, Column, Todo };
