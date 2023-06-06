"use client";

import { useRouter } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className="p-2 flex-col items-center text-orange-500 hidden md:flex cursor-pointer"
      onClick={() => router.push("/")}
    >
      <HiCheckCircle className="w-16 h-16 " />
      <p className="text-lg font-bold uppercase">Todo App</p>
    </div>
  );
};

export default Logo;
