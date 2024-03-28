"use client"
import Link from 'next/link';
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {Partner} from '@prisma/client'
import Image from "next/image";
import { useRouter } from "next/navigation";



interface PartnerItemProps {
    partner: Partner;
    
}
const PartnerItem = ({ partner }: PartnerItemProps) => {
    const router = useRouter();
  
    const handleBookingClick = () => {
        router.push(`/about/${partner.id}`);
    };

    return ( 
        <Card className="min-w-full max-w-full rounded-2xl">
            <CardContent className="px-1 py-0 pt-1">
            
            <div className=" w-full h-[159px] relative" >
                <div className="absolute top-2 left-2 z-50">
                <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-3 left-3 ">
                    
                </Badge>
                </div>

            <Image alt={partner.name} src={partner.imageUrl}
            style={{
                objectFit: "cover"
            }}
            fill
            className="rounded-2xl" />
            </div>
            <div className="px-2 pb-3">
                
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{partner.name}</h2>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap" >{partner.address}</p>
            {/* <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick} >Ver mais</Button> */}
              <Link href={`/about/${partner.id}`}>
                     
                            <Button onClick={handleBookingClick}>Ver detalhes</Button>
                       
                    </Link>
            </div>

            

            </CardContent>
        </Card>
     );
     
}

     

export default PartnerItem;