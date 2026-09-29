import { DefaultValues, useForm } from "react-hook-form";

export const useFormData = <T extends Record<string, any>>(data?: DefaultValues<T>) => {
    const form = useForm<T>({
        defaultValues: data
    });

    const { register, handleSubmit, control, formState: { errors } } = form;

    return { form, register, handleSubmit, control, errors };
}