import MockAdapter from "axios-mock-adapter";
import { UrnKeyValueList } from "../commons/type";

export const mockDataloomStatisticsApi = (mock: MockAdapter) => {
    mock.onGet("data/dashboard/urn:").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                // const random = Math.random();
                // if (random < 1 / 3) {
                resolve([200, data]);
                // } else if (random < 2 / 3) {
                //     resolve([200, []]);
                // } else {
                //     resolve([500, []]);
                // }
            }, 1000);
        });
    });
};

const data: UrnKeyValueList = [
    { urn: "urn:dataloom:books:statistic:processed:fantasy", value: "2575" },
    {
        urn: "urn:dataloom:books:statistic:processed:classiccrimemystery",
        value: "1158",
    },
    {
        urn: "urn:dataloom:books:statistic:processed:cozymystery",
        value: "1420",
    },
    { urn: "urn:dataloom:books:statistic:processed:romans", value: "3427" },
    { urn: "urn:dataloom:books:statistic:processed:thriller", value: "742" },
    { urn: "urn:dataloom:books:statistic:processed:literatuur", value: "1790" },
    {
        urn: "urn:dataloom:books:statistic:processed:sciencefiction",
        value: "1970",
    },
    { urn: "urn:dataloom:books:statistic:processed:truecrime", value: "17" },
    {
        urn: "urn:dataloom:books:statistic:processed:psychthriller",
        value: "68",
    },
    { urn: "urn:dataloom:books:statistic:processed:youngadult", value: "18" },
    {
        urn: "urn:dataloom:books:statistic:processed:historycrimemystery",
        value: "1266",
    },
    { urn: "urn:dataloom:books:statistic:processed:mystery", value: "1729" },
    { urn: "urn:dataloom:books:statistic:processed:total", value: "16180" },
    {
        urn: "urn:dataloom:books:statistic:downloaded:annasarchive:fantasy",
        value: "16",
    },
    {
        urn: "urn:dataloom:books:statistic:downloaded:annasarchive:total",
        value: "16",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:fantasy",
        value: "3463",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:classiccrimemystery",
        value: "108",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:cozymystery",
        value: "770",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:romans",
        value: "1428",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:thriller",
        value: "136",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:sciencefiction",
        value: "1319",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:literatuur",
        value: "4242",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:psychthriller",
        value: "1",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:historycrimemystery",
        value: "548",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:mystery",
        value: "4980",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:total",
        value: "16995",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:fantasy",
        value: "3463",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:classiccrimemystery",
        value: "108",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:cozymystery",
        value: "770",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:romans",
        value: "1428",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:thriller",
        value: "136",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:sciencefiction",
        value: "1319",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:literatuur",
        value: "4242",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:psychthriller",
        value: "1",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:historycrimemystery",
        value: "548",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:mystery",
        value: "4980",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:total",
        value: "16995",
    },
];
