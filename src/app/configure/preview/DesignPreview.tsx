"use client";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { ConfigurationInterface } from "../interfaceConfigure";
import { COLORSMAPED } from "../design/DesignConfiguration";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "@/components";
import { LoginModal } from "@/components/LoginModal/LoginModal";
import { useLocale } from "next-intl";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { PayPalButton } from "@/components/Paypal/PayPalButton";

interface Props {
  configuration: ConfigurationInterface;
}

export default function DesignPreview({ configuration }: Props) {
  const [confettiRun, setConfettiRun] = useState(true);
  const [widthWindows, setWidthWindows] = useState<number>(300);
  const [heightWindows, setHeightWindows] = useState<number>(300);
  const locale = useLocale();

  useEffect(() => {
    setWidthWindows(window.innerWidth || 300);
    setHeightWindows(window.innerHeight || 300);
  }, []);
  const { user } = useKindeAuth();

  const { croppedImageUrl, ColorsPhone, finish, material, id } = configuration;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const BASE_PRICE = 14.0;
  const totalPrice = formatPrice(BASE_PRICE + finish.price + material.price);
  const totalPriceNumber = (BASE_PRICE + finish.price + material.price);

  

  // const { mutate: createPaymentSession } = useMutation({
  //   mutationKey: ["get-checkout-session"],
  //   mutationFn: createCheckoutSession,
  //   onSuccess: ({ url }) => {
  //     console.log("url", url);

  //     if (url) router.push(url);
  //     // else throw new Error("Unable to retrieve payment URL.");
  //   },
  //   onError: ({ message }) => {
  //     toast({
  //       title: `Something went wrong ${message}`,
  //       description: "There was an error on our end. Please try again.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  const handleCheckout = async () => {
    if (user) {
      // create payment session
      // createPaymentSession({ configId: id, user: user });
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      localStorage.setItem("locale", locale);
      setIsLoginModalOpen(true);
    }
  };

  const mapColors: { [key: string]: COLORSMAPED } = {
    black: {
      bg: "bg-zinc-900",
      border: "border-zinc-900",
      label: "Black",
      value: "black",
    },
    blue: {
      bg: "bg-blue-950",
      border: "border-blue-950",
      label: "Blue",
      value: "blue",
    },
    rose: {
      bg: "bg-rose-950",
      border: "border-rose-950",
      label: "Rose",
      value: "rose",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setConfettiRun(false);
    }, 3000);
  }, []);

  return (
    <>
      <div>
        <Confetti
          recycle={confettiRun}
          numberOfPieces={1000}
          width={widthWindows}
          height={heightWindows}
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
  
      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            classNameContainer={cn("w-64")}
            classNameMainContainerPicture={mapColors[ColorsPhone.value].bg}
            imgSrc={croppedImageUrl!}
          >
            {() => (
              <>
                <Phone.Testimonial />
                <Phone.LinePhone />
              </>
            )}
          </Phone>
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            {/* Your {modelLabel} Case */}
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">{BASE_PRICE}</p>
                </div>

                {finish.value === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Textured finish</p>
                    <p className="font-medium text-gray-900">{finish.price}</p>
                  </div>
                ) : null}

                {material.value === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Soft polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {material.price}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">{totalPrice}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              {user ? (
                <PayPalButton
                  configurationId={id}
                  userId={user.id}
                  amount={totalPriceNumber}
                ></PayPalButton>
              ) : (
                <Button
                  onClick={() => handleCheckout()}
                  className="px-4 sm:px-6 lg:px-8"
                >
                  Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
