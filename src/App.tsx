import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { ToasterProps } from "sonner";
import { AuthProvider, useAuth } from "./components/auth/auth";
import { Toaster } from "./components/ui/sonner";
import { mockAnalysisApi } from "./domain/analysis/api.dev";
import { mockAuthApi } from "./domain/auth/api.dev";
import { mockDataloomJobsApi } from "./domain/dataloom/jobs/api.dev";
import { mockDataloomSearchApi } from "./domain/dataloom/search/api.dev";
import { mockDataloomStatisticsApi } from "./domain/dataloom/stats/api.dev";
import { axiosDataloomInstance, axiosInstance } from "./domain/http/api";
import { mockParserApi } from "./domain/parser/api.dev";
import { mockThemesApi } from "./domain/theme/api.dev";
import { useMediaQuery } from "./lib/hooks/useMediaQuery.hook";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
    routeTree,
    context: {
        // auth will initially be undefined
        // We'll be passing down the auth state from within a React component
        auth: undefined!,
    },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function InnerApp() {
    const auth = useAuth();
    return <RouterProvider router={router} context={{ auth }} />;
}

const queryClient = new QueryClient();

if (import.meta.env.MODE === "development") {
    console.log("Development Mode");
    const MockAdapter = (await import("axios-mock-adapter")).default;
    const mock = new MockAdapter(axiosInstance);
    mockThemesApi(mock);
    mockParserApi(mock);
    mockAnalysisApi(mock);
    mockAuthApi(mock);

    const mockDataloom = new MockAdapter(axiosDataloomInstance);
    mockDataloomJobsApi(mockDataloom);
    mockDataloomStatisticsApi(mockDataloom);
    mockDataloomSearchApi(mockDataloom);
}

function App() {
    const { resolvedTheme } = useTheme();

    const isDesktop = useMediaQuery("(min-width: 767px)");

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <InnerApp />
                <Toaster
                    visibleToasts={6}
                    expand
                    theme={resolvedTheme as ToasterProps["theme"]}
                    position={isDesktop ? "top-right" : "bottom-center"}
                    offset={{
                        top: "80px",
                        right: "24px",
                    }}
                />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
