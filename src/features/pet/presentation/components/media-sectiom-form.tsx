import { Fragment } from 'react'
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Upload, Dog, Link2, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreatePetFormValues } from '../interfaces';

interface MediaSectionFormProps {
    form: UseFormReturn<CreatePetFormValues>;
    iaImageMode: "file" | "url";
    setIaImageMode: (value: "file" | "url") => void;
}

export const MediaSectionForm = ({ form, iaImageMode, setIaImageMode }: MediaSectionFormProps) => {
    const { register, formState: { errors }, watch } = form;

    const imageFile = watch("image");
    const imagesFiles = watch("images");
    const iaImageFileWatch = watch("iaImageFile");

    return (
        <Fragment>
            {/* Media Section */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                    <Upload className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold">Imágenes y Archivos</h2>
                </div>

                <div className="space-y-8">
                    {/* Single Profile Image */}
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium flex items-center gap-2">Foto de Perfil (Única)</label>
                            <p className="text-xs text-muted-foreground">Selecciona una imagen principal para la mascota.</p>
                        </div>
                        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="size-8 mb-3 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Haz clic para subir</span> o arrastra el archivo</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG o GIF</p>
                            </div>
                            <Input {...register("image", { required: true })} type="file" accept="image/*" className="sr-only" />
                        </label>
                        {imageFile && imageFile.length > 0 && (
                            <p className="text-sm text-primary font-medium flex items-center gap-2">
                                <Dog className="size-4" /> Archivo seleccionado: {imageFile[0].name}
                            </p>
                        )}
                        {errors.image && <span className="text-xs text-destructive">Debe seleccionar una imagen principal para la mascota</span>}
                    </div>

                    {/* Multiple Images */}
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium flex items-center gap-2">Galería de Imágenes (Múltiples)</label>
                            <p className="text-xs text-muted-foreground">Puedes seleccionar varios archivos a la vez.</p>
                        </div>
                        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Plus className="size-8 mb-3 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Haz clic para añadir</span> varias imágenes</p>
                                <p className="text-xs text-muted-foreground">Soporta selección múltiple</p>
                            </div>
                            <Input type="file" accept="image/*" multiple className="sr-only" {...register("images")} />
                        </label>
                        {imagesFiles && imagesFiles.length > 0 && (
                            <div className="text-sm text-primary font-medium flex flex-col gap-1">
                                <p>{imagesFiles.length} archivo(s) seleccionado(s):</p>
                                <ul className="list-disc list-inside text-muted-foreground text-xs ml-2">
                                    {Array.from(imagesFiles).map((file, i) => (
                                        <li key={i}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* IA Image - Tabs for URL or File */}
                    <div className="space-y-4 pt-4 border-t border-border/20">
                        <div>
                            <label className="text-sm font-medium">Imagen generada o relacionada con IA</label>
                            <p className="text-xs text-muted-foreground mt-1">Puedes subir un archivo local o proporcionar una URL.</p>
                        </div>

                        <Tabs value={iaImageMode} onValueChange={(val) => setIaImageMode(val as "file" | "url")} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 max-w-md">
                                <TabsTrigger value="file" className="gap-2"><Upload className="size-4" /> Subir Archivo</TabsTrigger>
                                <TabsTrigger value="url" className="gap-2"><Link2 className="size-4" /> Usar URL</TabsTrigger>
                            </TabsList>
                            <div className="mt-4 max-w-md">
                                <TabsContent value="file" className="space-y-3">
                                    <label className="relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="size-6 mb-2 text-muted-foreground" />
                                            <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold text-primary">Haz clic</span> para seleccionar</p>
                                        </div>
                                        <input type="file" accept="image/*" className="sr-only" {...register("iaImageFile")} />
                                    </label>
                                    {iaImageFileWatch && iaImageFileWatch.length > 0 && (
                                        <p className="text-sm text-primary font-medium truncate">
                                            Seleccionado: {iaImageFileWatch[0].name}
                                        </p>
                                    )}
                                </TabsContent>
                                <TabsContent value="url">
                                    <Input type="url" placeholder="https://ejemplo.com/imagen.png" {...register("iaImageUrl")} className="h-10" />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
