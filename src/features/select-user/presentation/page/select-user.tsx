import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { FormOwner, FormVeterinarian, UserNotFound } from "../components";
import { userTypes } from "../constants";
import { userExistLocalData } from "../utils";
import { useNavigate } from "react-router-dom";
import { useUserAvailable } from "../hooks";
import { useAuth } from "@/common/hooks";
import { Spinner } from "@/components/ui/spinner";
import { User, Stethoscope, CheckCircle2 } from "lucide-react";

export const SelectUser = () => {
    const [userType, setUserType] = useState<"owner" | "veterinary">("owner");
    const [select, setSelect] = useState<boolean>(false);
    const [hasUser, setHasUser] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { user: userId } = useAuth();

    const { userAvailable, loading } = useUserAvailable(userId!);

    const usersTypeRender = useMemo(() => {
        return userTypes.filter((user) => (select ? userType === user.value : true));
    }, [select, userType]);

    useEffect(() => {
        setHasUser(userExistLocalData());
    }, []);

    useEffect(() => {
        if (!loading && !userAvailable && !select) {
            navigate("/home");
        }
    }, [loading, userAvailable, select, navigate]);

    if (!hasUser) {
        return <UserNotFound />;
    }

    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 bg-background">
                <Spinner className="size-8 text-primary" />
                <p className="text-xs text-muted-foreground animate-pulse">Verificando usuario...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/20 dark:bg-background animate-in fade-in duration-300">
            <section className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-card text-card-foreground border border-border/70 rounded-2xl shadow-xl space-y-6">
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Completa tu perfil
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Selecciona tu rol para configurar tu experiencia en la plataforma.
                    </p>
                </div>

                <div className="space-y-6">
                    <Tabs
                        value={userType}
                        onValueChange={(val) => setUserType(val as "owner" | "veterinary")}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/60 dark:bg-muted/30 rounded-xl">
                            {usersTypeRender.map((type) => (
                                <TabsTrigger
                                    key={type.value}
                                    value={type.value}
                                    disabled={select}
                                    className="gap-2 rounded-lg text-sm font-medium py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                                >
                                    {type.value === "owner" ? (
                                        <User className="size-4" />
                                    ) : (
                                        <Stethoscope className="size-4" />
                                    )}
                                    {type.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    {!select ? (
                        userType === "owner" ? (
                            <FormOwner setSelect={setSelect} />
                        ) : (
                            <FormVeterinarian setSelect={setSelect} />
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2 animate-in fade-in zoom-in-95">
                            <div className="p-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">
                                <CheckCircle2 className="size-5" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                Información guardada con éxito
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Tu rol ha sido configurado. Ya puedes ingresar al inicio.
                            </p>
                        </div>
                    )}

                    <Button
                        disabled={!select}
                        className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => {
                            navigate("/home");
                        }}
                    >
                        Continuar al inicio
                    </Button>
                </div>
            </section>
        </div>
    );
};
