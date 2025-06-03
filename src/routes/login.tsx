import LoginScreen from "@/components/app/login/login.screen";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: "/",
                search: { page: 1 },
            });
        }
    },
});

function RouteComponent() {
    return <LoginScreen />;
}
