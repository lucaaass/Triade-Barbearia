import {  MapPinIcon } from "lucide-react";
import { FaWhatsapp,  FaInstagram } from "react-icons/fa";

const Footer = () => {
    return ( 
        <footer className=" w-full bg-secondary py-6 px-5 ">
            <p className=" flex justify-center  text-gray-400 text-xs font-bold opacity-75">© 2023 Copyright Tríade Barbearia  
            
            <a className="ml-2" href="https://api.whatsapp.com/send?phone=5511974186292&text=Tríade Barberia em que posso ajudar ? "target="_blank" > <FaWhatsapp className="w-6 h-6" /> </a>
            <a className="ml-2" href="https://www.instagram.com/triade_barbearia/" target="_blank"><FaInstagram className="w-6 h-6"/> </a> 
            <a href="https://www.google.com.br/maps/place/R.+Augusta+Teixeira+Rodrigues,+4044+-+Aglomera%C3%A7%C3%A3o+Urbana+de+Jundia%C3%AD,+Jundia%C3%AD+-+SP,+13212-595/@-23.1433291,-46.9985012,17z/data=!4m5!3m4!1s0x94cf30360fadcd31:0xe5ae82d87526e137!8m2!3d-23.1433262!4d-46.9984766?entry=ttu" target="_blank" ><MapPinIcon className="ml-2" />  </a> 
           </p>
        </footer>
     );
}
 
export default Footer;