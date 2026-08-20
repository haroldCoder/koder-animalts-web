import { returnNameConsultationType } from "@/common/presentation/utils";
import { MedicalRecordEntity } from "@/features/medical-record/domain/entities";

interface MedicalRecordDetainProps {
    medicalRecord: MedicalRecordEntity;
}

export const MedicalRecordDetail: React.FC<MedicalRecordDetainProps> = ({ medicalRecord }) => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{returnNameConsultationType(medicalRecord.type)}</h3>
                <span className="text-sm text-gray-500">{medicalRecord.date.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500">{medicalRecord.petName}</p>
            <p className="text-sm text-gray-500">{medicalRecord.veterinaryName}</p>
        </div>
    )
}