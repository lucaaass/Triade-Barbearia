import Header from "@/app/_components/header";
import { db } from "@/app/_lib/prisma";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const About = async ({ params }: { params: { id: string } }) => {
  const [partner] = await Promise.all([
    db.partner.findMany({
      where: {
        id: params.id,
      },
    }),
  ]);

  console.log("testando id", partner);

  return (
    <>
      <Header />
      <div className="flex justify-center px-5">
        {partner.map((partner: any) => (
          <div key={partner.id} className="min-w-[88vw] max-w-[88vw]">
            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
              <div className=" w-full h-[159px] relative">
                <Image
                  alt={partner.name}
                  src={partner.imageUrl}
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                  className="rounded-2xl"
                />
              </div>
             <div> <h1 className="text-xl  font-bold">{partner.name}</h1></div>

             <div  className=" flex  text-xs font-bold opacity-75">
             <a className="ml-2  --popover-foreground" href="https://api.whatsapp.com/send?phone=5511974186292&text=Tríade Barberia em que posso ajudar ? "target="_blank " > <FaWhatsapp className="w-6 h-6 "  style={{ color: 'green' }} /> {partner.tel}</a>
            <a className="ml-2" href="https://www.instagram.com/triade_barbearia/" target="_blank"><FaInstagram className="w-6 h-6 " style={{ color: 'orange' }} />{partner.insta} </a> 
            <a href="https://www.google.com.br/maps/place/R.+Augusta+Teixeira+Rodrigues,+4044+-+Aglomera%C3%A7%C3%A3o+Urbana+de+Jundia%C3%AD,+Jundia%C3%AD+-+SP,+13212-595/@-23.1433291,-46.9985012,17z/data=!4m5!3m4!1s0x94cf30360fadcd31:0xe5ae82d87526e137!8m2!3d-23.1433262!4d-46.9984766?entry=ttu" target="_blank" ><MapPinIcon className="ml-2" style={{ color: 'purple' }} /> {partner.address} </a> 
           
             </div>
             
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
