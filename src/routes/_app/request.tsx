import RequestScreen from "@/components/app/request/request.screen";
import { Parser } from "@/domain/parser/type";
import { ThemeConfig } from "@/domain/theme/type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/request")({
    component: RouteComponent,
});

function RouteComponent() {
    return <RequestScreen parsers={PARSERS} themeConfigs={THEME_CONFIGS} />;
}

const PARSERS: Array<Parser> = [
    {
        type: "freetext",
        name: "Freetext",
        description:
            "Allows you to enter any text content without a specific file. Usually copied text copied from the web.",
    },
    {
        type: "epub",
        name: "EPUB",
        description:
            "A digital format commonly used for eBooks. Usually a file with .epub at the end.",
    },
];

const THEME_CONFIGS: Array<ThemeConfig> = [
    {
        id: "f305406f-9e05-4ed4-95da-20eaf7cb2c49",
        title: "Religious Sensitivity",
        description:
            "Analyze the media content where the religion is used in a bad light",
        analyzers: [
            {
                key: "word_search",
                name: "Word Search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                inputs: [{ key: "strict_words", value: "By the Gods" }],
            },
            {
                key: "sentiment_analysis",
                name: "Sentiment Analysis",
                description:
                    "Determines the emotional tone of the media content, indentifying wether it's positive, negtive or neutral.",
                inputs: [{ key: "strict_words", value: "" }],
            },
        ],
    },
    {
        id: "755fe42e-9f86-4921-804f-bbd8b7c869ac",
        title: "Acts of Violence",
        description:
            "Analyze the media content for acts of violence, such as fighting",
        analyzers: [
            {
                key: "word_search",
                name: "Word Search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                inputs: [{ key: "strict_words", value: "Hitting" }],
            },
        ],
    },
];
