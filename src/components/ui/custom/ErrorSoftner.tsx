import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../button";
import EmptyList from "./EmptyList";

type IErrorSoftner = {
    title: string;
    queryKeys: Array<String | number>;
};
export default function ErrorSoftner({ title, queryKeys }: IErrorSoftner) {
    const qc = useQueryClient();

    const invalidateQuery = () =>
        qc.invalidateQueries({
            queryKey: queryKeys,
        });

    return (
        <EmptyList title={title}>
            <Button
                onClick={invalidateQuery}
                variant='outline'
                className='mt-3'
            >
                Retry
            </Button>
        </EmptyList>
    );
}
