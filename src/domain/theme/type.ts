import { NIL_UUID } from "@/components/const/const";

export type ChangeStatus = "new" | "removed" | "changed" | "same";

export type ThemeConfig = {
    id: string;
    title: string;
    description: string;
    analyzers: Array<ThemeAnalyzer>;
};

export type ThemeAnalyzer = {
    key: string;
    name: string;
    description: string;
    changeStatus: ChangeStatus;
    inputs: Array<ThemeAnalyzerInput>;
};

export type ThemeAnalyzerInput = {
    name: string;
    description: string;
    key: string;
    value: string;
    type: string;
    changeStatus: ChangeStatus;
};

export const NIL_THEME_CONFIG: ThemeConfig = {
    id: NIL_UUID,
    title: "",
    description: "",
    analyzers: [],
};

export type ThemeConfigCreateResponse = {};
