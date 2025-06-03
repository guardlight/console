import { HomeScreen } from "@/components/app/home/home.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): { page: number } => {
        return {
            page: Number(search?.page ?? 1),
        };
    },
});

function RouteComponent() {
    return <HomeScreen />;
}
