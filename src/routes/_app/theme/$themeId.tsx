import ThemeScreen from "@/components/app/theme/theme.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/theme/$themeId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { themeId } = Route.useParams();
    return <ThemeScreen themeConfigId={themeId} />;
}
