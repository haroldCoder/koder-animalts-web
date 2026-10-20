import { CheckCircle2 } from 'lucide-react';
import { formatFileSize } from '@/common/utils';

export interface UploadFilePreviewProps {
  file: File;
  petName?: string;
  ownerReadable: boolean;
}

export const UploadFilePreview = ({
  file,
  petName,
  ownerReadable,
}: UploadFilePreviewProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
      <div className="flex items-center gap-2.5 min-w-0">
        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="min-w-0">
          <span>Archivo listo para subir: </span>
          <span className="font-semibold text-foreground">{file.name}</span>
          <span className="text-muted-foreground"> ({formatFileSize(file.size)})</span>
          {petName && <span className="text-muted-foreground"> • Paciente: {petName}</span>}
        </div>
      </div>

      <span
        className={`self-start sm:self-auto px-2 py-0.5 rounded-full text-[11px] font-semibold ${
          ownerReadable ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}
      >
        {ownerReadable ? 'Visible para titular' : 'Privado (Solo vet)'}
      </span>
    </div>
  );
};
