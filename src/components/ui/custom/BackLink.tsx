import React from "react";
import useGoBack from "./GoBack.hook";

type BasicLinkProps = {
    disabled?: boolean;
} & React.AnchorHTMLAttributes<HTMLDivElement>;

export const BackLink = React.forwardRef<HTMLDivElement, BasicLinkProps>(
    ({ children, disabled = false, ...props }, ref) => {
        const { back } = useGoBack();

        const handleBack = disabled
            ? () => {}
            : () => {
                  back();
              };
        return (
            <div ref={ref} {...props} onClick={handleBack}>
                {children}
            </div>
        );
    }
);
