"use client";
import Phone from "@/components";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  locale: string;
}

export const UploadYourPhoto = ({ locale }: Props) => {
  const t = useTranslations("HomePage.UploadYourPhoto");

  return (
    <section>
      <MaxWidthWrapper className="py-24">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              {t.rich("title", {
                code: (chunks) => (
                  <span className="relative px-2 bg-primary text-white">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
            <Image
              width={250}
              height={250}
              src="/arrow.png"
              alt="/arrow.png"
              className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
            />

            <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
              <Image
                width={250}
                height={250}
                src="/horse.jpg"
                alt="/horse.jpg"
                className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
              />
            </div>

            <Phone classNameMainPicture="w-60" imgSrc="/horse_phone.jpg" />
          </div>
        </div>

        <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
          <li className="w-fit">
            <Check className="h-5 w-5 text-primary inline mr-1.5" />
            {t.rich("li1", { t: (t) => <>{t}</> })}
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-primary inline mr-1.5" />
            {t.rich("li2", {
              t: (t) => <code>{t}</code>,
            })}
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-primary inline mr-1.5" />
            {t.rich("li3", {
              t: (t) => <code>{t}</code>,
            })}
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-primary inline mr-1.5" />
            {t.rich("li4", {
              t: (t) => <code>{t}</code>,
            })}
          </li>

          <div className="flex justify-center">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "mx-auto mt-8",
              })}
              href={`${locale}/configure/upload`}
              // href={`/configure/upload`}
            >
              {t.rich("create", {
                t: (t) => <code>{t}</code>,
              })}{" "}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};
