import { MaxWidthWrapper } from "../MaxWidthWrapper/MaxWidthWrapper";


export function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl bg-blue-700">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />

    </MaxWidthWrapper>
  );
}
