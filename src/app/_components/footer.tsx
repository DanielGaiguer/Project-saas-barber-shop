import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="px-5 py-6">
        <CardContent>
          <p className="text-sm text-gray-400">
            © 2025 Copyright <span className="font-bold">Daniel Gaiguer</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
