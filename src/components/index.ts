import { LinePhone } from "./Phone/LinePhone";
import { Phone as PhoneHC } from "./Phone/Phone";
import {  PhoneHOCProps } from "./Phone/PhoneInterface";
import { Testimonial } from "./Phone/Testimonial";



// Components 
export const Phone: PhoneHOCProps = Object.assign( PhoneHC, {
    Testimonial,
    LinePhone
})
export default Phone;


export * from "./Provaiders/AuthProviderKinde/AuthProviderKinde";
export * from "./Reviews/Reviews";
export * from "./LocaleSwitcherSelect/LocaleSwitcherSelect";
export * from "./Icons/Icons";
export * from "./Footer/Footer";
export * from "./HandleComponent/HandleComponent";



