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
  // como isso e uma rota http, qualquer pessoa pode acessar, desde que ela tenha um Id, e, fazendo isso, mesmo tendo id, a pessoa so consegue acessar se estiver logada
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
}
