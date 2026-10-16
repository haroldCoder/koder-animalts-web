import { Button } from '@/components/ui/button';
import { InfoIcon, LogInIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserNotFound = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 p-4 bg-muted/20 dark:bg-background">
            <div className="p-4 bg-destructive/10 text-destructive rounded-2xl mb-1">
                <InfoIcon className="size-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Usuario no encontrado</h2>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
                No pudimos verificar la información de tu sesión. Por favor, inicia sesión nuevamente.
            </p>
            <Link to="/auth" className="mt-4">
                <Button
                    className="h-11 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all shadow-sm gap-2"
                >
                    Iniciar sesión <LogInIcon className="size-4" />
                </Button>
            </Link>
        </div>
    );
};
