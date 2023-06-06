"use client";

import * as React from "react";

interface IClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FunctionComponent<IClientOnlyProps> = (props) => {
  const { children } = props;

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
