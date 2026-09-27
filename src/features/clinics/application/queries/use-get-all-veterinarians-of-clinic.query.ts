import { useQuery } from "@tanstack/react-query";
import { HttpClinicRepository } from "../../infrastructure/http";
import { GetAllVeterinariansOfClinicUseCase } from "../use-cases";
import { VeterinarianEntity } from "../../domain/entities";

const clinicRepository = new HttpClinicRepository();
const getAllVeterinariansOfClinicUseCase = new GetAllVeterinariansOfClinicUseCase(clinicRepository);

export const useGetAllVeterinariansOfClinic = (clinicId: string) => {
    return useQuery<VeterinarianEntity[], Error>({
        queryKey: ["veterinarians", clinicId],
        queryFn: () => getAllVeterinariansOfClinicUseCase.execute(clinicId),
        enabled: Boolean(clinicId),
    });
};
