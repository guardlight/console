import { useQueryClient } from "@tanstack/react-query";

export default function useInvalidateQuery() {
    const qc = useQueryClient();

    const inv = (key: string) =>
        qc.invalidateQueries({
            queryKey: [key],
        });

    const invs = (keys: Array<string>) =>
        qc.invalidateQueries({
            queryKey: keys,
        });

    return { inv, invs };
}
