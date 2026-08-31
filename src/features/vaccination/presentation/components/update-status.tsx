import { useContext, useMemo } from 'react'
import { useUpdateStatusVaccination } from '../../application/mutations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStatusLabel } from '../utils';
import { VaccinationStatus } from '../../domain/enums';
import { UserRole } from '@/features/user';
import { toast } from 'sonner';
import { MainLayoutContext } from '@/common/presentation/layout';
import { HttpException } from '@/common';
import { getMessageError } from '@/common/errors';

interface UpdateStatusProps {
    id: string
    currentStatus: VaccinationStatus
}

export const UpdateStatus = ({ id, currentStatus }: UpdateStatusProps) => {
    const { mutate, isPending } = useUpdateStatusVaccination();
    const { user: userSession } = useContext(MainLayoutContext)!;

    const statusesOptions = useMemo(() => {
        const { label: labelPending, color: colorPending } = getStatusLabel(VaccinationStatus.PENDING);
        const { label: labelDone, color: colorDone } = getStatusLabel(VaccinationStatus.DONE);
        const { label: labelCancelled, color: colorCancelled } = getStatusLabel(VaccinationStatus.CANCELLED);

        return [
            { label: labelPending, value: VaccinationStatus.PENDING, color: colorPending },
            { label: labelDone, value: VaccinationStatus.DONE, color: colorDone },
            { label: labelCancelled, value: VaccinationStatus.CANCELLED, color: colorCancelled },
        ]
    }, []);

    const onChange = (value: VaccinationStatus | null) => {
        if (!value) return;
        mutate({
            id,
            status: value,
            userRole: userSession.role
        }, {
            onSuccess: () => {
                toast.success("Estado actualizado exitosamente")
            },
            onError: (err) => {
                toast.error(getMessageError(err));
            }
        })
    }

    return (
        <Select
            value={currentStatus}
            items={statusesOptions}
            disabled={isPending || currentStatus === VaccinationStatus.DONE}
            onValueChange={onChange}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {statusesOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                        <span className={`${status.color} px-3 py-1 rounded-full text-xs font-bold`}>{status.label}</span>
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
    )
}
