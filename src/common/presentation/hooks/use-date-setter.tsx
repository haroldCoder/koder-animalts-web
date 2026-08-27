import { useMemo } from "react"

export const useDateSetter = (startDay: number, endDay: number) => {

    const startDateString = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + startDay);

        return d
    }, []);

    const endDateString = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + endDay);

        return d
    }, []);

    return { startDateString, endDateString }
}
