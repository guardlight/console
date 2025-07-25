import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center cursor-pointer justify-center tracking-wider gap-2 whitespace-nowrap rounded-md text-sm font-medium transform transition-transform duration-50 active:scale-97 transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
                outline:
                    "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-accent hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                cancel: "text-red-600 hover:bg-accent !px-4",
                back: " hover:text-accent-foreground !px-2 !pr-8 text-gray-500",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-8 py-2 has-[>svg]:px-7",
                sm: "h-8 rounded-md px-6 has-[>svg]:px-4.5",
                lg: "h-10 rounded-md px-10 has-[>svg]:px-8",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot='button'
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
