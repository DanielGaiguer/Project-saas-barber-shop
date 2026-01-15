"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings") // VAi recarregar a pagina, de forma com que a pagina em si, do navegador, nao faca reload.
  // Essa funcao do next faz o seguinte, quando ele chama a requisicao HTTPm que e este deletebooking, no retorno dela, esta incluso a nova pagina, sem o componente deletado, ele retorna isso, fazendo a pagina atualizar, sem precisar de fato atualizar no navegador, e sem precisar fazer toda a requisicao do usuario novamente.
  //Ou seja, inves de ter que fazer uma requisicao para deletar, e depois fazer outra requisicao para atualizar os dados, ele ja faz isso em uma ida so, na mesma ida ele deleta a reserva, e pega os dados.
}
