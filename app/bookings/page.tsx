import Search from "@/app/(home)/_components/search";
import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BookingItem from "../_components/booking-item";

interface SearchParams {
  page?: string;
  search?: string;
}

const BookingsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const now = new Date();
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const limit = 10;
  const searchQuery = searchParams?.search || "";

  // Consultas separadas para confirmados e finalizados
  const [confirmedBookings, totalConfirmed] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: { gte: now },
        OR: [
          { service: { name: { contains: searchQuery, mode: "insensitive" } } },
          { barbershop: { name: { contains: searchQuery, mode: "insensitive" } } },
        ],
      },
      orderBy: { date: "asc" },
      include: { service: true, barbershop: true },
    }),
    db.booking.count({
      where: {
        userId: (session.user as any).id,
        date: { gte: now },
        OR: [
          { service: { name: { contains: searchQuery, mode: "insensitive" } } },
          { barbershop: { name: { contains: searchQuery, mode: "insensitive" } } },
        ],
      },
    }),
  ]);

  const [finishedBookings, totalFinished] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: { lt: now },
        OR: [
          { service: { name: { contains: searchQuery, mode: "insensitive" } } },
          { barbershop: { name: { contains: searchQuery, mode: "insensitive" } } },
        ],
      },
      orderBy: { date: "asc" },
      include: { service: true, barbershop: true },
    }),
    db.booking.count({
      where: {
        userId: (session.user as any).id,
        date: { lt: now },
        OR: [
          { service: { name: { contains: searchQuery, mode: "insensitive" } } },
          { barbershop: { name: { contains: searchQuery, mode: "insensitive" } } },
        ],
      },
    }),
  ]);

  // Combine confirmed and finished bookings, putting confirmed first
  const allBookings = [...confirmedBookings, ...finishedBookings];
  const totalBookings = totalConfirmed + totalFinished;

  // Paginate combined results
  const paginatedBookings = allBookings.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(totalBookings / limit);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="px-5 mt-6">
          <Search defaultValues={{ search: searchQuery }} />
        </div>

        <h1 className="text-xl font-bold mt-8 mb-6">Agendamentos</h1>

        {paginatedBookings.length > 0 ? (
          <div className="flex flex-col gap-3">
            {paginatedBookings.map((booking: any) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <p>Nenhum agendamento encontrado.</p>
        )}

        <div className="flex justify-between mt-6">
          {page > 1 && (
            <a href={`?page=${page - 1}&search=${searchQuery}`} className="text-blue-500">
              Anterior
            </a>
          )}
          {page < totalPages && (
            <a href={`?page=${page + 1}&search=${searchQuery}`} className="text-blue-500">
              Próxima
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;