import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Login = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <div className='flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <div className="space-y-1">
                    <Input className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all" type="email" placeholder="Correo electrónico" />
                </div>
                <div className="space-y-1">
                    <Input className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all" type="password" placeholder="Contraseña" />
                </div>
                <div className="flex justify-end">
                    <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 transition-colors">¿Olvidaste tu contraseña?</a>
                </div>
                <Button className="h-12 mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transition-all duration-300 text-base font-semibold">
                    Iniciar Sesión
                </Button>
            </form>
        </div>
    )
}
