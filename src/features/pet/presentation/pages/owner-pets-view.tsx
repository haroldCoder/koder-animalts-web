import { useAuth } from "@/common/hooks"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetPetsByOwnerUserId } from "../../application/queries";
import { CardMainPet } from "../components";
import { Error, Loading } from "@/common/presentation/components";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/common/presentation/constants";

export const OwnerPetsView = () => {
    const { user } = useAuth();
    const { data, isLoading, error } = useGetPetsByOwnerUserId(user!);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error message="Error al cargar mascotas" />;
    }

    return (
        <div className="flex flex-col gap-4 h-screen">
            <div className="flex justify-end">
                <Link to={`/home${routes.createPet.path}`}>
                    <Button className="cursor-pointer flex gap-3 px-8 py-6">
                        Agregar Mascota
                        <PawPrint className="text-main" />
                    </Button>
                </Link>
            </div>
            <ScrollArea className="border rounded-xl">
                <div className="flex flex-wrap gap-8 p-4">
                    {data?.map((pet) => (
                        <CardMainPet key={pet.id} pet={pet} />
                    ))}
                </div>
            </ScrollArea>

        </div>
    )
}
