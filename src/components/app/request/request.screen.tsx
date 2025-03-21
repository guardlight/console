import { CONTENT_TYPE_NAME_MAP, ICON_MAP } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    AnalysisRequest,
    Analyzer,
    ContentType,
    Theme,
} from "@/domain/analysis/type";
import { Parser } from "@/domain/parser/type";
import { ThemeConfig } from "@/domain/theme/type";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { PropsWithChildren, useState } from "react";
import { LuDelete } from "react-icons/lu";

type IRequestScreen = {
    parsers: Array<Parser>;
    themeConfigs: Array<ThemeConfig>;
};
export default function RequestScreen({
    parsers,
    themeConfigs,
}: IRequestScreen) {
    const [ar, setAr] = useState<AnalysisRequest>({
        title: "",
        contentType: "book",
        file: {
            content: "",
            mimetype: "",
        },
        themes: [],
    });
    const [steps, setSteps] = useState<Array<number>>([0]);
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
        setAr((prevState) => {
            return {
                ...prevState,
                file: {
                    ...prevState.file,
                    content: content,
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
                          analyzers: theme.analyzers.map((a) => ({
                              ...a,
                              threshold: 0,
                          })),
                      },
                  ];
            return {
                ...prevState,
                themes: themes,
            };
        });
    };

    const navigate = useNavigate();

    const goBackWithReplace = () => {
        navigate({ to: "/", replace: true });
    };

    return (
        <div className='flex flex-1 grow flex-col max-w-3xl space-y-3 my-24'>
            <div>
                <Button
                    variant='outline'
                    className='items-center w-auto'
                    onClick={goBackWithReplace}
                >
                    <LuDelete strokeWidth={1.25} />
                    Cancel Request
                </Button>
            </div>
            <StepLayout
                open={steps.includes(0)}
                index={1}
                title='Analysis Request Title'
                active={steps.includes(0)}
                next={() => addStep(1)}
                canGoNext={ar.title.length > 0}
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
                next={() => addStep(2)}
                canGoNext={ar.file.mimetype.length > 0}
                steps={steps}
            >
                <div className='grid grid-cols-2 gap-3'>
                    {parsers.map((parser) => (
                        <AnalysisMediaType
                            onClick={() => selectMimeType(parser.type)}
                            key={parser.type}
                            parser={parser}
                            selected={ar.file.mimetype === parser.type}
                        />
                    ))}
                </div>
            </StepLayout>
            <StepLayout
                open={steps.includes(2)}
                index={3}
                title='Add Analysis Media Content'
                active={steps.includes(2)}
                next={() => addStep(3)}
                canGoNext={ar.file.content.length > 0}
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
                next={() => addStep(4)}
                canGoNext={ar.themes.length > 0}
                steps={steps}
            >
                <div className='grid grid-cols-2 gap-3'>
                    {themeConfigs.map((theme) => (
                        <ThemeType
                            onClick={() => toggleTheme(theme)}
                            key={theme.id}
                            theme={theme}
                            selected={ar.themes.some((t) => t.id === theme.id)}
                        />
                    ))}
                </div>
            </StepLayout>
            <StepLayout
                open={steps.includes(4)}
                index={5}
                title='Analysis Techniques Used'
                active={steps.includes(4)}
                next={() => addStep(5)}
                canGoNext={true}
                steps={steps}
            >
                <div className='grid grid-cols-2 gap-3'>
                    {Array.from(
                        new Set(
                            ar.themes.flatMap((t) =>
                                t.analyzers.map((a) => a.key)
                            )
                        )
                    ).map((key) => {
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
            </StepLayout>
            <StepLayout
                open={steps.includes(5)}
                index={6}
                title='Submit Analysis Request'
                active={steps.includes(5)}
                next={() => addStep(6)}
                canGoNext={false}
                steps={steps}
            >
                <Summary ar={ar} />
            </StepLayout>
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
            <p className='text-primary opacity-50 text-sm'>
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
            <p className='text-primary opacity-50 text-sm'>
                {theme.description}
            </p>
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
    const selectedStyles: Record<string, string> = {
        true: clsx`border-primary`,
        false: clsx`border-slate-200 hover:border-slate-400`,
    };

    const themeTitles = themes
        .filter((theme) => theme.analyzers.some((a) => a.key === analyzer.key))
        .map((theme) => theme.title);

    return (
        <Card
            className={cn(
                "gap-0 p-3 cursor-pointer",
                selectedStyles[String(selected)]
            )}
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
    next: () => void;
    canGoNext: boolean;
    steps: Array<number>;
};
function StepLayout({
    children,
    open,
    active,
    index,
    title,
    next,
    canGoNext,
    steps,
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
                                <Button disabled={!canGoNext} onClick={next}>
                                    Next Step
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
