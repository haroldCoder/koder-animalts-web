import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FilePlusCorner } from "lucide-react";
import { MedicalRecordForm } from "./medical-record-form";
import { RegisterMedicalRecord } from "../interfaces";
import { toast } from "sonner";
import { useState } from "react";

export const ButtonRegisterHistory: React.FC<RegisterMedicalRecord> = ({ appointment, userRole, userId }) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        toast.success("✅ Historial médico registrado exitosamente")
    }


    return (
        <Tooltip>
            <TooltipTrigger>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <button

                            className="w-full rounded-md cursor-pointer bg-black px-4 py-2 text-white hover:bg-main transition-colors text-sm font-semibold"
                        >
                            <FilePlusCorner size={16} />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <MedicalRecordForm
                            appointment={appointment}
                            userRole={userRole}
                            userId={userId}
                            onCancel={() => setOpen(false)}
                            onSuccess={handleSuccess}
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