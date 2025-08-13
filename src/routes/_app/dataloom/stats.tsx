import { DataloomStatsScreen } from "@/components/app/dataloom/stats.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom/stats")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DataloomStatsScreen />;
}
