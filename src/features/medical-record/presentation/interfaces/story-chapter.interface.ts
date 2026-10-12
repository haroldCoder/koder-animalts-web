import { ConsultationType } from "@/features/medical-record/domain/enums";

export interface StoryChapter {
    id: string;
    chapterNumber: number;
    title: string;
    date: Date;
    formattedDate: string;
    timeAgo: string;
    petName: string;
    petPhoto?: string;
    type: ConsultationType;
    typeLabel: string;
    clinicName: string;
    veterinaryName: string;
    narrative: string;
    reasonSummary: string;
    diagnosisSummary: string;
    treatmentSummary: string;
    homeCareTip: string;
    milestoneBadge: string;
    hasVaccines: boolean;
    hasDocuments: boolean;
    documentIds?: string[];
    vaccinationsIds?: string[];
}
