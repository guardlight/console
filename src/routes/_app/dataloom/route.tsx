import { DataloomLayoutScreen } from "@/components/app/dataloom/dataloom.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dataloom")({
    component: () => <DataloomLayoutScreen />,
});
