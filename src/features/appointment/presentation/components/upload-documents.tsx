import React, { useCallback, useState } from 'react';
import { FileText, UploadIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUploadMedicalRecordDocumentsMutation } from '../../application/queries';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface UploadDocumentsProps {
    medicalRecordId: string;
}

export const UploadDocuments: React.FC<UploadDocumentsProps> = ({ medicalRecordId }) => {
    const [documents, setDocuments] = useState<File[]>([]);
    const { mutate: uploadDocuments, isPending } = useUploadMedicalRecordDocumentsMutation();

    const handleRemoveDocument = useCallback((index: number) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const handleUpload = () => {
        if (documents.length === 0) return;

        uploadDocuments(
            { medicalRecordId, files: documents },
            {
                onSuccess: () => {
                    toast.success("Documentos subidos con éxito");
                    setDocuments([]);
                },
                onError: (error: any) => {
                    console.error("Upload error:", error);
                    toast.error("Error al subir los documentos: " + (error.message || "error desconocido"));
                }
            }
        );
    };

    return (
        <div className='flex flex-col gap-6'>
            <div onClick={(e) => e.stopPropagation()} className="relative inline-block group mt-4">
                <Button size="sm" className="bg-bg-dark-1 text-text-3 py-4 px-6 pointer-events-none transition-colors group-hover:bg-bg-dark-1/80">
                    Cargar Documentos
                </Button>
                <Input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            setDocuments(Array.from(e.target.files));
                        }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            {
                documents.length > 0 &&
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 w-full flex items-center gap-4"
                >
                    <div className="flex gap-3 overflow-x-auto py-2 px-1 max-w-sm">
                        {documents.map((file, index) => (
                            <div key={index} className="group relative flex-shrink-0 w-32 h-40 rounded-xl border border-border-1 dark:border-border/10 bg-bg-1 dark:bg-bg-dark-3/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                {/* Preview / Icon Area */}
                                <div className="w-full h-24 bg-bg-2 dark:bg-bg-dark-3/40 flex items-center justify-center border-b border-border-1 dark:border-border/10">
                                    <FileText className="w-8 h-8 text-text-3 dark:text-muted-foreground/60" />
                                </div>

                                {/* Document Details */}
                                <div className="p-2 flex flex-col justify-between h-16">
                                    <span
                                        className="text-[11px] font-bold text-text-1 dark:text-white truncate block"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </span>
                                    <span className="text-[9px] text-text-3 dark:text-muted-foreground font-semibold">
                                        {formatFileSize(file.size)}
                                    </span>
                                </div>

                                {/* Remove Action Button */}
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveDocument(index);
                                    }}
                                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {
                        documents.length > 0 &&
                        <Button
                            className={"rounded-full cursor-pointer hover:bg-main-hover"}
                            size={"icon"}
                            onClick={handleUpload}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Spinner className="text-main" />
                            ) : (
                                <UploadIcon />
                            )}
                        </Button>
                    }
                </div>
            }
        </div>
    );
};
