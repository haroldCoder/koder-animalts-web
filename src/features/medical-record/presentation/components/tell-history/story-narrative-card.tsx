import React from "react";
import { HeartHandshake } from "lucide-react";

interface StoryNarrativeCardProps {
    narrative: string;
    className?: string;
}

export const StoryNarrativeCard: React.FC<StoryNarrativeCardProps> = ({ narrative, className = "" }) => {
    return (
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/70 to-white dark:from-main/10 dark:to-bg-dark-2 border border-main/20 shadow-xs space-y-2 ${className}`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-main">
                <HeartHandshake className="w-4 h-4" />
                <span>Lo que sucedió en este momento</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-text-1 dark:text-gray-100 leading-relaxed">
                {narrative}
            </p>
        </div>
    );
};
