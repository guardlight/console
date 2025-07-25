export type AnalysisStatus = "waiting" | "inprogress" | "finished" | "error";
export type ContentType = "book" | "movie" | "series" | "lyrics";
export type RequestOrigin = "user" | "system" | "dataloom" | "external";

// Analysis Request

export type AnalysisRequest = {
    title: string;
    contentType: ContentType;
    category: string;
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
    category: string;
    requestOrigin: RequestOrigin;
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
    id: string;
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
    category: "",
    requestOrigin: "user",
    themes: [],
    createdAt: new Date(),
};

// Analysis Results Basic

export type AnalysisRequestResultBasic = {
    id: string;
    analysisIds: Array<string>;
    title: string;
    category: string;
    contentType: ContentType;
    overThreshold: boolean;
    status: AnalysisStatus;
    percentageCompleted: number;
    createdAt: Date;
};

// Analysis Update

export type AnalysisUpdateScore = {
    id: string;
    score: number;
};

export const GENRE_MAP: Record<string, Array<string>> = {
    book: [
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Thriller",
        "Romance",
        "Historical",
        "Horror",
        "Biography",
        "Self-Help",
        "Young Adult",
        "Non-Fiction",
        "Classic",
        "Graphic Novel",
        "Poetry",
        "Adventure",
    ],
    movie: [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "Documentary",
        "Animation",
        "Crime",
        "Adventure",
        "Biography",
        "Family",
        "Musical",
        "Western",
        "Superhero",
    ],
    series: [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "Documentary",
        "Animation",
        "Crime",
        "Adventure",
        "Biography",
        "Family",
        "Musical",
        "Western",
        "Superhero",
    ],
    lyrics: [
        "Pop",
        "Rock",
        "Hip Hop",
        "R&B",
        "Country",
        "Jazz",
        "Blues",
        "Reggae",
        "Metal",
        "Folk",
        "Electronic",
        "Soul",
        "Punk",
        "Classical",
        "Dance",
    ],
};
