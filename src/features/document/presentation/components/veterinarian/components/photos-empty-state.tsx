import { Camera } from 'lucide-react';

export const PhotosEmptyState = () => {
  return (
    <div className="p-8 border-2 border-dashed border-border/80 rounded-xl flex flex-col items-center justify-center text-center bg-muted/10">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
        <Camera className="size-6" />
      </div>
      <p className="text-sm font-medium text-foreground">
        Aún no has tomado ni seleccionado fotos
      </p>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm">
        Usa los botones superiores para tomar fotos con tu cámara o periférico fotográfico, o sube imágenes desde tus archivos.
      </p>
    </div>
  );
};
