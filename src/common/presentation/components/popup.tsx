import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopupProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    isClosable?: boolean
}

export const Popup: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    children,
    title,
    className,
    isClosable = true
}) => {
    // Prevent scrolling on body when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with subtle blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={cn(
                    "relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-xl transition-all duration-300 animate-in zoom-in-95",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-muted/20">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                        {title || 'Visualizar'}
                    </h3>
                    {isClosable && (
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                            aria-label="Cerrar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 h-full overflow-y-auto bg-card">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
