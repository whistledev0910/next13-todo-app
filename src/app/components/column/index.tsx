"use client";

import { CHILDREN_OF_BOARD_TYPES, ColumnType, Todo } from "@/app/types/board";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "../todoCard";
import AddButton from "../button/add";
import useAddTodoModal from "@/app/hooks/useAddTodoModal";
import useSearch from "@/app/hooks/useSearch";

interface IColumnProps {
  id: ColumnType;
  items: Todo[];
  index: number;
}

const transferKeyColumnTypeToText: { [key in ColumnType]: string } = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

const Column: React.FunctionComponent<IColumnProps> = (props) => {
  const { id, items, index } = props;

  const { searchString } = useSearch();

  const { onOpen } = useAddTodoModal();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable
            droppableId={index.toString()}
            type={CHILDREN_OF_BOARD_TYPES.CARD}
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm text-black ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-gray-200/75"
                }`}
              >
                <h2 className="flex items-center justify-between px-2 font-bold py-2 mb-5">
                  <p className="text-lg">{transferKeyColumnTypeToText[id]}</p>{" "}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm  text-center">
                    {!searchString
                      ? items.length
                      : items.filter((i) =>
                          i.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {items.map((item, index) => {
                    if (
                      searchString &&
                      !item.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    ) {
                      return null;
                    }

                    return (
                      <Draggable
                        index={index}
                        draggableId={item.id}
                        key={item.id}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={item}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <AddButton onClick={onOpen} />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
