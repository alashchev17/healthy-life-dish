import type { FC, ReactNode } from "react";

export type AdvantageGridProps = {
  children: ReactNode;
  itemCount: number;
};

export const AdvantageGrid: FC<AdvantageGridProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[minmax(0,420px)]">
      {children}
    </div>
  );
};
