import { HomeScreen } from "@/components/app/home/home.screen";
import { createFileRoute, retainSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): { page: number } => {
        return {
            page: Number(search?.page ?? 1),
        };
    },
    search: {
        middlewares: [retainSearchParams(["page"])],
    },
});

function RouteComponent() {
    return <HomeScreen />;
}
