import { ThemeKeys } from "@/domain/theme/api";
import { usePrefetchQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    // Load app reqs.
    // show error that app could not be initialized

    usePrefetchQuery(ThemeKeys.themes());

    return (
        <div>
            <Header />
            <div className='flex flex-1 px-4 md:px-0 justify-center'>
                <Outlet />
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className='flex justify-between items-center p-4 mx-2 md:mx-4 sticky top-0 backdrop-blur-sm'>
            <div className='text-3xl font-bold'>Guardlight</div>
            <div className='space-x-4'>
                {/* <Button variant='outline'>Settings</Button> */}
            </div>
        </div>
    );
}

export default Header;
