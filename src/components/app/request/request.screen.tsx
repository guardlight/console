import {
    CONTENT_TYPE_NAME_MAP,
    ICON_MAP,
    NIL_UUID,
} from "@/components/const/const";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { BackLink } from "@/components/ui/custom/BackLink";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import useGoBack from "@/components/ui/custom/GoBack.hook";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisApi, AnalysisKeys } from "@/domain/analysis/api";
import {
    AnalysisRequest,
    Analyzer,
    ContentType,
    Theme,
} from "@/domain/analysis/type";
import { ParserKeys } from "@/domain/parser/api";
import { Parser } from "@/domain/parser/type";
import { ThemeKeys } from "@/domain/theme/api";
import { ThemeConfig } from "@/domain/theme/type";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

type IRequestScreen = {};
export default function RequestScreen({}: IRequestScreen) {
    const [ar, setAr] = useState<AnalysisRequest>({
        title: "",
        contentType: "book",
        file: {
            content: new Uint8Array(),
            mimetype: "",
        },
        themes: [],
    });
    const [steps, setSteps] = useState<Array<number>>([0]);

    const { invs } = useInvalidateQuery();
    const { back } = useGoBack();

    const { mutate: requestAnalysis, isPending } = useMutation({
        mutationFn: (request: AnalysisRequest) =>
            AnalysisApi.requestAnalysis(request),
        onSuccess: () => {
            invs(AnalysisKeys.analyses().queryKey);
            back();
        },
        onError: () => {
            toast.custom(() => (
                <Alert
                    variant='destructive'
                    className='bg-red-50 border-red-300'
                >
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Saving Problem</AlertTitle>
                    <AlertDescription>
                        Your analysis request could not be submitted. Please try
                        again.
                    </AlertDescription>
                </Alert>
            ));
        },
    });

    const addStep = (n: number) => {
        setSteps((prevState) => [...prevState, n]);
    };

    const updateTitle = (title: string) => {
        setAr((prevState) => {
            return {
                ...prevState,
                title: title,
            };
        });
    };

    const selectContentType = (type: ContentType) => {
        setAr((prevState) => {
            return {
                ...prevState,
                contentType: type,
            };
        });
    };

    const selectMimeType = (type: string) => {
        setAr((prevState) => {
            return {
                ...prevState,
                file: {
                    ...prevState.file,
                    mimetype: type,
                },
            };
        });
    };

    const changeFileContent = (content: string) => {
        const enc = new TextEncoder();
        setAr((prevState) => {
            return {
                ...prevState,
                file: {
                    ...prevState.file,
                    content: enc.encode(content),
                },
            };
        });
    };

    const toggleTheme = (theme: ThemeConfig) => {
        setAr((prevState) => {
            const themes = prevState.themes.some((t) => t.id === theme.id)
                ? prevState.themes.filter((t) => t.id !== theme.id)
                : [
                      ...prevState.themes,
                      {
                          ...theme,
                          analyzers: theme.analyzers
                              .filter(
                                  (a) =>
                                      a.changeStatus === "changed" ||
                                      a.changeStatus === "same"
                              )
                              .map((a) => ({
                                  ...a,
                                  inputs: a.inputs.filter(
                                      (ai) =>
                                          ai.changeStatus === "changed" ||
                                          ai.changeStatus === "same"
                                  ),
                              })),
                      },
                  ];
            return {
                ...prevState,
                themes: themes,
            };
        });
    };

    const submitAnalysisRequest = () => {
        requestAnalysis(ar);
    };

    return (
        <div className='flex flex-1 grow flex-col max-w-3xl space-y-3 my-4 md:my-24'>
            <StepLayout
                open={steps.includes(0)}
                index={1}
                title='Analysis Request Title'
                active={steps.includes(0)}
                nextButton={() => (
                    <Button
                        disabled={!(ar.title.length > 0)}
                        onClick={() => addStep(1)}
                    >
                        Next Step
                    </Button>
                )}
                steps={steps}
            >
                <div className='space-y-3'>
                    <div>
                        <Input
                            placeholder='Enter Media Title'
                            onChange={(e) => updateTitle(e.target.value)}
                            value={ar.title}
                            className='rounded-xl'
                        />
                    </div>
                    <div className='flex flex-row gap-2'>
                        <RequestType
                            onClick={() => selectContentType("book")}
                            type='book'
                            selected={ar.contentType == "book"}
                        />
                        <RequestType
                            onClick={() => selectContentType("movie")}
                            type='movie'
                            selected={ar.contentType == "movie"}
                        />
                        <RequestType
                            onClick={() => selectContentType("series")}
                            type='series'
                            selected={ar.contentType == "series"}
                        />
                        <RequestType
                            onClick={() => selectContentType("lyrics")}
                            type='lyrics'
                            selected={ar.contentType == "lyrics"}
                        />
                    </div>
                </div>
            </StepLayout>
            <StepLayout
                open={steps.includes(1)}
                index={2}
                title='Select Analysis Media Type'
                active={steps.includes(1)}
                nextButton={() => (
                    <Button
                        disabled={!(ar.file.mimetype.length > 0)}
                        onClick={() => addStep(2)}
                    >
                        Next Step
                    </Button>
                )}
                steps={steps}
            >
                <ParserSection ar={ar} selectMimeType={selectMimeType} />
            </StepLayout>
            <StepLayout
                open={steps.includes(2)}
                index={3}
                title='Add Analysis Media Content'
                active={steps.includes(2)}
                nextButton={() => (
                    <Button
                        disabled={!(ar.file.content.length > 0)}
                        onClick={() => addStep(3)}
                    >
                        Next Step
                    </Button>
                )}
                steps={steps}
            >
                {ar.file.mimetype === "freetext" && (
                    <Textarea
                        placeholder='Enter or Paste text content'
                        className='rounded-xl'
                        onChange={(e) => changeFileContent(e.target.value)}
                    />
                )}
                {ar.file.mimetype !== "freetext" && (
                    <div className='border border-slate-200 rounded-2xl p-8 text-center justify-center'>
                        <p className='text-slate-400'>
                            Drag file here to upload
                        </p>
                    </div>
                )}
            </StepLayout>
            <StepLayout
                open={steps.includes(3)}
                index={4}
                title='Select Analysis Themes'
                active={steps.includes(3)}
                nextButton={() => (
                    <Button
                        disabled={!(ar.themes.length > 0)}
                        onClick={() => addStep(4)}
                    >
                        Next Step
                    </Button>
                )}
                steps={steps}
            >
                <ThemesSection ar={ar} toggleTheme={toggleTheme} />
            </StepLayout>
            <StepLayout
                open={steps.includes(4)}
                index={5}
                title='Analysis Techniques Used'
                active={steps.includes(4)}
                nextButton={() => (
                    <Button onClick={() => addStep(5)}>Next Step</Button>
                )}
                steps={steps}
            >
                <AnalyzerThemesOverviewSection ar={ar} />
            </StepLayout>
            <StepLayout
                open={steps.includes(5)}
                index={6}
                title='Submit Analysis Request'
                active={steps.includes(5)}
                nextButton={() => (
                    <Button onClick={() => submitAnalysisRequest()}>
                        {isPending && (
                            <LuLoaderCircle className='animate-spin' />
                        )}
                        Submit Analysis Request
                    </Button>
                )}
                steps={steps}
            >
                <Summary ar={ar} />
            </StepLayout>
            <div>
                <BackLink>
                    <Button variant='cancel'>Cancel Request</Button>
                </BackLink>
            </div>
        </div>
    );
}

