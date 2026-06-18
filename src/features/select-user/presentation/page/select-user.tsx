
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { FormOwner, FormVeterinarian, UserNotFound } from "../components";
import { userTypes } from "../constants";
import { userExistLocalData } from "../utils";
import { useNavigate } from "react-router-dom";

export const SelectUser = () => {
    const [userType, setUserType] = useState<"owner" | "veterinary">("owner");
    const [select, setSelect] = useState<boolean>(false);
    const [hasUser, setHasUser] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const usersTypeRender = useMemo(() => {
        return userTypes.filter((user) => select ? userType == user.value : true);
    }, [select, userType]);

    useEffect(() => {
        setHasUser(userExistLocalData());
    }, []);

    if (!hasUser) {
        return <UserNotFound />;
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <section className="w-1/2 p-5 bg-mist-300 rounded-2xl">
                <div className="w-full">
                    <h2 className="text-xl font-bold text-left">Selecciona un usuario</h2>
                </div>
                <div className="w-full flex flex-col mt-5">
                    <Tabs defaultValue="login" className="w-full flex justify-center items-center">
                        <TabsList className="w-1/2 p-1 bg-slate-400 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl mb-8">
                            {
                                usersTypeRender.map((userType) => (
                                    <TabsTrigger
                                        key={userType.value}
                                        onClick={() => setUserType(userType.value as "owner" | "veterinary")}
                                        value={userType.value}
                                        className="rounded-lg text-sm font-medium transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 py-2.5"
                                    >
                                        {userType.label}
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList>
                    </Tabs>

                    {
                        !select && (
                            userType === "owner" ? (
                                <FormOwner setSelect={setSelect} />
                            ) : (
                                <FormVeterinarian setSelect={setSelect} />
                            ))
                    }

                    <Button
                        className="w-full h-12 mt-7 rounded-xl bg-mist-700 hover:bg-mist-800 text-white dark:bg-mist-700 dark:hover:bg-mist-800 dark:text-white transition-colors"
                        onClick={() => {
                            navigate("/home")
                        }}
                    >Continuar</Button>
                </div>
            </section>
        </div>
    )
}
