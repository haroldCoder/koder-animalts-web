import { useQuery } from "@tanstack/react-query";
import { HttpClinicRepository } from "../../infrastructure/http";
import { GetAllClinicsUseCase } from "../use-cases";
import { ClinicEntity } from "../../domain/entities";

const clinicRepository = new HttpClinicRepository();
const getAllClinicsUseCase = new GetAllClinicsUseCase(clinicRepository);

export const useGetAllClinics = () => {
    return useQuery<ClinicEntity[], Error>({
        queryKey: ["clinics"],
        queryFn: () => getAllClinicsUseCase.execute(),
    });
};
