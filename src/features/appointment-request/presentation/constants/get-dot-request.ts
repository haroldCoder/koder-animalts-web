import { AppointmentRequestStatus } from "../../domain";

export const getStatusDot = (status: AppointmentRequestStatus) => {
    switch (status) {
        case AppointmentRequestStatus.PENDING:
            return "bg-yellow-500";
        case AppointmentRequestStatus.APPROVED:
            return "bg-green-500";
        case AppointmentRequestStatus.CANCELLED:
            return "bg-red-500";
        case AppointmentRequestStatus.REJECTED:
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
}