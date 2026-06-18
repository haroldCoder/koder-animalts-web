import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLoginUser } from '@/features/auth/application/queries'
import { HttpException } from '@/common'
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending, error } = useLoginUser();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: any) => {
        mutateAsync(data).then(() => {
            navigate('/select-user');
        })
    }

    return (
        <div className='flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
                <div className="space-y-1">
                    <Input
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Dirección de correo electrónico inválida'
                            }
                        })}
                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                        type="email"
                        placeholder="Correo electrónico"
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500 px-1">{errors.email.message}</span>
                    )}
                </div>

                <div className="space-y-1">
                    <Input
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}
                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                        type="password"
                        placeholder="Contraseña"
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500 px-1">{errors.password.message}</span>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-center animate-in fade-in duration-300">
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                            {error instanceof HttpException
                                ? (error.payload?.message || error.message)
                                : error.message}
                        </p>
                    </div>
                )}

                <div className="flex justify-end">
                    <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 transition-colors">¿Olvidaste tu contraseña?</a>
                </div>

                <Button
                    disabled={isPending}
                    type="submit"
                    className="h-12 mt-2 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transition-all duration-300 text-base font-semibold"
                >
                    {isPending ? <Spinner className="size-4 text-white" /> : 'Iniciar Sesión'}
                </Button>
            </form>
        </div>
    )
}

