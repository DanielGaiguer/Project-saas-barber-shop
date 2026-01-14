"use server"
import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = ({ date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        // vai retornar os agendamentos que sao do mesmo dia que receber em date
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
