"use client";

import { FC, ReactNode } from "react";
import { useHeaderContext } from "#/design/shared/Header/HeaderContext";

export type PageContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const PageContainer: FC<PageContainerProps> = ({
  children,
  className,
}) => {
  const { headerHeight } = useHeaderContext();

  return (
    <div
      className={className ?? undefined}
      style={{
        paddingTop: `calc(${headerHeight}px + 10px)`,
      }}
    >
      {children}
    </div>
  );
};
