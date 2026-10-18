import { FileCheck2, FileText, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/common/utils';

export interface PdfConversionStatusProps {
  isConverting: boolean;
  generatedPdf: File | null;
  pdfPreviewUrl: string | null;
  pageCount: number;
  disabled?: boolean;
  onRetry: () => void;
}

export const PdfConversionStatus = ({
  isConverting,
  generatedPdf,
  pdfPreviewUrl,
  pageCount,
  disabled = false,
  onRetry,
}: PdfConversionStatusProps) => {
  return (
    <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
          {isConverting ? (
            <Loader2 className="size-5 animate-spin" />
          ) : generatedPdf ? (
            <FileCheck2 className="size-5 text-emerald-500" />
          ) : (
            <FileText className="size-5" />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            {isConverting ? (
              'Convirtiendo fotos a PDF...'
            ) : generatedPdf ? (
              <>
                PDF generado exitosamente
                <Sparkles className="size-3.5 text-main" />
              </>
            ) : (
              'Listo para compilar PDF'
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {generatedPdf
              ? `${generatedPdf.name} (${formatFileSize(generatedPdf.size)}) • ${pageCount} página(s)`
              : 'Las fotos capturadas se compilarán automáticamente en formato PDF.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {pdfPreviewUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open(pdfPreviewUrl, '_blank')}
            className="text-xs h-8 gap-1.5 cursor-pointer bg-background"
          >
            <ExternalLink className="size-3.5" />
            Ver PDF
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          disabled={isConverting || disabled}
          className="text-xs h-8 cursor-pointer"
        >
          {isConverting ? 'Reintentando...' : 'Re-generar PDF'}
        </Button>
      </div>
    </div>
  );
};
