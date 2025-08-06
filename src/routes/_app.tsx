import SomethingBrokeScreen from "@/components/app/Broke.screen";
import { setStoredUser } from "@/components/auth/storage";
import { EVENT_AUTHENTICATION_LOGOUT } from "@/components/const/const";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnalysisKeys } from "@/domain/analysis/api";
import { ParserKeys } from "@/domain/parser/api";
import { ThemeKeys } from "@/domain/theme/api";
import { usePrefetchQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app")({
    beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: "/login",
            });
        }
    },
    component: RouteComponent,
    errorComponent: (e) => <SomethingBrokeScreen error={e} />,
});

type Event = {
    type: "update" | "heartbeat";
    action: "analysis_done" | "analysis_requested" | "report_done" | "beat";
    data: string;
};

function RouteComponent() {
    const { invs } = useInvalidateQuery();
    const [serverDisconnected, setServerDisconnected] = useState(false);

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

        es.onopen = () => setServerDisconnected(false);

        es.onerror = () => {
            setServerDisconnected(true);
        };

        es.onmessage = (e) => handleMessage(e);

        return () => es.close();
    }, []);

    const handleMessage = async (e: MessageEvent<any>) => {
        if (e.data) {
            const ev: Event = JSON.parse(e.data);
            if ("update" === ev.type) {
                if (
                    "analysis_done" === ev.action ||
                    "report_done" === ev.action ||
                    "analysis_requested" === ev.action
                ) {
                    await sleep(500);
                    invs(
                        AnalysisKeys.analyses(
                            1,
                            undefined,
                            undefined,
                            undefined
                        ).queryKey
                    );
                }
            }
        }
    };

    usePrefetchQuery(ThemeKeys.themes());
    usePrefetchQuery(ParserKeys.parsers());

    return (
        <div>
            <Header serverDisconnected={serverDisconnected} />
            <div className='flex flex-1 px-4 md:px-0 justify-center'>
                <Outlet />
            </div>
        </div>
    );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type IHeader = {
    serverDisconnected: boolean;
};
function Header({ serverDisconnected }: IHeader) {
    return (
        <div className='flex justify-between items-center p-4 mx-2 md:mx-4 sticky top-0 backdrop-blur-xs border-b-1 border-dashed z-50'>
            <div className='text-3xl font-bold'>Guardlight</div>
            <div className='space-x-4'>
                {serverDisconnected && <RealtimeConnectionFailed />}
                {/* <Button variant='outline'>Settings</Button> */}
            </div>
        </div>
    );
}

function RealtimeConnectionFailed() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className='px-2 py-1 border border-amber-400 rounded-md text-amber-500'>
                        Realtime Connection Failed
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className='w-56'>
                        You will not be able to recevie realtime updates from
                        the server.
                    </p>
                    <p>Please refresh your page to connect again.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
