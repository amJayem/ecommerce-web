"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; asChild?: boolean; onClick?: () => void }
>(({ children, asChild, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) return null;

  const handleToggle = () => {
    context.setIsOpen(!context.isOpen);
    onClick?.();
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      onClick: handleToggle,
      ...props,
      ref,
    });
  }
  return (
    <button onClick={handleToggle} ref={ref} {...props}>
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = ({
  children,
  className,
  align = "end",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}) => {
  const context = React.useContext(DropdownMenuContext);
  if (!context?.isOpen) return null;

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[10rem] overflow-hidden rounded-2xl border bg-white p-1 text-slate-950 shadow-xl animate-in fade-in zoom-in-95 duration-200 mt-2",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
};
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) return null;

  const handleClick = () => {
    onClick?.();
    context.setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 text-sm font-bold outline-none transition-colors hover:bg-slate-50 focus:bg-slate-100",
        className
      )}
    >
      {children}
    </div>
  );
};
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
