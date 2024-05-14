import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import PartnerItem from "./_components/partners-item";

export default async function Home() {
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
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

    
      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking:any) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Fazer um agendamento</h2>

        <div className="flex justify-center px-5">
          {barbershops.map((barbershop:any) => (
            <div key={barbershop.id} className="min-w-[88vw] max-w-[88vw]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
            
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Meus parceiros</h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {partners.map((partner:any) => (
            <div key={partner.id} className="min-w-[167px] max-w-[167px]">
              <PartnerItem key={partner.id} partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
