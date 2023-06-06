"use client";

import useBoard from "@/app/hooks/useBoard";
import * as React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "../column";
import {
  CHILDREN_OF_BOARD_TYPES,
  Column as ColumnInterface,
} from "@/app/types/board";

interface IBoardProps {}

const Board: React.FunctionComponent<IBoardProps> = (props) => {
  const [board, getBoard, setBoard] = useBoard((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);

  React.useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // check drag card outside of board
    if (!destination) return;

    // handle column drag
    if (type === CHILDREN_OF_BOARD_TYPES.COLUMN) {
      const newColumns = board.columns;

      const [removed] = newColumns.splice(source.index, 1);

      newColumns.splice(destination.index, 0, removed);

      setBoard({
        ...board,
        columns: newColumns,
      });
      return;
    }

    // handle card drag
    if (type === CHILDREN_OF_BOARD_TYPES.CARD) {
      const { columns } = board;

      const startColumnIndex = columns[Number(source.droppableId)];
      const endColumnIndex = columns[Number(destination.droppableId)];

      const startColumn: ColumnInterface = {
        id: startColumnIndex.id,
        items: startColumnIndex.items,
      };

      const endColumn: ColumnInterface = {
        id: endColumnIndex.id,
        items: endColumnIndex.items,
      };

      if (!startColumn || !endColumn) return;

      if (source.index === destination.index && startColumn === endColumn)
        return;

      const newItems = startColumn.items;
      const [itemMoved] = newItems.splice(source.index, 1);

      // handle drag card inside column
      if (startColumn.id === endColumn.id) {
        newItems.splice(destination.index, 0, itemMoved);
        const newColumn = {
          id: startColumn.id,
          items: newItems,
        };

        const newColumns = columns;
        newColumns[Number(startColumn.id)] = newColumn;
        setBoard({ ...board, columns: newColumns });
      }
      // handle drag card to another column
      else {
        const endItems = endColumn.items;
        endItems.splice(destination.index, 0, itemMoved);

        const newColumn = {
          id: startColumn.id,
          items: newItems,
        };
        const newColumns = columns;
        newColumns[Number(startColumn.id)] = newColumn;

        setBoard({ ...board, columns: newColumns });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId={CHILDREN_OF_BOARD_TYPES.COLUMN}
        direction="horizontal"
        type={CHILDREN_OF_BOARD_TYPES.COLUMN}
      >
        {(provided: any) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {board.columns.map(({ id, items }, index) => (
              <Column key={id} id={id} items={items} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
