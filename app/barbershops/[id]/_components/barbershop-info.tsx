"use client";

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/");
  };

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 absolute top-4 left-4">
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
        <a href="https://www.google.com.br/maps/place/R.+Augusta+Teixeira+Rodrigues,+4044+-+Aglomera%C3%A7%C3%A3o+Urbana+de+Jundia%C3%AD,+Jundia%C3%AD+-+SP,+13212-595/@-23.1433291,-46.9985012,17z/data=!4m5!3m4!1s0x94cf30360fadcd31:0xe5ae82d87526e137!8m2!3d-23.1433262!4d-46.9984766?entry=ttu" target="_blank" >  <MapPinIcon className="text-primary" size={18} />  </a> 
        
          <p className="text-sm">{barbershop.address}</p>
        </div>
        
      </div>
    </div>
  );
};

export default BarbershopInfo;