"use client"
import BarbershopItem from "@/app/(home)/_components/barbershop-item";
import PartnerItem from "@/app/(home)/_components/partners-item";
import BookingItem from "@/app/_components/booking-item";
import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
// import PartnerItem from "@/app/(home)/_components/partners-item";
// import {Partner} from '@prisma/client'
import { Partner } from "@prisma/client";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

interface ParterAboutProps {
    partner: Partner;
    
    
}
export default async function ({partner}:any) {

    console.log("dglkafkl",partner)
   
  
    const [ partners] = await Promise.all([
        db.partner.findMany({}),
        partner
        ? db.partner.findMany({
            where: {
                id:""
                
            },
            
        })
        : Promise.resolve([]),
    ]);
    console.log("olá sou console",partners.id)
  
    return (


        <>
            {partners.map((partner: Partner) => (
                <>
                <div>{partner.id}</div>
                <div>{partner.name}</div>
                <br/>
                </>
            ))}
          <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {/* {partners.map((partner:any) => (
                <div key={partner.id} className="min-w-[167px] max-w-[167px]">
                <PartnerItem key={partner.id} partner={partner} />
              </div>
            ))} */}
            <div>{partners.id}
            
            ola</div>
          </div>
        </>
        
    )
  }
/*  



//console.log(partner)
export default async function About() {
    


    const session = await getServerSession(authOptions);

const [barbershops, partners, confirmedBookings] = await Promise.all([
  db.barbershop.findMany({}),
  db.partner.findMany({ }),
  session?.user
    ? db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: true,
          barbershop: true,
          
        },
      })
    : Promise.resolve([]),
]);

    return (
    <div>
        
        <h1>Olá</h1>
        <h2>{partner}</h2>
     
    </div>
    
    )
}

*/