export type AnalysisStatus = "waiting" | "inprogress" | "finished" | "error";
export type ContentType = "book" | "movie" | "series" | "lyrics" | "other";
export type RequestOrigin = "user" | "system" | "dataloom" | "external";

export type ScoreCountStatus = "BAD" | "GOOD" | "MIXED" | "NEUTRAL";
export class ScoreCount {
    total: number;
    overThreshold: number;
    underThreshold: number;
    zeroScoreCount: number;

    constructor(
        total: number,
        overThreshold: number,
        underThreshold: number,
        zeroScoreCount: number
    ) {
        this.total = total;
        this.overThreshold = overThreshold; // Good
        this.underThreshold = underThreshold; // Bad
        this.zeroScoreCount = zeroScoreCount; // Neutral
    }

    status(): ScoreCountStatus {
        if (this.total === 0 || this.zeroScoreCount === this.total) {
            return "NEUTRAL";
        }

        if (this.overThreshold === this.total) {
            return "GOOD";
        } else if (this.underThreshold === this.total) {
            return "BAD";
        } else if (this.overThreshold > 0 && this.underThreshold > 0) {
            return "MIXED";
        } else {
            return "NEUTRAL";
        }
    }
}

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
    reporter: Reporter;
};

export type Reporter = {
    threshold: number;
    comments: string;
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
    scoreCount: ScoreCount;
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
    other: ["Documents", "Papers", "Other"],
};
