import { DataloomLayoutScreen } from "@/components/app/dataloom/dataloom.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom")({
    component: () => <DataloomLayoutScreen />,
    // beforeLoad: () => {
    //     if (DATALOOM_URL === "GL_DATALOOM_URL") {
    //         throw redirect({
    //             to: "/",
    //             search: { page: 1 },
    //         });
    //     }
    // },
});
