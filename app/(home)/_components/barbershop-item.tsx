"use client"
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {Barbershop} from '@prisma/client'
import Image from "next/image";
import { useRouter } from "next/navigation";


interface BarbershopItemProps {
    barbershop: Barbershop;
    
}
const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    const router = useRouter();
  
    const handleBookingClick = () => {
      router.push(`/barbershops/${barbershop.id}`);
    };

    return ( 
        <Card className="min-w-full max-w-full rounded-2xl ">
            <CardContent className="px-1 py-0 pt-1 ">
            
            <div className=" w-full h-[159px] relative" >

            <Image alt={barbershop.name} src={barbershop.imageUrl}
            style={{
                objectFit: "cover"
            }}
            fill
            className="rounded-2xl" />
            </div>

            <div className="px-2 pb-3">
                
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap ">{barbershop.name}</h2>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap" >{barbershop.address}</p>
            <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick} >Reservar</Button>
            </div>

            

            </CardContent>
        </Card>
     );
}
 
export default BarbershopItem;