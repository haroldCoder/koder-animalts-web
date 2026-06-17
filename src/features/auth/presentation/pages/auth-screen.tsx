import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Login } from "../components/login";
import { SignUp } from "../components/signup";


export const AuthScreen = () => {
    const [view, setView] = useState<"login" | "register">("login");

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="w-full max-w-[480px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-2xl rounded-[2rem] p-6 sm:p-8 transition-all duration-500 hover:shadow-orange-500/10">
                
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Bienvenido</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Ingresa a tu cuenta para continuar o regístrate si eres nuevo.</p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl mb-8">
                        <TabsTrigger 
                            onClick={() => setView("login")} 
                            value="login"
                            className="rounded-lg text-sm font-medium transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm py-2.5"
                        >
                            Iniciar Sesión
                        </TabsTrigger>
                        <TabsTrigger 
                            onClick={() => setView("register")} 
                            value="register"
                            className="rounded-lg text-sm font-medium transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm py-2.5"
                        >
                            Registro
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-2xl animate-pulse pointer-events-none" />
                    <div className="relative z-10">
                        {view === "login" ? <Login /> : <SignUp />}
                    </div>
                </div>
            </div>
        </div>
    )
}
