import { LinePhone } from "./Phone/LinePhone";
import { Phone as PhoneHC } from "./Phone/Phone";
import {  PhoneHOCProps } from "./Phone/PhoneInterface";
import { Testimonial } from "./Phone/Testimonial";



export { AuthProvider } from "./Provaiders/AuthProviderKinde/AuthProviderKinde";
export * from "./LocaleSwitcherSelect/LocaleSwitcherSelect";



export const Phone: PhoneHOCProps = Object.assign( PhoneHC, {
    Testimonial,
    LinePhone
})


export default Phone;