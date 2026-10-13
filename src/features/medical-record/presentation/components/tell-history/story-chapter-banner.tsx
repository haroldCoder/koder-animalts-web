import React from "react";
import { Sparkles } from "lucide-react";

interface StoryChapterBannerProps {
    chapterNumber: number;
    totalChapters: number;
    title: string;
    formattedDate: string;
    timeAgo: string;
}

export const StoryChapterBanner: React.FC<StoryChapterBannerProps> = ({
    chapterNumber,
    totalChapters,
    title,
    formattedDate,
    timeAgo,
}) => {
    return (
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-orange-100/70 via-orange-50/40 to-white dark:from-main/20 dark:via-bg-dark-3/30 dark:to-bg-dark-2 border border-main/30 shadow-xs animate-in fade-in zoom-in-95 duration-400">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-main text-white shadow-xs">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-main">
                            Capítulo {chapterNumber} de {totalChapters}
                        </span>
                        <span className="text-[11px] font-bold text-text-3 dark:text-muted-foreground">•</span>
                        <span className="text-[11px] font-bold text-text-2 dark:text-gray-300">
                            {formattedDate}
                        </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-1 dark:text-white leading-tight">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="text-right shrink-0">
                <span className="text-xs font-black text-main bg-white dark:bg-bg-dark-2 px-3 py-1 rounded-full border border-main/20 shadow-xs inline-block">
                    {timeAgo}
                </span>
            </div>
        </div>
    );
};
