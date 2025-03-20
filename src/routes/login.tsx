import { useAuth } from "@/components/auth/auth";
import { Button } from "@/components/ui/button";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: "/",
            });
        }
    },
});

function RouteComponent() {
    const auth = useAuth();

    const navigate = Route.useNavigate();

    const login = () => {
        auth.login("user").then(() => navigate({ to: "/" }));
    };

    return (
        <div>
            Hello "/_auth/login"!
            <Button onClick={() => login()}>Log in now!</Button>
        </div>
    );
}
