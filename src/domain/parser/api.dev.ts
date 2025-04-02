import MockAdapter from "axios-mock-adapter";
import { Parser } from "./type";

export const mockParserApi = (mock: MockAdapter) => {
    mock.onGet("/parser").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 3) {
                    resolve([200, PARSERS]);
                } else if (random < 2 / 3) {
                    resolve([200, []]);
                } else {
                    resolve([500, []]);
                }
            }, 1000);
        });
    });
};

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
