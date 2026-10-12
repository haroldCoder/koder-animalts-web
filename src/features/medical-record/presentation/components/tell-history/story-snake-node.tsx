import React from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import { getTypeConfig } from "@/features/medical-record/presentation/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StorySnakeNodeProps {
    chapter: StoryChapter;
    index: number;
    cols: number;
    isMobileAlignLeft?: boolean;
    onOpenOverlay: (index: number) => void;
    onAvatarRef?: (el: HTMLButtonElement | null) => void;
    onImageLoad?: () => void;
}

export const StorySnakeNode: React.FC<StorySnakeNodeProps> = ({
    chapter,
    index,
    cols,
    isMobileAlignLeft = true,
    onOpenOverlay,
    onAvatarRef,
    onImageLoad,
}) => {
    const typeConfig = getTypeConfig(chapter.type);
    const TypeIcon = typeConfig.icon;

    // Calculate grid position for 3-column snake layout on desktop
    const row = Math.floor(index / cols);
    const k = index % cols;
    // Even rows flow Left -> Right (0, 1, 2); Odd rows flow Right -> Left (2, 1, 0)
    const col = cols === 1 ? 0 : (row % 2 === 0 ? k : (cols - 1) - k);

    const gridStyle: React.CSSProperties = cols > 1 ? {
        gridColumnStart: col + 1,
        gridRowStart: row + 1,
    } : {};

    return (
        <div
            style={gridStyle}
            className={`flex flex-col items-center text-center relative group ${cols === 1
                    ? isMobileAlignLeft
                        ? "items-start pl-6 text-left"
                        : "items-end pr-6 text-right"
                    : ""
                }`}
        >
            <div className="mb-2.5 flex flex-col items-center">
                <span className="text-sm md:text-base font-black text-main tracking-tight group-hover:scale-105 transition-transform duration-200">
                    {chapter.formattedDate}
                </span>
                <span className="text-[11px] font-medium text-text-3 dark:text-muted-foreground">
                    {chapter.timeAgo}
                </span>
            </div>

            <button
                ref={onAvatarRef}
                type="button"
                onClick={() => onOpenOverlay(index)}
                title={`Ver detalles de ${chapter.petName}: ${chapter.title}`}
                className="group/btn relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-main/40 rounded-full transition-transform duration-300 hover:scale-110 z-10"
            >
                {/* Outer pulse glow */}
                <div className="absolute inset-0 rounded-full bg-main/20 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                <Avatar className="w-18 h-18 md:w-20 md:h-20 border-3 border-main shadow-md ring-4 ring-main/15 group-hover/btn:ring-main/30 bg-white dark:bg-bg-dark-2 transition-all">
                    <AvatarImage
                        src={chapter.petPhoto}
                        alt={chapter.petName}
                        className="object-cover"
                        onLoad={onImageLoad}
                    />
                    <AvatarFallback className="bg-main/15 text-main font-black text-lg">
                        {chapter.petName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                {/* Corner icon badge */}
                <div
                    className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-white dark:border-bg-dark-2 shadow-xs ${typeConfig.calendarClass}`}
                >
                    <TypeIcon className="w-3.5 h-3.5" />
                </div>
            </button>

            <div className="mt-3 space-y-1 max-w-[160px]">
                <span className="text-xs font-bold text-text-1 dark:text-white block group-hover:text-main transition-colors truncate">
                    {chapter.petName}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeConfig.badgeClass} truncate max-w-full`}>
                    {chapter.typeLabel}
                </span>
                <p className="text-[11px] text-text-3 dark:text-muted-foreground truncate leading-tight mt-0.5">
                    {chapter.reasonSummary}
                </p>
                <button
                    type="button"
                    onClick={() => onOpenOverlay(index)}
                    className="mt-1 text-[10px] font-bold text-main hover:underline cursor-pointer block mx-auto"
                >
                    Abrir información →
                </button>
            </div>
        </div>
    );
};
