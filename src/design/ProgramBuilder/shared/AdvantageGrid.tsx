import type { FC, ReactNode } from "react";

export type AdvantageGridProps = {
  children: ReactNode;
  itemCount: number;
};

export const AdvantageGrid: FC<AdvantageGridProps> = ({ children, itemCount }) => {
  const numRows = Math.ceil(itemCount / 3);

  return (
    <div
      className="w-full grid gap-5"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: `repeat(${numRows}, minmax(0, 420px))`,
      }}
    >
      {children}
    </div>
  );
};
