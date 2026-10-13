import { useState, useRef, useEffect, useCallback } from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";

interface UseStoryNarratorProps {
    chapters: StoryChapter[];
    currentIndex: number;
    onAdvanceChapter: () => void;
    onResetChapter?: () => void;
}

export function useStoryNarrator({
    chapters,
    currentIndex,
    onAdvanceChapter,
    onResetChapter,
}: UseStoryNarratorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const synthRef = useRef<SpeechSynthesis | null>(null);
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;
    const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize speech synthesis
    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            synthRef.current = window.speechSynthesis;
        }
        return () => {
            if (synthRef.current) {
                synthRef.current.cancel();
            }
            if (nextTimeoutRef.current) {
                clearTimeout(nextTimeoutRef.current);
            }
        };
    }, []);

    const stopAudio = useCallback(() => {
        if (nextTimeoutRef.current) {
            clearTimeout(nextTimeoutRef.current);
        }
        if (synthRef.current) {
            synthRef.current.cancel();
        }
        setIsSpeaking(false);
    }, []);

    // Speech engine
    const speakChapter = useCallback(
        (chapter: StoryChapter, onEndCallback?: () => void) => {
            if (!synthRef.current) return;

            synthRef.current.cancel();

            const speechText = `${chapter.title}. En la fecha ${chapter.formattedDate}, en ${chapter.clinicName}. ${chapter.narrative} Diagnóstico: ${chapter.diagnosisSummary}. Tratamiento: ${chapter.treatmentSummary}. Consejo para el hogar: ${chapter.homeCareTip}`;

            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.lang = "es-ES";
            utterance.rate = 0.95;

            const voices = synthRef.current.getVoices();
            const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
            if (spanishVoice) {
                utterance.voice = spanishVoice;
            }

            utterance.onstart = () => {
                setIsSpeaking(true);
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                if (onEndCallback) {
                    onEndCallback();
                }
            };

            utterance.onerror = () => {
                setIsSpeaking(false);
                if (onEndCallback) {
                    onEndCallback();
                }
            };

            synthRef.current.speak(utterance);
            setIsSpeaking(true);
        },
        []
    );

    // Autoplay loop
    useEffect(() => {
        if (isPlaying && chapters.length > 0) {
            const chapter = chapters[currentIndex];
            if (chapter) {
                speakChapter(chapter, () => {
                    if (isPlayingRef.current) {
                        if (currentIndex < chapters.length - 1) {
                            nextTimeoutRef.current = setTimeout(() => {
                                if (isPlayingRef.current) {
                                    onAdvanceChapter();
                                }
                            }, 1200);
                        } else {
                            setIsPlaying(false);
                        }
                    }
                });
            }
        }

        return () => {
            if (nextTimeoutRef.current) {
                clearTimeout(nextTimeoutRef.current);
            }
        };
    }, [currentIndex, isPlaying, chapters, speakChapter, onAdvanceChapter]);

    const toggleAutoplay = useCallback(() => {
        if (isPlaying) {
            setIsPlaying(false);
            stopAudio();
        } else {
            setIsPlaying(true);
            if (currentIndex >= chapters.length - 1 && onResetChapter) {
                onResetChapter();
            }
        }
    }, [isPlaying, currentIndex, chapters.length, stopAudio, onResetChapter]);

    const toggleSingleSpeech = useCallback(
        (chapter: StoryChapter) => {
            if (!synthRef.current || !chapter) return;

            if (isSpeaking) {
                stopAudio();
                if (isPlaying) {
                    setIsPlaying(false);
                }
                return;
            }

            speakChapter(chapter);
        },
        [isSpeaking, isPlaying, speakChapter, stopAudio]
    );

    return {
        isPlaying,
        isSpeaking,
        toggleAutoplay,
        toggleSingleSpeech,
        stopAudio,
    };
}
