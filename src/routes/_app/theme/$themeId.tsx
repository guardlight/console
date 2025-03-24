import ThemeScreen from "@/components/app/theme/theme.screen";
import { NIL_THEME_CONFIG } from "@/domain/theme/type";
import { createFileRoute } from "@tanstack/react-router";
import { THEME_CONFIGS } from ".";

export const Route = createFileRoute("/_app/theme/$themeId")({
    loader: ({ params }) => {
        const themeConfig =
            THEME_CONFIGS.find((tc) => tc.id === params.themeId) ||
            NIL_THEME_CONFIG;
        return Promise.resolve(themeConfig);
    },
    component: RouteComponent,
});

function RouteComponent() {
    const themeConfig = Route.useLoaderData();
    return <ThemeScreen themeConfig={themeConfig} />;
}
