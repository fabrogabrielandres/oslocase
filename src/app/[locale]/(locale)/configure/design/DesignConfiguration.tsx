"use client";
import HandleComponent from "@/components/HandleComponent/HandleComponent";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { Rnd } from "react-rnd";

interface Props {
  id: string;
  imgUrl: string;
  imageDimenisons: ImageDimenisons;
}

interface ImageDimenisons {
  width: number;
  height: number;
}

export const DesignConfiguration = ({ imageDimenisons, id, imgUrl }: Props) => {
  const { height, width } = imageDimenisons;
  console.log(id, imgUrl, height, width);

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20 ">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full "
          >
            <Image
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] w-full h-full",
              "bg-blue-950"
            )}
          />
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] " />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: height / 4,
            width: width / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={imgUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>
      <div>
        <ScrollArea></ScrollArea>
      </div>
    </div>
  );
};
