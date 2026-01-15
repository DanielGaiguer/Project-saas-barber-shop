/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/app/_lib/prisma"
import { Adapter } from "next-auth/adapters"
import { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Essa funcao e chamada quando chamamos o useSession no frontend, ela retorna o usuario logado
    // Por padrão, o session.user não inclui o id do usuário, apenas name, email e image.
    // Se você quiser fazer chamadas ao seu backend usando useSession() e precisar do user.id para autorizações, relacionamentos ou requisições, você precisa adicioná-lo manualmente.

    // Sem isso, você teria que buscar o usuário no banco sempre que quisesse o ID.
    async session({ session, user }) {
      // Esta pegando o id do usuario que esta no banco, e retornando na useSession
      session.user = {
        ...session.user, // mantém name, email, image
        id: user.id, // adiciona o id do usuário do banco
      } as any
      return session
    },
  },
}
