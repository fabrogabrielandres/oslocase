import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactElement } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactElement | ReactElement[];
  imgSrc: string;
  dark?: boolean;
  classNameContainer?: string;
  classNameMainPicture?: string;
}

export const Phone = ({
  imgSrc,
  classNameContainer,
  classNameMainPicture,
  dark = false,
  children,
  ...props
}: PhoneProps) => {
  return (
    <>
      <article
        className={cn(
          "relative pointer-events-none z-50 overflow-hidden",
          classNameContainer
        )}
        {...props}
      >
        <img
          src={
            dark
              ? "/phone-template-dark-edges.png"
              : "/phone-template-white-edges.png"
          }
          className="pointer-events-none z-50 select-none"
          alt="phone image"
        />
        <section className="absolute -z-10 inset-0 bg-red-400">
          <img
            className={cn("object-cover min-w-full min-h-full", {
              classNameMainPicture,
            })}
            src={imgSrc}
            alt="overlaying phone image"
          />
          {/*  */}
        </section>
      </article>
      {children}
    </>
  );
};
