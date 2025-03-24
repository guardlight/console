import { HomeScreen } from "@/components/app/home/home.screen";
import { AnalysisRequestResult } from "@/domain/analysis/type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
    loader: () => Promise.resolve(ANALYSES),
});

function RouteComponent() {
    return <HomeScreen analyses={Route.useLoaderData()} />;
}

const ANALYSES: Array<AnalysisRequestResult> = [
    {
        id: "d3bcda0f-e731-4de1-ae4a-3e604168ec63",
        title: "Alice in Wonderland",
        contentType: "book",
        analysis: [
            {
                id: "837d3c79-dd14-456d-a97f-4464ffc12b15",
                analyzerKey: "word_search",
                themeId: "25681972-0638-4a8d-8144-105b403456cd",
                status: "inprogress",
                threshold: 0.9,
                score: 0.24,
                content: [],
                inputs: [],
                jobs: [
                    {
                        status: "inprogress",
                    },
                    {
                        status: "finished",
                    },
                ],
            },
        ],
    },
    {
        id: "2cbb1156-6211-4580-b770-89d8ea65c003",
        title: "Jack Reacher",
        contentType: "series",
        analysis: [
            {
                id: "86a296ee-0efc-496f-97cd-fb57164e0844",
                analyzerKey: "word_search",
                themeId: "25681972-0638-4a8d-8144-105b403456cd",
                status: "waiting",
                threshold: 0.1,
                score: 0,
                content: [],
                inputs: [],
                jobs: [],
            },
        ],
    },
    {
        id: "16cacb82-56aa-4eb7-b49f-c95d87211cbe",
        title: "Alice in Wonderland",
        contentType: "movie",
        analysis: [
            {
                id: "ca4f12b6-2be5-4813-a271-5dfdfc96a578",
                analyzerKey: "word_search",
                themeId: "25681972-0638-4a8d-8144-105b403456cd",
                status: "finished",
                threshold: 0,
                score: -0.6,
                content: [],
                inputs: [],
                jobs: [],
            },
        ],
    },
    {
        id: "b15697a8-e83e-489f-b52d-eeb7c3b38e48",
        title: "American Horror Show",
        contentType: "series",
        analysis: [
            {
                id: "09a30c53-ee75-40ac-8e98-e5299ed4abdd",
                analyzerKey: "word_search",
                themeId: "25681972-0638-4a8d-8144-105b403456cd",
                status: "finished",
                threshold: 0,
                score: 1,
                content: [],
                inputs: [],
                jobs: [],
            },
        ],
    },
];
