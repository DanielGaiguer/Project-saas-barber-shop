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
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(), // Se for maior que a data atual
      },
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
    orderBy: {
      date: "asc", // Vai ordenar as datas de forma crescente
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lte: new Date(), // Se for menor que a data atual
      },
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
    orderBy: {
      date: "asc", // Vai ordenar as datas de forma crescente
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="space-y-3 p-5">
          {confirmedBookings.length > 0 && (
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
          )}
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}

          {concludedBookings.length > 0 && (
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
          )}
          {concludedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
