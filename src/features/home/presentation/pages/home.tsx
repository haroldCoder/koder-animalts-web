import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useContext } from "react";
import { OwnerNextAppointments, OwnerPets, AppointmentNotice, AppointmentLastVisit, AppointmentNoticeVet, SearchPet, AppointmentLastVisitVet, SummaryClinic } from "../components";

export const Home = () => {
    const { user } = useContext(MainLayoutContext)!;

    return (
        <div className="flex flex-col gap-10">
            {user.role === UserRole.owner && <AppointmentNotice />}
            {user.role === UserRole.owner && <OwnerPets />}
            {user.role === UserRole.owner && <OwnerNextAppointments />}
            {user.role === UserRole.owner && <AppointmentLastVisit />}
            {user.role === UserRole.veterinary && <AppointmentNoticeVet />}
            {user.role === UserRole.veterinary && <SearchPet />}
            {user.role === UserRole.veterinary && <AppointmentLastVisitVet />}
            {user.role === UserRole.veterinary && <SummaryClinic />}
        </div>
    );
};