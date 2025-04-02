import AnalysisScreen from "@/components/app/analysis/analysis.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/analysis/$analysisId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { analysisId } = Route.useParams();
    return <AnalysisScreen analysisId={analysisId} />;
}
