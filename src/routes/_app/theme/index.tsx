import ThemeListScreen from "@/components/app/theme/theme-list.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/theme/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ThemeListScreen />;
}
