import React, { useState, useCallback, useEffect } from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import { useStoryNarrator } from "@/features/medical-record/presentation/hooks";
import { getTypeConfig } from "@/features/medical-record/presentation/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StoryProgressBars } from "./story-progress-bars";
import { StoryChapterBanner } from "./story-chapter-banner";
import { StoryNarrativeCard } from "./story-narrative-card";
import { StoryClinicalBreakdown } from "./story-clinical-breakdown";
import { StoryClinicActions } from "./story-clinic-actions";
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Sparkles,
    Calendar,
    Clock,
} from "lucide-react";

interface StorySlideViewProps {
    chapters: StoryChapter[];
}

export const StorySlideView: React.FC<StorySlideViewProps> = ({ chapters }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

    const handleAdvanceChapter = useCallback(() => {
        setSlideDirection("next");
        setCurrentIndex((prev) => prev + 1);
    }, []);

    const handleResetChapter = useCallback(() => {
        setSlideDirection("next");
        setCurrentIndex(0);
    }, []);

    const {
        isPlaying,
        isSpeaking,
        toggleAutoplay,
        toggleSingleSpeech,
        stopAudio,
    } = useStoryNarrator({
        chapters,
        currentIndex,
        onAdvanceChapter: handleAdvanceChapter,
        onResetChapter: handleResetChapter,
    });

    const currentChapter = chapters[currentIndex] || chapters[0];

    const handleSelectIndex = (idx: number) => {
        setSlideDirection(idx > currentIndex ? "next" : "prev");
        setCurrentIndex(idx);
        stopAudio();
    };

    const handleNext = useCallback(() => {
        if (currentIndex < chapters.length - 1) {
            setSlideDirection("next");
            setCurrentIndex((prev) => prev + 1);
            stopAudio();
        }
    }, [currentIndex, chapters.length, stopAudio]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setSlideDirection("prev");
            setCurrentIndex((prev) => prev - 1);
            stopAudio();
        }
    }, [currentIndex, stopAudio]);

    // Keyboard navigation (Arrow keys + Space for play/pause)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === " ") {
                e.preventDefault();
                toggleAutoplay();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev, toggleAutoplay]);

    if (!currentChapter) return null;

    const typeConfig = getTypeConfig(currentChapter.type);
    const TypeIcon = typeConfig.icon;

    return (
        <section aria-label="Modo historia guiada" className="w-full bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 rounded-3xl p-4 sm:p-7 shadow-sm transition-all duration-300">
            {/* TOP CHAPTER BARS (Like Instagram Stories) */}
            <StoryProgressBars
                total={chapters.length}
                currentIndex={currentIndex}
                onSelectIndex={handleSelectIndex}
                titles={chapters.map((c, idx) => `Capítulo ${idx + 1}: ${c.title}`)}
            />

            {/* CONTROLS HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-border-1/60 dark:border-border/10">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-main/10 text-main dark:bg-main/20 border border-main/20">
                        Capítulo {currentChapter.chapterNumber} de {chapters.length}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${typeConfig.badgeClass}`}>
                        <TypeIcon className="w-3.5 h-3.5" />
                        {currentChapter.typeLabel}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Audio speech button */}
                    <button
                        type="button"
                        onClick={() => toggleSingleSpeech(currentChapter)}
                        title={isSpeaking ? "Pausar narración de voz" : "Escuchar historia en voz alta"}
                        className={`p-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSpeaking
                                ? "bg-main text-white border-main animate-pulse"
                                : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 border-border-1 dark:border-border/10 hover:border-main/50 hover:text-main"
                        }`}
                    >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        <span className="hidden sm:inline">{isSpeaking ? "Pausar voz" : "Escuchar relato"}</span>
                    </button>

                    {/* Autoplay button with voice */}
                    <button
                        type="button"
                        onClick={toggleAutoplay}
                        title={isPlaying ? "Pausar reproducción automática" : "Iniciar reproducción automática con voz"}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                            isPlaying
                                ? "bg-main text-white border-main shadow-md shadow-main/30 animate-pulse"
                                : "bg-bg-dark-1 text-white dark:bg-white dark:text-black hover:bg-main hover:text-white border-transparent"
                        }`}
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                        <span>{isPlaying ? "Pausar historia" : "Auto-reproducir con voz"}</span>
                    </button>
                </div>
            </div>

            {/* CHAPTER LOCATION FLASH INDICATOR (FOR SPATIAL ORIENTATION) */}
            <StoryChapterBanner
                key={`banner-${currentChapter.id}`}
                chapterNumber={currentChapter.chapterNumber}
                totalChapters={chapters.length}
                title={currentChapter.title}
                formattedDate={currentChapter.formattedDate}
                timeAgo={currentChapter.timeAgo}
            />

            {/* MAIN CHAPTER CARD CONTENT (ANIMATES SMOOTHLY PER CHAPTER) */}
            <div
                key={currentChapter.id}
                className={`space-y-6 animate-in fade-in duration-500 ${
                    slideDirection === "next" ? "slide-in-from-right-8" : "slide-in-from-left-8"
                }`}
            >
                {/* Pet & Date Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-bg-1/70 dark:bg-bg-dark-3/20 border border-border-1/60 dark:border-border/10">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-main/40 shadow-xs">
                            <AvatarImage src={currentChapter.petPhoto} alt={currentChapter.petName} className="object-cover" />
                            <AvatarFallback className="bg-main/10 text-main font-black text-sm">
                                {currentChapter.petName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-text-1 dark:text-white">
                                    {currentChapter.petName}
                                </h4>
                                <span className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-bg-dark-2 font-medium text-text-2 dark:text-gray-300 border border-border-1/50 dark:border-border/10">
                                    {currentChapter.timeAgo}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-3 dark:text-muted-foreground mt-0.5">
                                <span className="flex items-center gap-1 font-bold text-main">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {currentChapter.formattedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Atención registrada
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Milestone pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 text-xs font-semibold self-start sm:self-auto">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{currentChapter.milestoneBadge}</span>
                    </div>
                </div>

                {/* Friendly Narrative Section (The Story) */}
                <StoryNarrativeCard narrative={currentChapter.narrative} />

                {/* Clinical Breakdown in Plain Terms */}
                <StoryClinicalBreakdown
                    reasonSummary={currentChapter.reasonSummary}
                    diagnosisSummary={currentChapter.diagnosisSummary}
                    treatmentSummary={currentChapter.treatmentSummary}
                    homeCareTip={currentChapter.homeCareTip}
                />

                {/* Clinic and Vet Footer for this Chapter */}
                <StoryClinicActions
                    clinicName={currentChapter.clinicName}
                    veterinaryName={currentChapter.veterinaryName}
                    hasVaccines={currentChapter.hasVaccines}
                    hasDocuments={currentChapter.hasDocuments}
                    recordId={currentChapter.id}
                />
            </div>

            {/* BOTTOM NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-border-1/60 dark:border-border/10">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="cursor-pointer gap-2 rounded-xl text-xs sm:text-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                </Button>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-3 dark:text-muted-foreground">
                    <span>{currentIndex + 1}</span>
                    <span>/</span>
                    <span>{chapters.length}</span>
                </div>

                <Button
                    onClick={handleNext}
                    disabled={currentIndex === chapters.length - 1}
                    className="cursor-pointer gap-2 rounded-xl text-xs sm:text-sm bg-main text-white hover:bg-main-hover"
                >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </section>
    );
};
