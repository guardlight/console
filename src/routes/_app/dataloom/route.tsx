import { DataloomLayoutScreen } from "@/components/app/dataloom/dataloom.screen";
import { DATALOOM_URL } from "@/domain/http/api";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom")({
    component: () => <DataloomLayoutScreen />,
    beforeLoad: () => {
        if (DATALOOM_URL === "GL_DATALOOM_URL") {
            throw redirect({
                to: "/",
                search: { page: 1 },
            });
        }
    },
});
