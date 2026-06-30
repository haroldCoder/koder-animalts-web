import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Plus } from "lucide-react"
import { PetCard } from "../pet-card"
import { useAuth } from "@/common/hooks"
import { useGetPetsByOwnerUserId } from "@/features/pet/application/queries"
import { useMemo } from "react"
import { Error, Loading } from "@/common/presentation/components"
import { useNavigate } from "react-router-dom"
import { routes } from "@/common/presentation/constants"

export const OwnerPets = () => {
    const { user } = useAuth();

    const { data, isLoading, error } = useGetPetsByOwnerUserId(user!);
    const navigation = useNavigate();

    const petsData = useMemo(() => {
        return data;
    }, [data]);

    const goToCreatePet = () => {
        navigation(`${routes.createPet.link}`);
    }

    return (
        <section>
            <div className="flex gap-4 items-center">
                <h2 className="text-2xl font-bold text-text-2">Tus mascotas</h2>
                <Button onClick={goToCreatePet} className="cursor-pointer flex items-center gap-3 bg-bg-2 hover:bg-bg-3 text-text-2 transition-colors">
                    <Plus className="rounded-full bg-main text-white" />
                    Agregar
                </Button>
            </div>
            {
                petsData?.length === 0 ? (
                    <div className="flex items-center justify-center mt-6">
                        <p className="text-lg text-center font-medium text-green-600">No tienes mascotas registradas</p>
                    </div>
                ) : error ? (
                    <Error message="No se pudieron cargar las mascotas" />
                ) : isLoading ? (
                    <Loading />
                ) : (
                    <div className="mt-6 px-4 mx-14">
                        <Carousel opts={{
                            align: "start",
                        }}
                            className="w-full sm:max-w-xs md:max-w-5xl">
                            <CarouselContent>
                                {
                                    petsData?.map(pet => (
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
                )
            }
        </section>
    )
}