type IAnalyzerThemesOverviewSection = {
    ar: AnalysisRequest;
};
function AnalyzerThemesOverviewSection({ ar }: IAnalyzerThemesOverviewSection) {
    const uniqueAnalyzers = useMemo(
        () =>
            Array.from(
                new Set(ar.themes.flatMap((t) => t.analyzers.map((a) => a.key)))
            ),
        [ar.themes]
    );

    if (uniqueAnalyzers.length === 0) {
        return (
            <EmptyList title='Selected themes does not contain any analyzers.' />
        );
    }

    return (
        <div className='grid grid-cols-2 gap-3'>
            {uniqueAnalyzers.map((key) => {
                const analyzer = ar.themes
                    .flatMap((t) => t.analyzers)
                    .find((a) => a.key === key);
                return (
                    <AnalyzerType
                        themes={ar.themes}
                        key={analyzer?.key}
                        analyzer={analyzer!}
                        selected={true}
                    />
                );
            })}
        </div>
    );
}

type IThemesSection = {
    toggleTheme: (theme: ThemeConfig) => void;
    ar: AnalysisRequest;
};
function ThemesSection({ toggleTheme, ar }: IThemesSection) {
    const { data, error, isFetching } = useQuery(ThemeKeys.themes());

    if (isFetching) {
        return <DataLoaderSpinner title='Loading your themes.' />;
    }

    if (Boolean(error) || !!!data) {
        return (
            <ErrorSoftner
                title="Couldn't load your themes."
                queryKeys={ThemeKeys.themes().queryKey}
            />
        );
    }

    if (!data || data.filter((theme) => theme.id !== NIL_UUID).length === 0)
        return <EmptyList title='No themes created yet.' />;

    return (
        <div className='grid grid-cols-2 gap-3'>
            {data
                .filter((t) => t.id !== NIL_UUID)
                .map((theme) => (
                    <ThemeType
                        onClick={() => toggleTheme(theme)}
                        key={theme.id}
                        theme={theme}
                        selected={ar.themes.some((t) => t.id === theme.id)}
                    />
                ))}
        </div>
    );
}

