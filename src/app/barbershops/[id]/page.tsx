import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // A partir dets include, voce diz para o prisma, incluir dados de outra tabela, tabela services, e ele consegue fazer isso de forma automatica pois tem relacao com a tabela, e definimos isso no esquema do prisma
  // Diz ao Prisma: "Além dos dados do barbershop, traga também os services relacionados"
  // Internamente, o Prisma transforma isso em algo parecido com:
  // SELECT *
  // FROM "Barbershop"
  // LEFT JOIN "Service"
  // ON "Service"."barbershopId" = "Barbershop"."id"
  // WHERE "Barbershop"."id" = 'abc-123';

  // ⚠️ Você não escreve o SQL, mas ele acontece.
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  console.log(barbershop?.services)

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        {/* Botao Voltar */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        {/* Botao Menu */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (499 Avaliações)</p>
        </div>
      </div>

      {/* Descricao */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
