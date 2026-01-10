import { Input } from "./_components/ui/input"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"

const Home = () => {
  return (
    <div>
      {/*Header*/}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Daniel</h2>
        <p>Sabado, 10/01/2026</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
