"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  return db.booking.findMany({
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
}
