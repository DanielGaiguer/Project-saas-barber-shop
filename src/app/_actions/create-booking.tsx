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
  // AuthOption e o o objeto de configuracao do Next Auth
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")

  revalidatePath("/bookings") // VAi recarregar a pagina, de forma com que a pagina em si, do navegador, nao faca reload.
  // Essa funcao do next faz o seguinte, quando ele chama a requisicao HTTPm que e este deletebooking, no retorno dela, esta incluso a nova pagina, sem o componente deletado, ele retorna isso, fazendo a pagina atualizar, sem precisar de fato atualizar no navegador, e sem precisar fazer toda a requisicao do usuario novamente.
  //Ou seja, inves de ter que fazer uma requisicao para deletar, e depois fazer outra requisicao para atualizar os dados, ele ja faz isso em uma ida so, na mesma ida ele deleta a reserva, e pega os dados.
}
