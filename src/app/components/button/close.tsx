import * as React from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface ICloseButtonProps {
  onClick?: () => void;
}

const CloseButton: React.FunctionComponent<ICloseButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="text-red-400 hover:text-red-500 transition"
      type="button"
      onClick={onClick}
    >
      <RiCloseCircleFill className="ml-5 h-8 w-8" />
    </button>
  );
};

export default CloseButton;
