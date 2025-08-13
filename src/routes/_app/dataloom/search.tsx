import { DataloomSearchScreen } from "@/components/app/dataloom/search.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom/search")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DataloomSearchScreen />;
}
