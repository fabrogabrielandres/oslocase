// import { useLocale, useTranslations } from "next-intl";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { Check } from "lucide-react";
import Image from "next/image";
import "../../globals.css";
import Phone from "@/components";
import { CustomersSay } from "./ui/CustomersSay";
import {
  AvatarInterface,
  AvatarStack,
} from "@/components/AvatarStack/AvatarStack";
import { StarInterface, StarStack } from "@/components/StarStack/StarStack";
import { UploadYourPhoto } from "./ui/UploadYourPhoto";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  // const t = useTranslations("HomePage");
  const t = await getTranslations("HomePage");
  const { locale } = await params;

  const stackImage: Array<AvatarInterface> = [
    {
      classNameImage:
        "inline-block h-10 w-10 rounded-full ring-2 ring-slate-100",
      src: "/users/user-1.png",
      alt: "user image",
      width: 500,
      height: 500,
    },

    {
      classNameImage:
        "inline-block h-10 w-10 rounded-full ring-2 ring-slate-100",
      src: "/users/user-2.png",
      alt: "user image",
      width: 500,
      height: 500,
    },

    {
      classNameImage:
        "inline-block h-10 w-10 rounded-full ring-2 ring-slate-100",
      src: "/users/user-3.png",
      alt: "user image",
      width: 500,
      height: 500,
    },

    {
      classNameImage:
        "inline-block h-10 w-10 rounded-full ring-2 ring-slate-100",
      src: "/users/user-4.jpg",
      alt: "user image",
      width: 500,
      height: 500,
    },

    {
      classNameImage:
        "inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100",
      src: "/users/user-5.jpg",
      alt: "user image",
      width: 500,
      height: 500,
    },
  ];

  const stackStar: Array<StarInterface> = Array.from({ length: 5 }, () => {
    return { classNameStar: "h-5 w-5 text-primary fill-primary" };
  });

  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* <div className="absolute left-0 -top-32 hidden lg:block border-solid border-4 border-gray-600"> */}
              <div className="absolute w-full left-0 -top-32 hidden lg:block ">
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate1-50/50 from-slate-50 h-28" />
                <Image
                  alt="/1.png"
                  src={"/1.png"}
                  width={250}
                  height={250}
                  className="w-fit bg-gradient-to-t via-slate1-50/50 from-slate-50"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                {t.rich("title", {
                  code: (chunks) => (
                    <code className="bg-primary px-2 text-white">{chunks}</code>
                  ),
                })}
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                {t.rich("subtitle", {
                  code: (chunks) => (
                    <code className="font-semibold">{chunks}</code>
                  ),
                })}
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary"></Check>
                    {t.rich("sub.li", {
                      code: (chunks) => (
                        <code className="font-semibold">{chunks}</code>
                      ),
                    })}
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary"></Check>
                    {t.rich("sub.li1", {
                      code: (chunks) => (
                        <code className="font-semibold">{chunks}</code>
                      ),
                    })}
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="text-primary"></Check>
                    {t.rich("sub.li2", {
                      code: (chunks) => (
                        <code className="font-semibold">{chunks}</code>
                      ),
                    })}
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5 ">
                <AvatarStack
                  data={stackImage}
                  classNameContainer="-space-x-4"
                ></AvatarStack>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <StarStack
                    data={stackStar}
                    classNameContainer="gap-0.5"
                  ></StarStack>

                  <p>
                    {t.rich("sub.customer", {
                      code: (chunks) => (
                        <code className="font-semibold">{chunks}</code>
                      ),
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit ">
            <div className="relative md:max-w-xl  ">
              <Phone
                classNameContainer="w-64 bg-pink-600"
                imgSrc="/testimonials/1.jpg"
              >
                {() => (
                  <>
                    {/* <LinePhone></LinePhone> */}
                    {/* <Testimonial></Testimonial> */}
                    <Phone.Testimonial />
                    <Phone.LinePhone />
                  </>
                )}
              </Phone>
            </div>
          </div>
        </MaxWidthWrapper>
        <CustomersSay />
      </section>
      <section>
        <UploadYourPhoto locale={locale} />
      </section>
    </div>
  );
}
