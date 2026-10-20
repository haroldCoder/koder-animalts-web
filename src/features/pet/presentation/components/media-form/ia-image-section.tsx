import { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    Sparkles,
    Upload,
    Link2,
    Trash2,
} from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { formatFileSize } from '@/common/utils';

export interface IaImageSectionProps {
    mode: 'file' | 'url';
    onModeChange: (mode: 'file' | 'url') => void;
    iaFile?: FileList;
    onSelectFile: (files: FileList) => void;
    onRemoveFile: () => void;
    onOpenCamera: () => void;
    urlRegister: UseFormRegisterReturn;
}

export const IaImageSection = ({
    mode,
    onModeChange,
    iaFile,
    onSelectFile,
    onRemoveFile,
    urlRegister,
}: IaImageSectionProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (iaFile && iaFile.length > 0) {
            const url = URL.createObjectURL(iaFile[0]);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [iaFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onSelectFile(e.target.files);
        }
    };

    const handleRemoveClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onRemoveFile();
    };

    const hasFile = Boolean(iaFile && iaFile.length > 0 && previewUrl);

    return (
        <div className="space-y-4 pt-4 border-t border-border/20">
            <div>
                <label className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    Imagen generada o relacionada con IA
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                    Puedes subir un archivo local o proporcionar una URL.
                </p>
            </div>

            <Tabs
                value={mode}
                onValueChange={(val) => onModeChange(val as 'file' | 'url')}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2 sm:max-w-md">
                    <TabsTrigger value="file" className="gap-2">
                        <Upload className="size-4" /> Subir Archivo
                    </TabsTrigger>
                    <TabsTrigger value="url" className="gap-2">
                        <Link2 className="size-4" /> Usar URL
                    </TabsTrigger>
                </TabsList>

                <div className="mt-4 w-full sm:max-w-md">
                    <TabsContent value="file" className="space-y-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="sr-only"
                        />

                        {hasFile && iaFile ? (
                            <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-muted/20">
                                <img
                                    src={previewUrl!}
                                    alt="IA Preview"
                                    className="size-14 rounded-lg object-cover border border-border"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-foreground truncate">
                                        {iaFile[0].name}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">
                                        {formatFileSize(iaFile[0].size)}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveClick}
                                    className="text-xs text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="size-3.5" />
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-20 flex-col gap-1.5 border-dashed border-border hover:border-primary/50"
                                >
                                    <Upload className="size-5 text-muted-foreground" />
                                    <span className="text-xs">Subir archivo</span>
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="url">
                        <Input
                            type="url"
                            placeholder="https://ejemplo.com/imagen.png"
                            {...urlRegister}
                            className="h-10"
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};
