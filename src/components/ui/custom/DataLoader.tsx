import { LuLoaderCircle } from "react-icons/lu";

type IDataLoaderSpinner = {
    title: string;
};
export default function DataLoaderSpinner({ title }: IDataLoaderSpinner) {
    return (
        <div className='flex items-center space-x-1 justify-center mt-5 text-muted-foreground'>
            <LuLoaderCircle strokeWidth={1.25} className='animate-spin' />
            <span>{title}</span>
        </div>
    );
}
