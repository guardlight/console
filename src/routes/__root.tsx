import { AuthContext } from "@/components/auth/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
    auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className='h-screen flex flex-col'>
            <Outlet />
            <TanStackRouterDevtools
                position='bottom-right'
                initialIsOpen={false}
            />
        </div>
    );
}
