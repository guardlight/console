import { PropsWithChildren } from "react";

type IEmptyList = {
    title: string;
};
export default function EmptyList({
    title,
    children,
}: IEmptyList & PropsWithChildren) {
    return (
        <div className='text-muted-foreground text-center border border-gray-300 rounded-xl p-10 border-dashed'>
            <p className='font-light'>{title}</p>
            {children}
        </div>
    );
}