type IParsersSection = {
    selectMimeType: (type: string) => void;
    ar: AnalysisRequest;
};
function ParserSection({ selectMimeType, ar }: IParsersSection) {
    const { data, error, isFetching } = useQuery(ParserKeys.parsers());

    if (isFetching) {
        return <DataLoaderSpinner title='Loading your parsers.' />;
    }

    if (Boolean(error) || !!!data) {
        return (
            <ErrorSoftner
                title="Couldn't load your parsers."
                queryKeys={ThemeKeys.themes().queryKey}
            />
        );
    }

    if (!data || data.length === 0)
        return <EmptyList title='No parsers configured.' />;

    return (
        <div className='grid grid-cols-2 gap-3'>
            {data.map((parser) => (
                <AnalysisMediaType
                    onClick={() => selectMimeType(parser.type)}
                    key={parser.type}
                    parser={parser}
                    selected={ar.file.mimetype === parser.type}
                />
            ))}
        </div>
    );
}

type IRequestType = {
    type: ContentType;
    selected: boolean;
};
function RequestType({
    type,
    selected,
    ...props
}: IRequestType & React.HTMLAttributes<HTMLDivElement>) {
    const IconComponent = ICON_MAP[type];
    const text = CONTENT_TYPE_NAME_MAP[type];

    const selectedStyles: Record<string, string> = {
        true: clsx`border-primary`,
        false: clsx`border-slate-200 hover:border-slate-400`,
    };
    return (
        <div
            className={cn(
                `border px-4 py-1.5 rounded-xl flex flex-row items-center gap-2 cursor-pointer `,
                selectedStyles[String(selected)]
            )}
            {...props}
        >
            <IconComponent className='size-4' strokeWidth={1.5} />
            <span className='text-sm'>{text}</span>
        </div>
    );
}

type IAnalysisMediaType = {
    parser: Parser;
    selected: boolean;
};
function AnalysisMediaType({
    parser,
    selected,
    ...props
}: IAnalysisMediaType & React.HTMLAttributes<HTMLDivElement>) {
    const selectedStyles: Record<string, string> = {
        true: clsx`border-primary`,
        false: clsx`border-slate-200 hover:border-slate-400`,
    };
    return (
        <Card
            className={cn(
                "gap-0 p-3 cursor-pointer",
                selectedStyles[String(selected)]
            )}
            {...props}
        >
            <CardHeader className='text-lg px-0'>{parser.name}</CardHeader>
            <p className='text-muted-foreground text-sm'>
                {parser.description}
            </p>
        </Card>
    );
}

