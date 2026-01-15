/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const Bookings = async () => {
  // AuthOption e o o objeto de configuracao do Next Auth
  const session = await getServerSession(authOptions)
  if (!session) {
    //ToDo Mostrar pop-up de Login
    return notFound()
  }
  const bookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
    },
    include: {
      service: {
        // Isso vai incluir todos os dados do servico
        include: {
          //isso vai fazer o servico, incluir todos os dados da barbearia
          barbershop: true,
        },
      },
    }, //Tudo isso ja esta bem relacionado no banco de dados, isso e essencial para realizar isso
  })
  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="space-y-3 p-5">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
