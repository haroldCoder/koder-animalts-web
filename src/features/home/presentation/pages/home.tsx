import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useContext } from "react";
import { OwnerPets } from "../components";

export const Home = () => {
    const { user } = useContext(MainLayoutContext)!;

    return (
        <div>
            {user.role === UserRole.owner && <OwnerPets />}
        </div>
    );
};