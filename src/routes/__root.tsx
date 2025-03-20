import { AuthContext } from "@/components/auth/auth";
import {
    Link,
    Outlet,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

interface MyRouterContext {
    auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div>
                <Link to='/login'>Login</Link>
                <Link to='/'>Home</Link>
            </div>
            <Outlet />
            <TanStackRouterDevtools
                position='bottom-right'
                initialIsOpen={false}
            />
        </React.Fragment>
    );
}
