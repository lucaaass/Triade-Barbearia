import Header from "@/app/_components/header";
import { db } from "@/app/_lib/prisma";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

type AboutProps = {
  params: {
    id: string;
  };
};

const About = async ({ params }: AboutProps) => {
  const partner = await db.partner.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!partner) {
    return <p>Parceiro não encontrado</p>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-5 py-5 md:px-10 md:py-10">
        <div className="w-full max-w-4xl">
          <div className="relative w-full h-[200px] md:h-[300px] mb-5">
            <Image
              alt={partner.name}
              src={partner.imageUrl}
              style={{ objectFit: "cover" }}
              fill
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">{partner.name}</h1>
          <div className="space-y-4 font-bold">
            <a
              className="flex items-center space-x-2"
              href={`https://api.whatsapp.com/send?phone=${partner.tel}&text=Tríade Barberia em que posso ajudar ?`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-6 h-6" style={{ color: "green" }} />
              <span>{partner.tel}</span>
            </a>
            <a
              className="flex items-center space-x-2"
              href={`https://www.instagram.com/${partner.insta}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" style={{ color: "orange" }} />
              <span>{partner.insta}</span>
            </a>
            <a
              className="flex items-center space-x-2"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPinIcon className="w-6 h-6" style={{ color: "purple" }} />
              <span>{partner.address}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
