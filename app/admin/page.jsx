import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingAdmin from "../_components/booking-admin";


const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">Confirmados</h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingAdmin key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingAdmin key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
    
  );
  
};

export default Admin;