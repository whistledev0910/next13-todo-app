import { ColumnType, Todo } from "@/app/types/board";
import * as React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import CloseButton from "../button/close";
import useBoard from "@/app/hooks/useBoard";
import { toast } from "react-hot-toast";

interface ITodoCardProps {
  todo: Todo;
  index: number;
  id: ColumnType;
  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: React.FunctionComponent<ITodoCardProps> = (props) => {
  const { todo, index, id, innerRef, dragHandleProps, draggableProps } = props;

  const [board, setBoard] = useBoard((state) => [state.board, state.setBoard]);

  const handleRemoveTask = () => {
    const columnIndex = board.columns.findIndex((i) => i.id === id);
    board.columns[columnIndex].items.splice(index, 1);

    setBoard({ ...board });
    toast.success("Remove task success!");
  };

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <CloseButton onClick={handleRemoveTask} />
      </div>
    </div>
  );
};

export default TodoCard;
