// Este arquivo ele garante que apenas 1 intancia do prisma client, ira ser instanciada no Next.
// Se voce nao tiver este codigo, a cada recompilação do Next ele vai abrir uma nova conexao com o banco
// Com este arquivo você garante que quando você recompilar esta aplicação, você não vai abrir multiplas conexões com seu banco de dados
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter })
  }
  prisma = global.cachedPrisma
}

export const db = prisma
