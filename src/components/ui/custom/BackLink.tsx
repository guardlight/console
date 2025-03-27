import { useRouter } from "@tanstack/react-router";
import React from "react";

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLDivElement>;

export const BackLink = React.forwardRef<HTMLDivElement, BasicLinkProps>(
    ({ children, ...props }, ref) => {
        const router = useRouter();

        const handleBack = () => {
            if (window.history.length > 1) {
                router.history.back(); // Go back in browser history
            } else {
                router.navigate({ to: "/", replace: true }); // Fallback for direct visits
            }
        };
        return (
            <div ref={ref} {...props} onClick={handleBack}>
                {children}
            </div>
        );
    }
);
