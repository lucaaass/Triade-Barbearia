import Search from "@/app/(home)/_components/search";
import BookingAdmin from "@/app/_components/booking-admin";
import Header from "@/app/_components/header";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"


// Função para renderizar a página Confirmados

const Confirmados = async ({ searchParams }) => {
  // Obtém a sessão do usuário
  const session = await getServerSession(authOptions);

  // Redireciona se o usuário não estiver autenticado
  if (!session?.user) {
    return redirect("/");
  }

  // Parâmetros para paginação
  const now = new Date();
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const limit = 10; // Define o número de itens por página
  const offset = (page - 1) * limit;

  // Critérios de busca
  const searchQuery = searchParams?.search || ""; // Obtém o termo de busca da URL

  // Busca os agendamentos confirmados e a contagem total com base nos critérios de busca
  const [confirmedBookings, totalBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        date: {
          gt: now,
        },
        // Aplica o critério de busca
        OR: [
          {
            service: {
              name: {
                contains: searchQuery, // Procura pelo nome do serviço
              },
            },
          },
          {
            barbershop: {
              name: {
                contains: searchQuery, // Procura pelo nome do barbershop
              },
            },
          },
          // Adicione mais critérios de busca conforme necessário
        ],
      },
      orderBy: {
        date: "asc",
      },
      include: {
        service: true,
        barbershop: true,
        user: true,
      },
      skip: offset,
      take: limit,
    }),
    db.booking.count({
      where: {
        date: {
          gt: now,
        },
        // Aplica o critério de busca para contar o total
        OR: [
          {
            service: {
              name: {
                contains: searchQuery, // Procura pelo nome do serviço
              },
            },
          },
          {
            barbershop: {
              name: {
                contains: searchQuery, // Procura pelo nome do barbershop
              },
            },
          },
          // Adicione mais critérios de busca conforme necessário
        ],
      },
    }),
  ]);

  const totalPages = Math.ceil(totalBookings / limit);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="px-5 mt-6">
          {/* Passa os parâmetros de busca para o componente de busca */}
          <Search defaultValues={{ search: searchQuery }} />
        </div>

        <h1 className="text-xl font-bold mt-8 mb-6">Agendamentos Confirmados</h1>

        {confirmedBookings.length > 0 ? (
          <div className="flex flex-col gap-3">
            {confirmedBookings.map((booking:any) => (
              <BookingAdmin key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <p>Nenhum agendamento confirmado encontrado.</p>
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

export default Confirmados;
