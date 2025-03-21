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
    inputs: Array<ThemeAnalyzerInput>;
};

export type ThemeAnalyzerInput = {
    key: string;
    value: string;
};
