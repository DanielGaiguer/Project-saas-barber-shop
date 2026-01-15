/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface createBookingParams {
  serviceId: string
  date: Date
}

// Isso e traduzido em rota http pelo Next
export const createBooking = async (params: createBookingParams) => {
  // Essa funcao vai retornar a sessao, o usuario logado
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
}