type IThemeType = {
    theme: ThemeConfig;
    selected: boolean;
};
function ThemeType({
    theme,
    selected,
    ...props
}: IThemeType & React.HTMLAttributes<HTMLDivElement>) {
    const selectedStyles: Record<string, string> = {
        true: clsx`border-primary`,
        false: clsx`border-slate-200 hover:border-slate-400`,
    };
    return (
        <Card
            className={cn(
                "gap-0 p-3 cursor-pointer",
                selectedStyles[String(selected)]
            )}
            {...props}
        >
            <CardHeader className='text-lg px-0'>{theme.title}</CardHeader>
            <p className='text-muted-foreground text-sm'>{theme.description}</p>
        </Card>
    );
}

type ISummary = {
    ar: AnalysisRequest;
};
function Summary({ ar }: ISummary) {
    const analyses = Array.from(
        new Set(ar.themes.flatMap((t) => t.analyzers.map((a) => a.key)))
    )
        .map((key) => {
            const analyzer = ar.themes
                .flatMap((t) => t.analyzers)
                .find((a) => a.key === key);
            return analyzer?.name;
        })
        .join(" and ");

    return (
        <div className='flex flex-col'>
            <p className='text-gray-500 text-sm'>
                Guardlight will perform{" "}
                <span className='font-semibold text-primary'>{analyses}</span>{" "}
                on{" "}
                <span className='font-semibold text-primary'>{ar.title}</span>{" "}
                provided by{" "}
                <span className='font-semibold text-primary'>
                    {ar.file.mimetype}
                </span>{" "}
                media content.
            </p>
            <p className='text-gray-500 text-sm py-1'>
                The analyses might take a moment to complete. Go and grab a
                coffee and we will let you know when all the analyses is
                complete.
            </p>
        </div>
    );
}

type IAnalyzerType = {
    analyzer: Analyzer;
    themes: Array<Theme>;
    selected: boolean;
};
function AnalyzerType({
    analyzer,
    selected,
    themes,
    ...props
}: IAnalyzerType & React.HTMLAttributes<HTMLDivElement>) {
    const themeTitles = themes
        .filter((theme) => theme.analyzers.some((a) => a.key === analyzer.key))
        .map((theme) => theme.title);

    return (
        <Card
            className={cn("gap-0 p-3 border-dashed border-primary")}
            {...props}
        >
            <CardHeader className='text-lg px-0'>{analyzer.name}</CardHeader>
            <p className='text-primary opacity-50 text-sm'>
                {analyzer.description}
            </p>
            <div className='flex flex-row gap-1 mt-3'>
                {themeTitles.map((tt) => (
                    <span className='text-xs border border-primary text-primary opacity-40 px-1 py-0.5 rounded-md'>
                        {tt}
                    </span>
                ))}
            </div>
        </Card>
    );
}

type IStepLayout = {
    open: boolean;
    active: boolean;
    index: number;
    title: string;
    nextButton: () => ReactNode;
    steps: Array<number>;
};
function StepLayout({
    children,
    open,
    active,
    index,
    title,
    steps,
    nextButton,
}: PropsWithChildren & IStepLayout) {
    const activeStyles: Record<string, string> = {
        true: clsx`bg-primary text-white`,
        false: clsx`border border-primary`,
    };

    return (
        <div className='flex flex-row space-x-5'>
            <div className='flex flex-col items-center space-y-3'>
                <div
                    className={cn(
                        "text-lg rounded-full flex items-center justify-center w-10 h-10",
                        activeStyles[String(active)]
                    )}
                >
                    {index}
                </div>
                {open && (
                    <div className='border border-primary opacity-50 flex grow rounded-full'></div>
                )}
            </div>
            <div className='flex flex-col mb-3 w-full'>
                <p className='text-xl tracking-wider h-10 flex items-center text-center'>
                    {title}
                </p>
                {open && (
                    <div className='my-3 w-full'>
                        {children}
                        {steps[steps.length - 1] === index - 1 && (
                            <div className='flex justify-end mt-3'>
                                {nextButton()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
