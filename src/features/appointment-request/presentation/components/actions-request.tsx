import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2, X } from "lucide-react";

interface ActionsRequestProps {
    handleReject: (id: string) => void;
    handleApprove: (id: string) => void;
    requestId: string,
    disabledApprove: boolean,
    disabledReject: boolean
}

export const ActionsRequest = ({ handleReject, handleApprove, requestId, disabledApprove, disabledReject }: ActionsRequestProps) => {
    return (
        <div className="flex items-center gap-3 px-5 sm:px-6 pb-4 pt-0 justify-end border-t border-border/30 mt-0 pt-3">
            <Button
                variant="outline"
                size="sm"
                disabled={disabledReject}
                onClick={() => handleReject(requestId)}
                className="gap-2 cursor-pointer border-red-400 hover:bg-red-100 hover:text-red-600 dark:border-red-600/50 dark:hover:bg-red-900/20 dark:hover:text-red-400 font-semibold"
            >
                {
                    disabledReject ?
                        <Spinner className="size-4" />
                        :
                        <>
                            <X className="size-4" />
                            Rechazar
                        </>
                }
            </Button>
            <Button
                size="sm"
                disabled={disabledApprove}
                onClick={() => handleApprove(requestId)}
                className="gap-2 cursor-pointer font-semibold bg-green-600 text-white hover:bg-green-700"
            >
                <CheckCircle2 className="size-4" />
                {
                    disabledApprove ?
                        <Spinner className="size-4" />
                        :
                        "Aprobar"
                }
            </Button>
        </div>
    );
}