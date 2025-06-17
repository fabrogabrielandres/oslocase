import { cn } from "@/lib/utils";
// import { ReactElement } from "react";

export interface PhoneProps {
  // children?: ReactElement | ReactElement[];
  children?: (arg?: unknown) => JSX.Element;
  dark?: boolean;
  classNameContainer?: string;
  classNameMainPicture?: string;
  classNameMainContainerPicture?: string;
  imgSrc: string;
}

export const Phone = ({
  classNameContainer,
  classNameMainPicture,
  classNameMainContainerPicture,
  dark = false,
  children,
  imgSrc,
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
        <section
          className={cn(
            `absolute -z-10 inset-0 ${classNameMainContainerPicture}`
          )}
        >
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

      {children ? children() : null}
    </>
  );
};
