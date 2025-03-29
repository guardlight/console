import { HomeScreen } from "@/components/app/home/home.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <HomeScreen />;
}
