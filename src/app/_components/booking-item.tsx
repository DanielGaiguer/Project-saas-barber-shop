import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"

interface BookingItemProps {
  // Esta e a sintaxe para o Prisma entender que este agendamento, tambem vai ter o servico incluido? Lembrando que no schema do db, ele ja tem relacao, isso e obrigatorio
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        } //Agora, alem de booking tem service, service vai ter barbershop, tambem esta no schema
      }
    }
  }>
  // Agora este booking vai ter o service
}

// ToDo receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">{booking.service.name}</h3>
            <div className="itens-center flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>
          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Janeiro</p>
            <p className="text-2xl">10</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
