import { AppointmentRequestStatus } from "../../domain";

export const getLabelStatusRequest = (status: AppointmentRequestStatus) => {
    switch (status) {
        case AppointmentRequestStatus.PENDING:
            return "Pendiente";
        case AppointmentRequestStatus.APPROVED:
            return "Aprobado";
        case AppointmentRequestStatus.CANCELLED:
            return "Cancelada";
        case AppointmentRequestStatus.REJECTED:
            return "Rechazada";
        default:
            return "Desconocido";
    }
}