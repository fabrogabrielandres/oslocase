import clsx from "clsx";
import { Star } from "lucide-react";
import React from "react";

export interface StarStackInterface {
  data: Array<StarInterface>;
  classNameContainer?: string;
}

export interface StarInterface {
  classNameStar?: string;
}
export const StarStack = ({
  data,
  classNameContainer,
}: StarStackInterface) => {
  return (
    <div className={clsx("flex", classNameContainer && classNameContainer)}>
      {data.map(({ classNameStar }, idx) => {
        return (
          <div key={idx}>
            <Star className={classNameStar} />
          </div>
        );
      })}
    </div>
  );
};
