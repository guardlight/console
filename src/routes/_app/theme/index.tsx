import ThemeListScreen from "@/components/app/theme/theme-list.screen";
import { NIL_UUID } from "@/components/const/const";
import { ThemeConfig } from "@/domain/theme/type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/theme/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ThemeListScreen />;
}

export const THEME_CONFIGS: ThemeConfig[] = [
    {
        id: NIL_UUID,
        title: "",
        description: "",
        analyzers: [
            {
                key: "word_search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                name: "Word Search",
                changeStatus: "new",
                inputs: [
                    {
                        key: "strict_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words in this list will immediatly flag the content. Seperate words or phrases with a comma (,)",
                        name: "Strict Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "sentiment_analysis",
                description:
                    "Performs analysis on phrases where the following words/phrases are part of in the media content provided. The media content will be flagged if the combined sentiment is more negative than the threshold provided.",
                name: "Sentiment Analysis",
                changeStatus: "new",
                inputs: [
                    {
                        key: "contextual_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words or phrases in this list will be scanned to check if it is positive, negative or neutral.",
                        name: "Contextual Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
        ],
    },
    {
        id: "3906e11c-67bd-46ae-9fb8-e1629ac6ed86",
        title: "Acts of Violence",
        description: "",
        analyzers: [
            {
                key: "word_search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                name: "Word Search",
                changeStatus: "new",
                inputs: [
                    {
                        key: "strict_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words in this list will immediatly flag the content.",
                        name: "Strict Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "sentiment_analysis",
                description:
                    "Performs analysis on phrases where the following words/phrases are part of in the media content provided. The media content will be flagged if the combined sentiment is more negative than the threshold provided.",
                name: "Sentiment Analysis",
                changeStatus: "changed",
                inputs: [
                    {
                        key: "contextual_words",
                        value: "",
                        changeStatus: "same",
                        description:
                            "Words or phrases in this list will be scanned to check if it is positive, negative or neutral.",
                        name: "Contextual Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "removed",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "ai_gpt_3o",
                description: "EMPTY",
                name: "EMPTY",
                changeStatus: "removed",
                inputs: [
                    {
                        key: "prompt",
                        value: "",
                        changeStatus: "removed",
                        description: "REMOVED",
                        name: "REMOVED",
                        type: "REMOVED",
                    },
                ],
            },
        ],
    },
    {
        id: "6f38fbd4-0011-49ce-bb81-1522198e99af",
        title: "Relegious Sensitivity",
        description: "",
        analyzers: [],
    },
];
