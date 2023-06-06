"use client";

import Image from "next/image";
import * as React from "react";

interface IAvatarProps {
  currentUser?: any;
}

const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  const { currentUser } = props;

  return (
    <div className="relative cursor-pointer ">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block rounded-full  shadow-sm hover:shadow-md transition">
          {/* <Image
            className="rounded-full w-10 h-10 "
            height="100"
            width="100"
            alt="Avatar"
            src={currentUser?.src}
          /> */}
          <div className="rounded-full w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
