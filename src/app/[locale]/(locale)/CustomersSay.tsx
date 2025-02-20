import { Icons } from "@/components";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { StarInterface, StarStack } from "@/components/StarStack/StarStack";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export const CustomersSay = () => {
  const stackStar: Array<StarInterface> = Array.from({ length: 5 }, () => {
    return { classNameStar: "h-5 w-5 text-primary fill-primary" };
  });

  const t = useTranslations("HomePage.customerssay");

  return (
    <section className="bg-slate-100 grainy-dark py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            {t.rich("title", {
              code: (chunks) => {
                return (
                  <>
                    <code className="relative px-2">
                      {chunks}
                      <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-primary" />
                    </code>
                  </>
                );
              },
            })}
          </h2>
          <Image
            alt="/1.png"
            src="/1.png"
            className="w-24 order-0 lg:order-2"
            width={250}
            height={250}
          />
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 ">
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20 ">
            <StarStack data={stackStar} classNameContainer="gap-0.5 mb-2 " />

            <div className="text-lg leading-8 h-full ">
              <p>
                {t.rich("customerOne", {
                  code: (chunks) => {
                    return (
                      <>
                        <code className="p-0.5 bg-slate-800 text-white">
                          {chunks}
                        </code>
                      </>
                    );
                  },
                })}
              </p>
            </div>
            <div className="flex gap-4 mt-2 ">
              <Image
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-1.png"
                alt="user"
                width={250}
                height={250}
              />
              <div className="flex flex-col ">
                <p className="font-semibold">Jonathan</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-primary" />
                  <p className="text-sm">
                    {" "}
                    {t.rich("Verified", {
                      code: (chunks) => {
                        return (
                          <>
                            <code className="p-0.5 bg-slate-800 text-white">
                              {chunks}
                            </code>
                          </>
                        );
                      },
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* second user review */}
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20 ">
            <StarStack data={stackStar} classNameContainer="gap-0.5 mb-2 " />

            <div className="text-lg leading-8 h-full ">
              <p>
                {t.rich("customerTwo", {
                  code: (chunks) => {
                    return (
                      <>
                        <code className="p-0.5 bg-slate-800 text-white">
                          {chunks}
                        </code>
                      </>
                    );
                  },
                })}
              </p>
            </div>
            <div className="flex gap-4 mt-2 ">
              <Image
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-4.jpg"
                alt="user"
                width={250}
                height={250}
              />
              <div className="flex flex-col">
                <p className="font-semibold">Josh</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-primary" />
                  <p className="text-sm">
                    {t.rich("Verified", {
                      code: (chunks) => {
                        return (
                          <>
                            <code className="p-0.5 bg-slate-800 text-white">
                              {chunks}
                            </code>
                          </>
                        );
                      },
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      {/* 
    <div className="pt-16">
      <Reviews />
    </div> */}
    </section>
  );
};
