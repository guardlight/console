import { HomeScreen } from "@/components/app/home/home.screen";
import { createFileRoute, retainSearchParams } from "@tanstack/react-router";

type AnalysisSearch = {
    page: number;
    query?: string | undefined;
    category?: string | undefined;
};

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): AnalysisSearch => {
        return {
            page: Number(search?.page ?? 1),
            query: search.query as string as AnalysisSearch["query"],
            category: search.category as AnalysisSearch["category"],
        };
    },
    search: {
        middlewares: [retainSearchParams(["page", "query", "category"])],
    },
});

function RouteComponent() {
    return <HomeScreen />;
}
