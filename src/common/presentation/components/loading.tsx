import { LoaderCircle } from "lucide-react";

interface LoadingProps {
    color?: string;
    className?: string;
}

export const Loading = ({ color = "text-main", className }: LoadingProps) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <LoaderCircle className={`${color} w-10 h-10 animate-spin`} />
        </div>
    );
};