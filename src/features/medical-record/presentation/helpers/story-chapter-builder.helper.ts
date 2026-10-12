import { MedicalRecordEntity } from "@/features/medical-record/domain/entities";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import { FormatDate } from "@/common/utils/format-date";
import { formatTimeAgo } from "./story-time-ago.helper";
import { getStoryMilestoneBadge } from "./story-milestone.helper";
import { getStoryHomeCareTip } from "./story-home-care.helper";
import { getStoryNarrative } from "./story-narrator-text.helper";

export function buildStoryChapters(records: MedicalRecordEntity[]): StoryChapter[] {
    // Sort chronologically (oldest to newest) to tell the pet's genuine journey
    const sorted = [...records].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted.map((record, index) => {
        const dateObj = new Date(record.date);
        const petName = record.petName || "Tu mascota";
        const vetName = record.veterinaryName || "Equipo Médico";
        const clinic = record.clinicName || "Clínica Veterinaria";
        const reason = record.reasonForVisit || "Chequeo veterinario";
        const diag = record.diagnosis || "Evaluación médica completada";
        const treat = record.treatment || "Recomendaciones de cuidado general";

        const { typeLabel, title, narrative } = getStoryNarrative(record.type, {
            petName,
            clinicName: clinic,
            veterinaryName: vetName,
            reason,
        });

        return {
            id: record.id,
            chapterNumber: index + 1,
            title,
            date: dateObj,
            formattedDate: FormatDate.formattedDate(dateObj),
            timeAgo: formatTimeAgo(dateObj),
            petName,
            petPhoto: record.petPhoto,
            type: record.type,
            typeLabel,
            clinicName: clinic,
            veterinaryName: vetName,
            narrative,
            reasonSummary: reason,
            diagnosisSummary: diag,
            treatmentSummary: treat,
            homeCareTip: getStoryHomeCareTip(record.type, record.treatment),
            milestoneBadge: getStoryMilestoneBadge(record.type, record.diagnosis),
            hasVaccines: Boolean(record.vaccinationsIds && record.vaccinationsIds.length > 0),
            hasDocuments: Boolean(record.documentIds && record.documentIds.length > 0),
            documentIds: record.documentIds,
            vaccinationsIds: record.vaccinationsIds,
        };
    });
}
