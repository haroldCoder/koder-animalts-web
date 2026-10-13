import React, { useEffect, useRef, useState } from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import { getTypeConfig } from "@/features/medical-record/presentation/constants";
import { Overlay } from "@/common/presentation/components/overlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StoryNarrativeCard } from "./story-narrative-card";
import { StoryClinicalBreakdown } from "./story-clinical-breakdown";
import { StoryClinicActions } from "./story-clinic-actions";
import {
    X,
    Calendar,
    Clock,
    Sparkles,
    Volume2,
    VolumeX,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface StoryDetailOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    chapter: StoryChapter | null;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
    chapterIndex?: number;
    totalChapters?: number;
}

export const StoryDetailOverlay: React.FC<StoryDetailOverlayProps> = ({
    isOpen,
    onClose,
    chapter,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false,
    chapterIndex = 0,
    totalChapters = 0,
}) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            synthRef.current = window.speechSynthesis;
        }
        return () => {
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    // Stop speaking when chapter changes or overlay closes
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, [chapter, isOpen]);

    if (!chapter) return null;

    const typeConfig = getTypeConfig(chapter.type);
    const TypeIcon = typeConfig.icon;

    const toggleSpeech = () => {
        if (!synthRef.current) return;

        if (isSpeaking) {
            synthRef.current.cancel();
            setIsSpeaking(false);
            return;
        }

        synthRef.current.cancel();

        const speechText = `${chapter.title}. En la fecha ${chapter.formattedDate}, en ${chapter.clinicName}. ${chapter.narrative} Diagnóstico: ${chapter.diagnosisSummary}. Tratamiento: ${chapter.treatmentSummary}. Recomendación para casa: ${chapter.homeCareTip}`;

        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = "es-ES";
        utterance.rate = 0.95;

        const voices = synthRef.current.getVoices();
        const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
        if (spanishVoice) {
            utterance.voice = spanishVoice;
        }

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
        setIsSpeaking(true);
    };

    return (
        <Overlay isOpen={isOpen} onClose={onClose} className="p-4 w-full max-w-2xl max-h-[92vh] flex flex-col">
            <div className="w-full bg-white dark:bg-bg-dark-2 rounded-3xl border border-border-1 dark:border-border/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* HEADER */}
                <div className="flex items-center justify-between p-5 border-b border-border-1/60 dark:border-border/10 bg-gradient-to-r from-orange-50/50 via-white to-transparent dark:from-main/10 dark:via-bg-dark-2 dark:to-transparent shrink-0">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-main shadow-xs">
                            <AvatarImage src={chapter.petPhoto} alt={chapter.petName} className="object-cover" />
                            <AvatarFallback className="bg-main/10 text-main font-black text-sm">
                                {chapter.petName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-text-1 dark:text-white">
                                    {chapter.petName}
                                </h3>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeConfig.badgeClass}`}>
                                    <TypeIcon className="w-3.5 h-3.5" />
                                    {chapter.typeLabel}
                                </span>
                            </div>
                            {/* FECHA EN TEXT-MAIN */}
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-sm font-black text-main flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {chapter.formattedDate}
                                </span>
                                <span className="text-xs text-text-3 dark:text-muted-foreground">•</span>
                                <span className="text-xs text-text-3 dark:text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {chapter.timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {/* Audio Narrator */}
                        <button
                            type="button"
                            onClick={toggleSpeech}
                            title={isSpeaking ? "Pausar narración" : "Escuchar relato en voz alta"}
                            className={`p-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                                isSpeaking
                                    ? "bg-main text-white border-main animate-pulse"
                                    : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 border-border-1 dark:border-border/10 hover:text-main"
                            }`}
                        >
                            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            <span className="hidden sm:inline text-xs">{isSpeaking ? "Pausar voz" : "Escuchar"}</span>
                        </button>

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 rounded-xl text-text-3 hover:text-text-1 dark:hover:text-white hover:bg-bg-1 dark:hover:bg-bg-dark-3/50 transition-colors cursor-pointer"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* SCROLLABLE BODY */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin">
                    {/* Milestone badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{chapter.milestoneBadge}</span>
                    </div>

                    {/* Friendly Narrative Card */}
                    <StoryNarrativeCard narrative={chapter.narrative} />

                    {/* Clinical Details Breakdown */}
                    <StoryClinicalBreakdown
                        reasonSummary={chapter.reasonSummary}
                        diagnosisSummary={chapter.diagnosisSummary}
                        treatmentSummary={chapter.treatmentSummary}
                        homeCareTip={chapter.homeCareTip}
                        veterinaryName={chapter.veterinaryName}
                        showVeterinaryInTreatment
                    />

                    {/* Clinic and Direct Actions */}
                    <StoryClinicActions
                        clinicName={chapter.clinicName}
                        veterinaryName={chapter.veterinaryName}
                        hasVaccines={chapter.hasVaccines}
                        hasDocuments={chapter.hasDocuments}
                        recordId={chapter.id}
                        onBeforeNavigate={onClose}
                        showVeterinaryName={false}
                    />
                </div>

                {/* FOOTER / NAVIGATION */}
                <div className="flex items-center justify-between p-4 border-t border-border-1/60 dark:border-border/10 bg-bg-1/40 dark:bg-bg-dark-3/20 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onPrev}
                        disabled={!hasPrev}
                        className="cursor-pointer gap-1.5 text-xs rounded-xl"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Anterior</span>
                    </Button>

                    <span className="text-xs font-semibold text-text-3 dark:text-muted-foreground">
                        Hito {chapterIndex + 1} de {totalChapters}
                    </span>

                    <Button
                        size="sm"
                        onClick={onNext}
                        disabled={!hasNext}
                        className="cursor-pointer gap-1.5 text-xs rounded-xl bg-main text-white hover:bg-main-hover"
                    >
                        <span>Siguiente</span>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Overlay>
    );
};
