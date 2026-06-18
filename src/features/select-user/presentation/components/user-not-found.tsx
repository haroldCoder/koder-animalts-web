import { Button } from '@/components/ui/button'
import { InfoIcon, LogInIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export const UserNotFound = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-3'>
            <InfoIcon className="size-16 bg-red-500/20 p-5 rounded-lg text-red-500" />
            <h2 className="text-lg font-semibold text-slate-600">Usuario no encontrado</h2>
            <Link to="/auth">
                <Button
                    type="submit"
                    className="h-12 mt-10 rounded-xl bg-mist-700 hover:bg-mist-800 text-white dark:bg-mist-700 dark:hover:bg-mist-800 dark:text-white transition-colors"
                >
                    Iniciar sesión <LogInIcon className="size-4" />
                </Button>
            </Link>
        </div>
    )
}
