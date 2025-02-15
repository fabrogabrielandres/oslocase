import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactElement } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactElement | ReactElement[];
  imgSrc: string;
  dark?: boolean;
  classNameContainer?: string;
}

export const Phone = ({
  imgSrc,
  classNameContainer,
  dark = false,
  children,
  ...props
}: PhoneProps) => {
  return (
    <>
      <div
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
        <div className="absolute -z-10 inset-0">
          <img
            className="object-cover min-w-full min-h-full"
            src={imgSrc}
            alt="overlaying phone image"
          />

          {/*  */}
        </div>
      </div>
      {children}
    </>
  );
};
