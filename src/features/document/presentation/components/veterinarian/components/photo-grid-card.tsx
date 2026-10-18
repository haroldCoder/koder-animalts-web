import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/common/utils';
import { PhotoItem } from '../hooks/use-photos-to-pdf';

export interface PhotoGridCardProps {
  item: PhotoItem;
  index: number;
  total: number;
  disabled?: boolean;
  onRemove: (id: string) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
}

export const PhotoGridCard = ({
  item,
  index,
  total,
  disabled = false,
  onRemove,
  onMoveLeft,
  onMoveRight,
}: PhotoGridCardProps) => {
  return (
    <div className="group relative flex flex-col bg-card border border-border/70 rounded-xl overflow-hidden shadow-xs hover:border-primary/50 transition-all">
      {/* Page number badge */}
      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[11px] font-medium text-white shadow-xs">
        Pág. {index + 1}
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-black/70 backdrop-blur-xs text-white hover:bg-destructive hover:text-white transition-colors cursor-pointer"
        title="Eliminar página"
        disabled={disabled}
      >
        <Trash2 className="size-3.5" />
      </button>

      {/* Image preview */}
      <div className="relative aspect-3/4 w-full bg-black/5 overflow-hidden">
        <img
          src={item.previewUrl}
          alt={`Página ${index + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Footer with reordering buttons */}
      <div className="flex items-center justify-between p-1.5 bg-muted/40 border-t border-border/40 text-xs">
        <span className="text-[11px] text-muted-foreground truncate max-w-[80px]">
          {formatFileSize(item.file.size)}
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onMoveLeft(index)}
            disabled={index === 0 || disabled}
            className="size-6 text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-30"
            title="Mover a la izquierda"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onMoveRight(index)}
            disabled={index === total - 1 || disabled}
            className="size-6 text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-30"
            title="Mover a la derecha"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
