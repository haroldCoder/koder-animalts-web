import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff } from 'lucide-react';

export interface OwnerVisibilitySwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const OwnerVisibilitySwitch = ({
  checked,
  onCheckedChange,
  disabled = false,
}: OwnerVisibilitySwitchProps) => {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-muted/20 hover:bg-muted/30 transition-colors">
      <div className="space-y-0.5 pr-4">
        <Label
          htmlFor="owner-readable"
          className="text-sm font-medium text-foreground flex items-center gap-2 cursor-pointer"
        >
          {checked ? (
            <Eye className="size-4 text-primary" />
          ) : (
            <EyeOff className="size-4 text-muted-foreground" />
          )}
          Visible para el titular
        </Label>
        <p className="text-xs text-muted-foreground">
          {checked
            ? 'El propietario/titular podrá visualizar y descargar este documento desde su portal.'
            : 'Uso clínico privado: este documento solo será visible para el equipo veterinario.'}
        </p>
      </div>

      <Switch
        id="owner-readable"
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
        disabled={disabled}
      />
    </div>
  );
};
