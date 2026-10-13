import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import { ConsultationType } from "@/features/medical-record/domain/enums";
import { StoryTimelineFilterBar } from "./story-timeline-filter-bar";
import { StorySnakeNode } from "./story-snake-node";
import { StoryDetailOverlay } from "./story-detail-overlay";
import { HeartHandshake, MousePointerClick, PawPrint } from "lucide-react";

interface StoryTimelineViewProps {
    chapters: StoryChapter[];
}

export const StoryTimelineView: React.FC<StoryTimelineViewProps> = ({ chapters }) => {
    const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("ALL");
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
    const [cols, setCols] = useState<number>(3);

    const containerRef = useRef<HTMLDivElement>(null);
    const avatarRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [pathD, setPathD] = useState<string>("");

    // Detect responsive columns: 1 column on mobile (<640px), 3 columns on tablet/desktop (>=640px)
    useEffect(() => {
        const handleCols = () => {
            if (typeof window !== "undefined") {
                if (window.innerWidth < 640) {
                    setCols(1);
                } else {
                    setCols(3);
                }
            }
        };
        handleCols();
        window.addEventListener("resize", handleCols);
        return () => window.removeEventListener("resize", handleCols);
    }, []);

    const filteredChapters = useMemo(() => {
        let list = [...chapters];

        if (selectedTypeFilter !== "ALL") {
            if (selectedTypeFilter === "SPECIAL") {
                list = list.filter(
                    (c) =>
                        c.type === ConsultationType.EMERGENCY ||
                        c.type === ConsultationType.SURGERY ||
                        c.type === ConsultationType.HOSPITALIZATION
                );
            } else {
                list = list.filter((c) => c.type === selectedTypeFilter);
            }
        }

        if (!sortAscending) {
            list.reverse();
        }

        return list;
    }, [chapters, selectedTypeFilter, sortAscending]);

    // Active chapter for the overlay
    const activeChapter = selectedChapterIndex !== null ? filteredChapters[selectedChapterIndex] : null;

    const handleOpenOverlay = (index: number) => {
        setSelectedChapterIndex(index);
    };

    const handleCloseOverlay = () => {
        setSelectedChapterIndex(null);
    };

    const handlePrevOverlay = () => {
        if (selectedChapterIndex !== null && selectedChapterIndex > 0) {
            setSelectedChapterIndex(selectedChapterIndex - 1);
        }
    };

    const handleNextOverlay = () => {
        if (selectedChapterIndex !== null && selectedChapterIndex < filteredChapters.length - 1) {
            setSelectedChapterIndex(selectedChapterIndex + 1);
        }
    };

    // Calculate the connected snake path across avatar centers
    const updatePath = useCallback(() => {
        if (!containerRef.current || filteredChapters.length < 2) {
            setPathD("");
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const points: { x: number; y: number; row: number; col: number }[] = [];

        filteredChapters.forEach((_, idx) => {
            const el = avatarRefs.current[idx];
            if (el) {
                const rect = el.getBoundingClientRect();
                const x = rect.left - containerRect.left + rect.width / 2;
                const y = rect.top - containerRect.top + rect.height / 2;
                const r = Math.floor(idx / cols);
                const k = idx % cols;
                const c = cols === 1 ? 0 : (r % 2 === 0 ? k : (cols - 1) - k);
                points.push({ x, y, row: r, col: c });
            }
        });

        if (points.length < 2) {
            setPathD("");
            return;
        }

        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];

            if (cols === 1) {
                // Mobile vertical S-curve
                const midY = (p1.y + p2.y) / 2;
                d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
            } else {
                // Desktop 3-column snake
                if (p1.row === p2.row) {
                    // Straight horizontal line in the same row
                    d += ` L ${p2.x} ${p2.y}`;
                } else {
                    // Smooth U-turn curve to the next row
                    const isRightTurn = p1.col >= (cols - 1) || p1.x > containerRect.width / 2;
                    const curveOffset = isRightTurn ? 75 : -75;

                    d += ` C ${p1.x + curveOffset} ${p1.y}, ${p2.x + curveOffset} ${p2.y}, ${p2.x} ${p2.y}`;
                }
            }
        }

        setPathD(d);
    }, [filteredChapters, cols]);

    // Recalculate path on resize, mutation or filter changes
    useEffect(() => {
        updatePath();

        const handleResize = () => updatePath();
        window.addEventListener("resize", handleResize);

        const observer = new ResizeObserver(() => {
            updatePath();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        const timer1 = setTimeout(updatePath, 50);
        const timer2 = setTimeout(updatePath, 250);

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [updatePath]);

    return (
        <section aria-label="Línea de tiempo en serpiente" className="w-full space-y-6">
            {/* TIMELINE CONTROLS & FILTER BAR */}
            <StoryTimelineFilterBar
                selectedTypeFilter={selectedTypeFilter}
                onSelectTypeFilter={setSelectedTypeFilter}
                totalCount={chapters.length}
                sortAscending={sortAscending}
                onToggleSort={() => setSortAscending((prev) => !prev)}
            />

            {/* HINT BANNER */}
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-orange-50/60 dark:bg-main/10 border border-main/20 text-xs text-text-2 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-main shrink-0 animate-bounce" />
                    <span>
                        <strong>Línea del tiempo en serpiente:</strong> Haz clic en el avatar de tu mascota en cualquier punto del recorrido para ver la historia completa en un overlay.
                    </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-main">
                    <PawPrint className="w-3.5 h-3.5" />
                    <span>{filteredChapters.length} hitos</span>
                </div>
            </div>

            {/* CONTINUOUS SNAKE TIMELINE CONTAINER */}
            <div className="w-full bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
                {/* SVG CONTINUOUS SNAKE TRACK (Z-0) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="snake-main-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff6a2b" />
                            <stop offset="50%" stopColor="#ff864f" />
                            <stop offset="100%" stopColor="#ea4d15" />
                        </linearGradient>
                    </defs>

                    {/* Soft glowing ambient track */}
                    {pathD && (
                        <path
                            d={pathD}
                            fill="none"
                            stroke="#ff6a2b"
                            strokeWidth="8"
                            strokeOpacity="0.15"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}

                    {/* Main snake track line */}
                    {pathD && (
                        <path
                            d={pathD}
                            fill="none"
                            stroke="url(#snake-main-gradient)"
                            strokeWidth="3.5"
                            strokeDasharray="8 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>

                {/* NODES CONTAINER (Z-10) */}
                <div
                    ref={containerRef}
                    className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-12 sm:gap-y-16"
                >
                    {filteredChapters.map((chapter, index) => (
                        <StorySnakeNode
                            key={chapter.id}
                            chapter={chapter}
                            index={index}
                            cols={cols}
                            isMobileAlignLeft={index % 2 === 0}
                            onOpenOverlay={handleOpenOverlay}
                            onAvatarRef={(el) => {
                                avatarRefs.current[index] = el;
                            }}
                            onImageLoad={updatePath}
                        />
                    ))}
                </div>
            </div>

            {/* EMPTY STATE */}
            {filteredChapters.length === 0 && (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10">
                    <HeartHandshake className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold text-text-2 dark:text-muted-foreground">
                        No hay eventos registrados para el filtro seleccionado
                    </p>
                </div>
            )}

            {/* OVERLAY DIALOG WITH MILESTONE INFORMATION */}
            <StoryDetailOverlay
                isOpen={selectedChapterIndex !== null}
                onClose={handleCloseOverlay}
                chapter={activeChapter}
                onPrev={handlePrevOverlay}
                onNext={handleNextOverlay}
                hasPrev={selectedChapterIndex !== null && selectedChapterIndex > 0}
                hasNext={selectedChapterIndex !== null && selectedChapterIndex < filteredChapters.length - 1}
                chapterIndex={selectedChapterIndex ?? 0}
                totalChapters={filteredChapters.length}
            />
        </section>
    );
};
