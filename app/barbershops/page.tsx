import { redirect } from "next/navigation";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
 import Search from "../(home)/_components/search";
import BookingAdmin from "../_components/booking-admin";


interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }
  

  const bookings = await db.booking.findMany({
    where: {
      OR: [
        {
          user: {
            name: {
              contains: searchParams.search,
              mode: "insensitive"
            }
          }
        },
        {
          service: {
            name: {
              contains: searchParams.search,
              mode: "insensitive"
            }
          }
        },
     

      ]
    },
    include:{
      service: true,
      user: true,
      barbershop:true,
   
    }
  })

  return (
    <>
       <Header />

       <div className="px-5 py-6 flex flex-col gap-6">
         <Search
           defaultValues={{
             search: searchParams.search,
          }}
         />

         <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>

        <div className="grid grid-cols-2 gap-4">
           {bookings.map((booking:any) => (
             <div key={booking.id} className="w-full">
               <BookingAdmin booking={booking}  />
             </div>
          ))}
        </div>
     </div>
    </>
  );
};

export default BarbershopsPage;