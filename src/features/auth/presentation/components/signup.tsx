import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSignupUsers } from "@/features/auth/application/queries";
import { useForm, Controller } from "react-hook-form";
import { HttpException } from "@/common";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { SignupImageField } from "./signup-image-field";

type RegisterForm = {
    email: string
    password: string
    passwordConfirm: string,
    name: string
    image: File | null
}

export const SignUp = () => {
    const { mutateAsync, isPending, error } = useSignupUsers();
    const { register, handleSubmit, getValues, control, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            image: null
        }
    });
    const navigate = useNavigate();

    const onSubmit = (data: RegisterForm) => {
        mutateAsync(data).then(() => {
            navigate('/select-user');
        })
    }

    return (
        <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">

                {/* Nombre */}
                <div className="space-y-1">
                    <Input
                        {...register('name', {
                            required: 'El nombre es requerido',
                            minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
                        })}
                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                        type="text"
                        placeholder="Nombre completo"
                    />
                    {errors.name && <span className="text-xs text-red-500 px-1">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <Input
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Dirección de correo electrónico inválida' }
                        })}
                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                        type="email"
                        placeholder="Correo electrónico"
                    />
                    {errors.email && <span className="text-xs text-red-500 px-1">{errors.email.message}</span>}
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Input
                            {...register('password', {
                                required: 'La contraseña es requerida',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                            type="password"
                            placeholder="Contraseña"
                        />
                        {errors.password && <span className="text-xs text-red-500 px-1">{errors.password.message}</span>}
                    </div>
                    <div className="space-y-1">
                        <Input
                            type="password"
                            {...register("passwordConfirm", {
                                required: 'La contraseña es requerida',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                                validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden'
                            })}
                            className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 rounded-xl transition-all"
                            placeholder="Confirmar"
                        />
                        {errors.passwordConfirm && <span className="text-xs text-red-500 px-1">{errors.passwordConfirm.message}</span>}
                    </div>
                </div>

                {/* Profile Image (File upload & Camera) */}
                <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'La imagen de perfil es requerida' }}
                    render={({ field }) => (
                        <SignupImageField
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.image?.message}
                        />
                    )}
                />

                {/* Error global */}
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-center animate-in fade-in duration-300">
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                            {error instanceof HttpException
                                ? (error.payload?.message || error.message)
                                : error.message}
                        </p>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-12 mt-2 w-full cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transition-all duration-300 text-base font-semibold"
                >
                    {isPending ? <Spinner className="size-4 text-white" /> : 'Crear Cuenta'}
                </Button>
            </form>
        </div>
    )
}
