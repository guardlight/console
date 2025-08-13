import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";

export function DataloomLayoutScreen() {
    const location = useRouterState({ select: (s) => s.location });

    const getActiveCard = (): "home" | "stats" | "search" | "jobs" => {
        if (location.pathname === "/dataloom/") {
            return "home";
        } else if (location.pathname === "/dataloom/stats") {
            return "stats";
        } else if (location.pathname === "/dataloom/search") {
            return "search";
        } else if (location.pathname === "/dataloom/jobs") {
            return "jobs";
        }
        return "home";
    };

    return (
        <div className='flex flex-1 grow flex-col md:flex-row md:max-w-9/12 gap-3 md:gap-10 mt-2 md:mt-24 md:mb-5'>
            {/* <div className='md:flex md:justify-end gap-2'> */}
            <div className='basis-2/12 flex flex-col gap-3'>
                <Link to='/dataloom'>
                    <Card
                        className={cn(
                            "py-4 rounded-xl cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                            getActiveCard() === "home"
                                ? "border border-gray-400"
                                : ""
                        )}
                    >
                        <CardHeader>
                            <CardTitle>Home</CardTitle>
                            <CardDescription>
                                Dataloom description
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link to='/dataloom/stats'>
                    <Card
                        className={cn(
                            "py-4 rounded-xl cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                            getActiveCard() === "stats"
                                ? "border border-gray-400"
                                : ""
                        )}
                    >
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                            <CardDescription>
                                Insights into dataloom data
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link to='/dataloom/search'>
                    <Card
                        className={cn(
                            "py-4 rounded-xl cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                            getActiveCard() === "search"
                                ? "border border-gray-400"
                                : ""
                        )}
                    >
                        <CardHeader>
                            <CardTitle>Search</CardTitle>
                            <CardDescription>
                                Search dataloom data
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link to='/dataloom/jobs'>
                    <Card
                        className={cn(
                            "py-4 rounded-xl cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                            getActiveCard() === "jobs"
                                ? "border border-gray-400"
                                : ""
                        )}
                    >
                        <CardHeader>
                            <CardTitle>Jobs</CardTitle>
                            <CardDescription>
                                Job oversight in Dataloom
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
            <div className='basis-10/12 grow'>
                <Outlet />
            </div>
        </div>
    );
}
