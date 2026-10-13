import React from "react";

interface StoryProgressBarsProps {
    total: number;
    currentIndex: number;
    onSelectIndex: (index: number) => void;
    titles?: string[];
}

export const StoryProgressBars: React.FC<StoryProgressBarsProps> = ({
    total,
    currentIndex,
    onSelectIndex,
    titles = [],
}) => {
    return (
        <div className="flex items-center gap-1.5 mb-5 w-full">
            {Array.from({ length: total }).map((_, idx) => {
                const isPassed = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const title = titles[idx] || `Capítulo ${idx + 1}`;

                return (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectIndex(idx)}
                        title={title}
                        className="group relative flex-1 h-2 rounded-full overflow-hidden bg-bg-2 dark:bg-bg-dark-3 cursor-pointer py-1 -my-1"
                    >
                        <div
                            className={`h-full w-full rounded-full transition-all duration-300 ${
                                isCurrent
                                    ? "bg-main shadow-md scale-y-125 ring-2 ring-main/30"
                                    : isPassed
                                    ? "bg-main/60"
                                    : "bg-transparent group-hover:bg-main/30"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};
