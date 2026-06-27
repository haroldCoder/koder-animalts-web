import { DocumentEntity } from '../../domain/entities';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FileText, User, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LucideCalendar } from 'lucide-react';
import { useState } from 'react';
import { Popup } from '@/common/presentation/components';

interface CardDocumentProps {
    documentFile: DocumentEntity;
}

export const CardDocument: React.FC<CardDocumentProps> = ({ documentFile }: { documentFile: DocumentEntity }) => {
    const [open, setOpen] = useState(false);

    const handleDownloadDocument = () => {
        const link = documentFile.fileUrl;
        const a = document.createElement("a");
        a.href = link;
        a.download = documentFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleViewDocument = () => {
        setOpen(true);
    }

    return (
        <div key={documentFile.id} className="group relative flex flex-col justify-between p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all duration-200">
            <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                        <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted">
                        {documentFile.type}
                    </span>
                </div>

                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-1">
                    {documentFile.name}
                </h4>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground/75" />
                        <span>{documentFile.veterinarian}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LucideCalendar className="h-3.5 w-3.5 text-muted-foreground/75" />
                        <span>{format(documentFile.date, "dd 'de' MMMM, yyyy", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-foreground/70">Mascota:</span>
                        <span className="bg-primary/5 text-primary font-semibold px-2 py-0.5 rounded">
                            {documentFile.petName}
                        </span>
                        <span className="text-muted-foreground/60 ml-auto">{documentFile.size}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border">
                <Button onClick={handleViewDocument} variant="outline" size="sm" className="flex-1 gap-1.5 h-8 text-xs cursor-pointer">
                    <Eye className="h-3.5 w-3.5" />
                    Visualizar
                </Button>
                <Button onClick={handleDownloadDocument} variant="outline" size="sm" className="flex-1 gap-1.5 h-8 text-xs cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                    Descargar
                </Button>
            </div>

            {
                open && (
                    <Popup isOpen={open} onClose={() => setOpen(false)} title={documentFile.name}>
                        <iframe src={documentFile.fileUrl} className="w-full h-full" title={documentFile.name} />
                    </Popup>
                )
            }
        </div>
    )
}
