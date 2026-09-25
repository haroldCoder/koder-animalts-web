import { ScheduleAppointmentFormValues } from "../interfaces";
import { useFormData } from "@/common/presentation/hooks";

export const useScheduleAppointmentForm = () => {

    const defaultValues = {
        petId: "",
        visitDate: undefined,
        reasonForVisit: "",
        type: "",
        notes: "",
        diagnosis: "",
        treatment: ""
    }

    const { form, register, handleSubmit, control, errors } = useFormData<ScheduleAppointmentFormValues>(defaultValues);

    return { form, register, handleSubmit, control, errors };
}