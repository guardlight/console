import { HomeScreen } from "@/components/app/home/home.screen";
import { createFileRoute, retainSearchParams } from "@tanstack/react-router";

type AnalysisSearch = {
    page: number;
    query?: string | undefined;
    category?: string | undefined;
    score?: string | undefined;
};

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): AnalysisSearch => {
        return {
            page: Number(search?.page ?? 1),
            query: search.query as string as AnalysisSearch["query"],
            category: search.category as AnalysisSearch["category"],
            score: search.score as AnalysisSearch["score"],
        };
    },
    search: {
        middlewares: [
            retainSearchParams(["page", "query", "category", "score"]),
        ],
    },
});

function RouteComponent() {
    return <HomeScreen />;
}
