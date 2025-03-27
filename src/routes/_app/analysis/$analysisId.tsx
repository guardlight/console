import AnalysisScreen from "@/components/app/analysis/analysis.screen";
import { ANALYSES, NIL_ANALYSIS_RESULT } from "@/domain/analysis/type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/analysis/$analysisId")({
    loader: ({ params }) => {
        const ar =
            ANALYSES.find((a) => a.id === params.analysisId) ||
            NIL_ANALYSIS_RESULT;
        return Promise.resolve(ar);
    },
    component: RouteComponent,
});

function RouteComponent() {
    const data = Route.useLoaderData();
    return <AnalysisScreen analysisResult={data} />;
}
