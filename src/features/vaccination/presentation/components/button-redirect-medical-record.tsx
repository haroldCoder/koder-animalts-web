import { Button } from "@/components/ui/button"
import { routes } from "@/common/presentation/constants"
import { useNavigate } from "react-router-dom"

export const ButtonRedirectMedicalRecord = ({ medicalRecordId }: { medicalRecordId: string }) => {
    const navigate = useNavigate();
    const goToMedicalRecord = (medicalRecordId: string) => {
        navigate(`${routes.medicalRecord.link}/${medicalRecordId}`);
    }

    return (
        <Button onClick={() => goToMedicalRecord(medicalRecordId)} className={"bg-bg-dark-1 text-text-3 px-4 py-3 cursor-pointer"}>Ver historial</Button>
    )
}
