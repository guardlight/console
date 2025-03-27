import { HomeScreen } from "@/components/app/home/home.screen";
import { ANALYSES } from "@/domain/analysis/type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    loader: () => Promise.resolve(ANALYSES),
});

function RouteComponent() {
    return <HomeScreen analyses={Route.useLoaderData()} />;
}
