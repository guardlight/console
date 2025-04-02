import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./components/auth/auth";
import { Toaster } from "./components/ui/sonner";
import { mockAnalysisApi } from "./domain/analysis/api.dev";
import { axiosInstance } from "./domain/http/api";
import { mockParserApi } from "./domain/parser/api.dev";
import { mockThemesApi } from "./domain/theme/api.dev";
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
    console.log("setup mock");
    const MockAdapter = (await import("axios-mock-adapter")).default;
    const mock = new MockAdapter(axiosInstance);
    mockThemesApi(mock);
    mockParserApi(mock);
    mockAnalysisApi(mock);
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <InnerApp />
                <Toaster position='top-right' />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
