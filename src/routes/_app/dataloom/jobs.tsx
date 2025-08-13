import { DataloomJobsScreen } from "@/components/app/dataloom/jobs.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom/jobs")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DataloomJobsScreen />;
}
