import SomethingBrokeScreen from "@/components/app/Broke.screen";
import { setStoredUser } from "@/components/auth/storage";
import { EVENT_AUTHENTICATION_LOGOUT } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { AnalysisKeys } from "@/domain/analysis/api";
import { DATALOOM_URL } from "@/domain/http/api";
import { ParserKeys } from "@/domain/parser/api";
import { ThemeKeys } from "@/domain/theme/api";
import { usePrefetchQuery } from "@tanstack/react-query";
import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

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

        es.onopen = () => {
            toast.info("Realtime Connection Established", {
                id: "sse-connection-event",
                duration: 2000,
                description: "",
            });
        };

        es.onerror = () => {
            toast.error("Realtime Connection Failed", {
                description:
                    "You will not be able to recevie realtime updates from the server. Please refresh your page to connect again.",
                id: "sse-connection-event",
                duration: Infinity,
            });
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
            <Header />
            <div className='flex flex-1 px-4 md:px-0 justify-center'>
                <Outlet />
            </div>
        </div>
    );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type IHeader = {};
function Header({}: IHeader) {
    return (
        <div className='flex justify-between items-center p-4 mx-2 md:mx-4 sticky top-0 backdrop-blur-xs border-b-1 border-dashed z-50'>
            <div className='text-3xl font-bold'>Guardlight</div>
            <div className='space-x-4 flex flex-row gap-2'>
                <Menu />
            </div>
        </div>
    );
}

function Menu() {
    const location = useRouterState({ select: (s) => s.location });

    return (
        <div>
            {location.pathname === "/" &&
                DATALOOM_URL !== "GL_DATALOOM_URL" && (
                    <Link to={"/dataloom"}>
                        <Button variant='link' className='px-4'>
                            <span className='flex flex-row gap-3'>
                                Guardlight Dataloom
                            </span>
                        </Button>
                    </Link>
                )}
            {location.pathname.startsWith("/dataloom") && (
                <Link to={"/"} search={{ page: 1 }}>
                    <Button variant='link' className='px-4'>
                        <span className='flex flex-row gap-3'>
                            Guardlight Analyses
                        </span>
                    </Button>
                </Link>
            )}
        </div>
    );
}
