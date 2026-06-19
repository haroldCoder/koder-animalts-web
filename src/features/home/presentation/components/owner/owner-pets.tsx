import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { petsMockData } from "@/features/pet/presentation/data"
import { Plus } from "lucide-react"
import { PetCard } from "../pet-card"

export const OwnerPets = () => {
    return (
        <section>
            <div className="flex gap-4 items-center">
                <h2 className="text-2xl font-bold text-text-2">Tus mascotas</h2>
                <Button className="cursor-pointer flex items-center gap-3 bg-bg-2 hover:bg-bg-3 text-text-2 transition-colors">
                    <Plus className="rounded-full bg-main text-white" />
                    Agregar
                </Button>
            </div>
            <div className="mt-6 px-4 mx-14">
                <Carousel opts={{
                    align: "start",
                }}
                    className="w-full sm:max-w-xs md:max-w-5xl">
                    <CarouselContent>
                        {
                            petsMockData.map(pet => (
                                <CarouselItem className="basis-1/2 lg:basis-1/3" key={pet.id}>
                                    <PetCard pet={pet} />
                                </CarouselItem>
                            ))
                        }

                    </CarouselContent>
                    <CarouselPrevious className="bg-bg-dark-2 text-text-3 p-4 hover:bg-bg-dark-3 cursor-pointer" />
                    <CarouselNext className="bg-bg-dark-2 text-text-3 p-4 hover:bg-bg-dark-3 cursor-pointer" />
                </Carousel>
            </div>
        </section>
    )
}
