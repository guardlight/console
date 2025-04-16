export type AnalysisStatus = "waiting" | "inprogress" | "finished" | "error";
export type ContentType = "book" | "movie" | "series" | "lyrics";

// Analysis Request

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
    name: string;
    description: string;
    inputs: Array<AnalyzerInput>;
};

export type AnalyzerInput = {
    key: string;
    value: string;
};

// Analysis Results

export type AnalysisRequestResultPaginated = {
    limit: number;
    page: number;
    totalPages: number;
    analyses: Array<AnalysisRequestResult>;
};

export type AnalysisRequestResult = {
    id: string;
    title: string;
    contentType: ContentType;
    themes: Array<ThemeResult>;
    createdAt: Date;
};

export type ThemeResult = {
    id: string;
    title: string;
    analyzers: Array<AnalyzerResult>;
};

export type AnalyzerResult = {
    key: string;
    name: string;
    status: AnalysisStatus;
    score: number;
    content: Array<string>;
    inputs: Array<AnalyzerInputResult>;
    jobs: Array<JobProgress>;
};

export type AnalyzerInputResult = {
    key: string;
    name: string;
    value: string;
};

export type JobProgress = {
    status: AnalysisStatus;
};

export const NIL_ANALYSIS_RESULT: AnalysisRequestResult = {
    id: "",
    title: "",
    contentType: "book",
    themes: [],
    createdAt: new Date(),
};

// Analysis Results Basic

export type AnalysisRequestResultBasic = {
    id: string;
    title: string;
    contentType: ContentType;
    overThreshold: boolean;
    status: AnalysisStatus;
    percentageCompleted: number;
    createdAt: Date;
};
