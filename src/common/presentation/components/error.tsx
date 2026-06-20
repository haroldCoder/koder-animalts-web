import { XCircle } from "lucide-react";

interface ErrorProps {
    message: string;
    className?: string;
}

export const Error = ({ message, className }: ErrorProps) => {
    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <XCircle className="text-red-500 w-10 h-10" />
            <p className="text-red-500">{message}</p>
        </div>
    );
}