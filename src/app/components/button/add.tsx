import * as React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

interface IAddButtonProps {
  onClick?: () => void;
}

const AddButton: React.FunctionComponent<IAddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="text-green-400 hover:text-green-500 transition"
      type="button"
      onClick={onClick}
    >
      <BsPlusCircleFill className="w-10 h-10" />
    </button>
  );
};

export default AddButton;
