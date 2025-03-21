export type AnalysisStatus = "waiting" | "inprogress" | "finished" | "error";
export type ContentType = "book" | "movie" | "series" | "lyrics";

export type AnalysisRequestResult = {
    id: string;
    title: string;
    contentType: ContentType;
    analysis: Array<Analysis>;
};

export type Analysis = {
    id: string;
    analyzerKey: string;
    themeId: string;
    status: AnalysisStatus;
    threshold: number;
    score: number;
    content: Array<string>;
    inputs: Array<AnalysisInput>;
    jobs: Array<JobProgress>;
};

export type AnalysisInput = {
    key: string;
    value: string;
};

export type JobProgress = {
    status: AnalysisStatus;
};

export type AnalysisRequest = {
    title: string;
    contentType: ContentType;
    file: File;
    themes: Array<Theme>;
};

export type File = {
    content: string;
    mimetype: string;
};

export type Theme = {
    title: string;
    id: string;
    analyzers: Array<Analyzer>;
};

export type Analyzer = {
    key: string;
    threshold: number;
    name: string;
    description: string;
    inputs: Array<AnalyzerInput>;
};

export type AnalyzerInput = {
    key: string;
    value: string;
};
