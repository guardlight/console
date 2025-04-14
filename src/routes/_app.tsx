import { setStoredUser } from "@/components/auth/storage";
import { EVENT_AUTHENTICATION_LOGOUT } from "@/components/const/const";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { AnalysisKeys } from "@/domain/analysis/api";
import { ParserKeys } from "@/domain/parser/api";
import { ThemeKeys } from "@/domain/theme/api";
import { usePrefetchQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

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

type Event = {
    type: "update" | "heartbeat";
    action: "analysis_done" | "beat";
    data: string;
};

function RouteComponent() {
    const { invs } = useInvalidateQuery();

    useEffect(() => {
        const navigateToLogin = () => {
            setStoredUser(null);
            window.location.reload();
        };

        window.addEventListener(EVENT_AUTHENTICATION_LOGOUT, navigateToLogin);

        return () => {
            window.removeEventListener(
                EVENT_AUTHENTICATION_LOGOUT,
                navigateToLogin
            );
        };
    }, []);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_SERVER_URL;

        const es = new EventSource(baseUrl + "/events", {
            withCredentials: true,
        });

        es.onopen = () => console.log(">>> Connection opened!");

        es.onerror = (e) => console.log("ERROR!", e);

        es.onmessage = (e) => handleMessage(e);

        return () => es.close();
    }, []);

    const handleMessage = (e: MessageEvent<any>) => {
        if (e.data) {
            const ev: Event = JSON.parse(e.data);
            if ("update" === ev.type) {
                if ("analysis_done" === ev.action) {
                    invs(AnalysisKeys.analyses().queryKey);
                }
            }
        }
    };

    usePrefetchQuery(ThemeKeys.themes());
    usePrefetchQuery(ParserKeys.parsers());

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
        <div className='flex justify-between items-center p-4 mx-2 md:mx-4 sticky top-0 backdrop-blur-xs border-b-1 border-dashed'>
            <div className='text-3xl font-bold'>Guardlight</div>
            <div className='space-x-4'>
                {/* <Button variant='outline'>Settings</Button> */}
            </div>
        </div>
    );
}

export default Header;
