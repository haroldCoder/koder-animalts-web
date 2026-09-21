import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FilePlusCorner } from "lucide-react";
import { MedicalRecordForm } from "./medical-record-form";
import { RegisterMedicalRecord } from "../interfaces";

interface ButtonRegisterHistoryProps extends RegisterMedicalRecord { };

export const ButtonRegisterHistory: React.FC<ButtonRegisterHistoryProps> = ({ veterinarianId, reason, visitDate, petId, notes }) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <Dialog>
                    <DialogTrigger>
                        <button
                            onClick={() => { }}
                            className="w-full rounded-md cursor-pointer bg-black px-4 py-2 text-white hover:bg-main transition-colors text-sm font-semibold"
                        >
                            <FilePlusCorner size={16} />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <MedicalRecordForm
                            visitDate={visitDate}
                            petId={petId}
                            reason={reason}
                            veterinarianId={veterinarianId}
                            notes={notes}
                        />
                    </DialogContent>
                </Dialog>
            </TooltipTrigger>
            <TooltipContent>
                <p>Registrar Historial</p>
            </TooltipContent>
        </Tooltip>
    );
}