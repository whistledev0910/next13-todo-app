"use client";

import * as React from "react";
import { Toaster } from "react-hot-toast";

interface IToasterProviderProps {}

const ToasterProvider: React.FunctionComponent<IToasterProviderProps> = (
  props
) => {
  return <Toaster />;
};

export default ToasterProvider;
