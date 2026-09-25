import { useFormData } from "@/common/presentation/hooks";
import { RequestAppointmentFormValues } from "../interfaces"

export const useRequestAppointment = () => {
    const defaultValues: RequestAppointmentFormValues = {
        petId: "",
        date: "",
        reason: "",
        clinicId: "",
        VeterinarianId: ""
    }

    const { form, register, handleSubmit, control, errors } = useFormData<RequestAppointmentFormValues>(defaultValues);

    return { form, register, handleSubmit, control, errors };
}