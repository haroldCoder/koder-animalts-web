import { DataTable } from "@/common/presentation/components";
import { vaccinationMockData } from "../data";
import { columnsTable } from "../constants";
import { Button } from "@/components/ui/button";
import { PipetteIcon, ChevronDown } from "lucide-react";
import styles from "./vaccination.module.css";
import { useMemo, useState, useEffect, useRef } from "react";
import { format } from "date-fns";

export const Vaccination = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    const vaccinationsData = useMemo(() => {
        const data = vaccinationMockData.map(vaccination => ({
            ...vaccination,
            date: format(vaccination.date, "dd/MM/yyyy"),
            nextDate: format(vaccination.nextDate, "dd/MM/yyyy")
        }))

        return data
    }, [])

    const checkOverflow = () => {
        const element = containerRef.current;
        if (element) {
            const hasOverflow = element.scrollHeight > element.clientHeight;
            const isNotAtBottom = element.scrollTop + element.clientHeight < element.scrollHeight - 10;
            setShowScrollIndicator(hasOverflow && isNotAtBottom);
        }
    };

    useEffect(() => {
        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener("resize", checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkOverflow);
        };
    }, [vaccinationsData]);

    return (
        <div className="h-[calc(100vh-70px)] flex flex-col p-5 gap-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Vacunas</h1>
                <Button className={"bg-bg-dark-1 text-text-3 py-4 cursor-pointer px-6"}>
                    <PipetteIcon />
                    Agregar Vacuna
                </Button>
            </div>
            <div className="relative flex-1 min-h-0 flex flex-col">
                <div
                    ref={containerRef}
                    onScroll={checkOverflow}
                    className="flex-1 max-h-[calc(100vh-250px)] overflow-y-auto p-5"
                >
                    <DataTable columns={columnsTable} data={vaccinationsData} styles={styles.table} />
                </div>
                {showScrollIndicator && (
                    <Button onClick={() => containerRef.current?.scrollTo({ top: containerRef.current?.scrollHeight, behavior: "smooth" })} size="icon-lg" className="absolute cursor-pointer z-10 bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bg-bg-dark-1 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 animate-bounce">
                        <ChevronDown className=" text-main animate-pulse" />
                    </Button>
                )}
            </div>
        </div>
    )
}
