import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CardRegistroPontoProps } from './interfaces'

export function CardRegistroPonto({
  cardTitle,
  cardContent,
  cardFooter,
}: CardRegistroPontoProps) {
  return (
    // <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
    <Card
      className="w-auto h-auto place-content-center rounded-[30px]
              min-h-[250px]
              min-w-[370px]
              sm:h-[300px]
              sm:w-[500px]
              sm:px-10
              lg:w-[800px]
              lg:h-[500px]"
    >
      <CardHeader className="items-center">
        <CardTitle className="text-2xl md:text-4x1 sm:text-3xl lg:text-4xl">
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
      <CardFooter className="flex justify-center">{cardFooter}</CardFooter>
    </Card>
  )
}
