"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../input";
import Modal from "./index";

import useAddTodoModal from "@/app/hooks/useAddTodoModal";
import * as React from "react";
import useBoard from "@/app/hooks/useBoard";
import { ColumnType } from "@/app/types/board";
import { toast } from "react-hot-toast";

interface IAddTodoModalProps {}

const AddTodoModal: React.FunctionComponent<IAddTodoModalProps> = (props) => {
  const addTodoModal = useAddTodoModal();

  const [isLoading, setIsLoading] = useState(false);

  const [board, setBoard] = useBoard((state) => [state.board, state.setBoard]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      taskType: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ title, taskType }) => {
    setIsLoading(true);
    if (taskType) {
      const newItem = {
        id: Date.now().toString(),
        title,
        createAt: Date.now().toString(),
        status: taskType as ColumnType,
      };

      const columnIndex = board.columns.findIndex((i) => i.id === taskType);
      board.columns[columnIndex].items.push(newItem);

      setBoard({ ...board });
      toast.success("Task created!");
      addTodoModal.onClose();
      reset();
    } else {
      toast.error("Please choose a task type!");
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <ul className="flex flex-col gap-2">
        <li>
          <input
            type="radio"
            id="todo"
            value="todo"
            className="hidden peer"
            required
            {...register("taskType")}
          />
          <label
            htmlFor="todo"
            className="transition inline-flex items-center justify-between
             w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg
              cursor-pointer peer-checked:bg-orange-400
                peer-checked:text-white hover:text-gray-600 hover:bg-gray-100
                  "
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Todo</div>
              <div className="w-full">Why haven&apos;t done it yet?</div>
            </div>
          </label>
        </li>

        <li>
          <input
            type="radio"
            id="inprogress"
            value="inprogress"
            className="hidden peer"
            required
            {...register("taskType")}
          />
          <label
            htmlFor="inprogress"
            className="transition inline-flex items-center justify-between
             w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg
              cursor-pointer peer-checked:bg-orange-400
                peer-checked:text-white hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">In progress</div>
              <div className="w-full">Let&apos;s do it fast</div>
            </div>
          </label>
        </li>

        <li>
          <input
            type="radio"
            id="done"
            value="done"
            className="hidden peer"
            required
            {...register("taskType")}
          />
          <label
            htmlFor="done"
            className="transition inline-flex items-center justify-between
             w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg
              cursor-pointer peer-checked:bg-orange-400
                peer-checked:text-white hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Done</div>
              <div className="w-full">Are you sure you&apos;re done?</div>
            </div>
          </label>
        </li>
      </ul>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addTodoModal.isOpen}
      title="Add New Task"
      actionLabel="Create"
      onClose={addTodoModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddTodoModal;
