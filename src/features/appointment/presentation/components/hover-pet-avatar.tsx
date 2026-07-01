import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export const HoverPetAvatar = ({ src, name }: { src?: string; name: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                className="cursor-pointer focus:outline-none rounded-full flex shrink-0 select-none outline-none border-0 p-0 bg-transparent"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <Avatar size="sm" className="pointer-events-none size-6 border border-border/80">
                    <AvatarImage src={src} alt={name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-[10px]">
                        {name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                align="center"
                sideOffset={12}
                className="w-48 p-2 bg-popover border border-border shadow-xl rounded-lg animate-in fade-in zoom-in-95 duration-100 pointer-events-none z-[100]"
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="w-44 h-44 overflow-hidden rounded-md border border-border bg-muted">
                        {src ? (
                            <img src={src} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10 text-primary">
                                🐾
                            </div>
                        )}
                    </div>
                    <span className="text-xs font-semibold text-foreground truncate w-full text-center px-1">
                        {name}
                    </span>
                </div>
            </PopoverContent>
        </Popover>
    );
};