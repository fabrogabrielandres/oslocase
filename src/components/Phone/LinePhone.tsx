import Image from "next/image";
import React from "react";

export const LinePhone = () => {
  return (
    <Image
      src="/line.png"
      className="absolute w-20 -left-6 -bottom-6 select-none"
      width={500}
      height={500}
      alt="line.png"
    />
  );
};
