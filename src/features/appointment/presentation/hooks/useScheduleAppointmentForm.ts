import { useForm } from "react-hook-form";
import { ScheduleAppointmentFormValues } from "../interfaces";

export const useScheduleAppointmentForm = () => {

    const form = useForm<ScheduleAppointmentFormValues>({
        defaultValues: {
            petId: "",
            visitDate: undefined,
            reasonForVisit: "",
            type: "",
            notes: "",
            diagnosis: "",
            treatment: ""
        }
    });

    const { register, handleSubmit, control, formState: { errors } } = form;

    return { form, register, handleSubmit, control, errors };
}