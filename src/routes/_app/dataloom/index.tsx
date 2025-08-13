import { DataloomHomeScreen } from "@/components/app/dataloom/home.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DataloomHomeScreen />;
}
