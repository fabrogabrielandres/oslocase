import { PhoneProps } from "./Phone";

export interface PhoneHOCProps {
  ({
    children,
    classNameContainer,
    classNameMainPicture,
    dark,
    imgSrc,
    ...props
  }: PhoneProps): JSX.Element;
  Testimonial: () => JSX.Element;
  LinePhone: () => JSX.Element;
}
