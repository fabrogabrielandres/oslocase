import clsx from "clsx";
import Image from "next/image";
import React from "react";

export interface AvatarStackInterface {
  data: Array<AvatarInterface>;
  classNameContainer?: string;
}

export interface AvatarInterface {
  alt?: string;
  src: string;
  classNameImage?: string;
  width: number;
  height: number;
}
export const AvatarStack = ({
  data,
  classNameContainer,
}: AvatarStackInterface) => {
  return (
    <div className={clsx("flex", classNameContainer && classNameContainer)}>
      {data.map(({ height, src, width, alt, classNameImage }) => {
        return (
          <div key={src}>
            <Image
              height={height}
              width={width}
              alt={alt ? alt : src}
              className={classNameImage}
              src={src}
            />
          </div>
        );
      })}
    </div>
  );
};
