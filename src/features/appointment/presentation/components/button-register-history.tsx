import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FilePlusCorner } from "lucide-react";

interface ButtonRegisterHistoryProps {
    appointmentId: string;
}

export const ButtonRegisterHistory: React.FC<ButtonRegisterHistoryProps> = ({ appointmentId }) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <button
                    onClick={() => { }}
                    className="w-full rounded-md cursor-pointer bg-black px-4 py-2 text-white hover:bg-main transition-colors text-sm font-semibold"
                >
                    <FilePlusCorner size={16} />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Registrar Historial</p>
            </TooltipContent>
        </Tooltip>
    );
}