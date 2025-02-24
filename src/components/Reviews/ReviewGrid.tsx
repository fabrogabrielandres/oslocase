import { useInView } from "framer-motion";
import { useRef } from "react";
import { ReviewColumn } from "./ReviewColumn";
import { cn } from "@/lib/utils";

export const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const column1 = ["/testimonials/1.jpg", "/testimonials/4.jpg"];
  const column2 = ["/testimonials/2.jpg", "/testimonials/5.jpg"];
  const column3 = ["/testimonials/3.jpg", "/testimonials/6.jpg"];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3, ...column2]}
            className="bg-purple-600"
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3.length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3]}
            className="bg-yellow-600 hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3}
            className="hidden md:block bg-red-600"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
};
