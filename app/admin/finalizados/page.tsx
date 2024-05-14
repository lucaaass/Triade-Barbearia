import { getServerSession } from "next-auth";
import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../../_lib/prisma";
import BookingAdmin from "../../_components/booking-admin";
import Search from "../../(home)/_components/search";


const Finalizados = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return redirect("/");
  } 


  const [finishedBookings] = await Promise.all([
   
    db.booking.findMany({
      where: {
        date: {
          lt: new Date(),
        },
      },
      orderBy: {
        date: 'asc' // Ordenar por data crescente
        
      },
      include: {
        service: true,
        barbershop: true,
        user: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
     
      <div className="px-5 py-6">
      <div className="px-5 mt-6">
        <Search />
      </div>  

        <h1 className="text-xl font-bold mb-6">Agendamentos Finalizados</h1>

        

        {finishedBookings.length > 0 && (
          <>
            {/* <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2> */}

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking:any) => (
                <BookingAdmin key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    
    </>
    
  );
  
};

export default Finalizados;