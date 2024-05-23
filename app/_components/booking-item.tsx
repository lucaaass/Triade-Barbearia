"use client"
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="py-6 md:py-8 px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Avatar className="h-14 w-14 md:h-16 md:w-16">
            <AvatarImage src={booking.barbershop.imageUrl} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{booking.service.name}</h2>
            <h3 className="text-sm md:text-base">{booking.barbershop.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Badge variant={isBookingConfirmed ? "default" : "secondary"}>
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Button disabled={!isBookingConfirmed || isDeleteLoading} onClick={handleCancelClick}>
            {isDeleteLoading ? "Cancelando..." : "Cancelar"}
          </Button>
        </div>
      </CardContent>
      <CardContent className="px-6 md:px-8 pt-4 pb-6 md:py-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Serviço</h3>
            <p>{booking.service.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Data</h3>
            <p>{format(booking.date, "dd 'de' MMMM", { locale: ptBR })}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Horário</h3>
            <p>{format(booking.date, "HH:mm")}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Barbearia</h3>
            <p>{booking.barbershop.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Preço</h3>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(booking.service.price))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
