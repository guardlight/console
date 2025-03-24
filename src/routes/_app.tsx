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
    return (
        <div>
            <Header />
            <div className='flex flex-1 mx-6 md:mx-40 justify-center'>
                <Outlet />
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className='flex justify-between items-center p-4 mx-4 sticky top-0'>
            <div className='text-3xl font-bold'>Guardlight</div>
            <div className='space-x-4'>
                {/* <Button variant='outline'>Settings</Button> */}
            </div>
        </div>
    );
}

export default Header;
