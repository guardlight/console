import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/analysis/$analysisId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { analysisId } = Route.useParams();
    return <div>Post {analysisId}</div>;
}
