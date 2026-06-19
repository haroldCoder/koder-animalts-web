import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useContext } from "react";
import { OwnerNextAppointments, OwnerPets } from "../components";

export const Home = () => {
    const { user } = useContext(MainLayoutContext)!;

    return (
        <div className="flex flex-col gap-10">
            {user.role === UserRole.owner && <OwnerPets />}
            {user.role === UserRole.owner && <OwnerNextAppointments />}
        </div>
    );
};