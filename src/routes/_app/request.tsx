import RequestScreen from "@/components/app/request/request.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/request")({
    component: RouteComponent,
});

function RouteComponent() {
    return <RequestScreen />;
}
