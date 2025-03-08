import Image from "next/image";
import React from "react";

export const Testimonial = () => {
  return (
    <Image
      alt="/your-image.png"
      width={250}
      height={250}
      src="/your-image.png"
      className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
    />
  );
};
