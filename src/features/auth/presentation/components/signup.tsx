import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSignupUsers } from "@/features/auth/application/queries";
import { useForm, Controller } from "react-hook-form";
import { HttpException } from "@/common";
import { Spinner } from "@/components/ui/spinner";

type RegisterForm = {
    email: string
    password: string
    passwordConfirm: string,
    name: string
    image: File | null
}

export const SignUp = () => {
    const { mutate, isPending, error } = useSignupUsers();
    const { register, handleSubmit, getValues, control, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            image: null
        }
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = (data: RegisterForm) => {
        mutate(data);
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

                {/* File upload zone */}
                <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'La imagen de perfil es requerida' }}
                    render={({ field }) => (
                        <div className="space-y-1">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) {
                                        field.onChange(file);
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                                className={[
                                    'relative flex items-center gap-4 w-full h-20 px-4',
                                    'rounded-xl border-2 border-dashed cursor-pointer',
                                    'transition-all duration-200 group overflow-hidden',
                                    isDragging
                                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/20 scale-[1.01]'
                                        : preview
                                            ? 'border-orange-300 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/10'
                                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/10',
                                    errors.image ? 'border-red-400 bg-red-50 dark:bg-red-950/10' : '',
                                ].join(' ')}
                            >
                                {/* Thumbnail o ícono */}
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="h-12 w-12 rounded-lg object-cover shrink-0 ring-2 ring-orange-200 dark:ring-orange-800"
                                    />
                                ) : (
                                    <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                                        <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                )}

                                {/* Texto */}
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-sm font-medium truncate ${preview ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-orange-500 transition-colors'}`}>
                                        {preview ? (field.value as File)?.name : 'Foto de perfil'}
                                    </span>
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        {preview ? 'Haz clic para cambiar' : 'Arrastra o haz clic · PNG, JPG'}
                                    </span>
                                </div>

                                {/* Botón limpiar */}
                                {preview && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            field.onChange(null);
                                            setPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="ml-auto shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}

                                {/* Input nativo oculto */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            field.onChange(file);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>
                            {errors.image && (
                                <span className="text-xs text-red-500 px-1">{errors.image.message}</span>
                            )}
                        </div>
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
                    className="h-12 mt-2 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transition-all duration-300 text-base font-semibold"
                >
                    {isPending ? <Spinner className="size-4 text-white" /> : 'Crear Cuenta'}
                </Button>
            </form>
        </div>
    )
}
