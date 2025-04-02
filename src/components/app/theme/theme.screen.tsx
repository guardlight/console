import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/ui/custom/BackLink";
import EmptyList from "@/components/ui/custom/EmptyList";
import useGoBack from "@/components/ui/custom/GoBack.hook";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { ThemeKeys, ThemesApi } from "@/domain/theme/api";
import {
    ChangeStatus,
    NIL_THEME_CONFIG,
    ThemeAnalyzer,
    ThemeAnalyzerInput,
    ThemeConfig,
} from "@/domain/theme/type";
import { cn } from "@/lib/utils";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

type IThemeScreen = {
    themeConfigId: string;
};
export default function ThemeScreen({ themeConfigId }: IThemeScreen) {
    const { data, error } = useQuery(ThemeKeys.themes());

    const [localTheme, setLocalTheme] = useState(
        data?.find((t) => t.id === themeConfigId) || NIL_THEME_CONFIG
    );

    const [errors, setErrors] = useState<Array<string>>([]);

    const updateThemeTitle = (title: string) => {
        setLocalTheme((prevState) => ({
            ...prevState,
            title,
        }));
    };

    const updateThemeDescription = (description: string) => {
        setLocalTheme((prevState) => ({
            ...prevState,
            description,
        }));
    };

    const updateAnalyzerInput = (
        analyzerKey: string,
        input: ThemeAnalyzerInput
    ) => {
        setLocalTheme((prevState) => ({
            ...prevState,
            analyzers: prevState.analyzers.map((a) => {
                if (a.key === analyzerKey) {
                    return {
                        ...a,
                        inputs: a.inputs.map((ai) =>
                            ai.key === input.key ? input : ai
                        ),
                    };
                }
                return a;
            }),
        }));
    };

    const updateAnalyzerInTheme = (analyzer: ThemeAnalyzer) => {
        setLocalTheme((prevState) => ({
            ...prevState,
            analyzers: prevState.analyzers.map((a) => {
                if (a.key === analyzer.key) {
                    return analyzer;
                }
                return a;
            }),
        }));
    };

    const { invs } = useInvalidateQuery();
    const { back } = useGoBack();

    const { mutate: updateThemeConfig, isPending } = useMutation({
        mutationFn: (tc: ThemeConfig) => ThemesApi.createTheme(tc),
        onSuccess: () => {
            invs(ThemeKeys.themes().queryKey);
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
                        Your theme could not be saved. Please try again.
                    </AlertDescription>
                </Alert>
            ));
        },
    });

    if (error || !!!data) {
        return <Navigate to='..' />;
    }

    const saveTheme = () => {
        const valErrors: Array<string> = [];
        if (localTheme.title.trim().length === 0) {
            if (!valErrors.includes("theme.title")) {
                valErrors.push("theme.title");
            }
        } else {
            valErrors.splice(valErrors.indexOf("theme.title"), 1);
        }

        if (valErrors.length === 0) {
            updateThemeConfig({
                ...localTheme,
                analyzers: localTheme.analyzers
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
            });
        }

        setErrors(valErrors);
    };

    const inUseAnalyzers = useMemo(() => {
        return localTheme.analyzers.filter(
            (analyzer) => analyzer.changeStatus !== "new"
        );
    }, [localTheme.analyzers]);

    const newAnalyzers = useMemo(() => {
        return localTheme.analyzers.filter(
            (analyzer) => analyzer.changeStatus === "new"
        );
    }, [localTheme.analyzers]);

    return (
        <TooltipProvider>
            <div className='flex flex-1 grow flex-col max-w-2xl space-y-4 mb-24 mt-4 md:mt-16'>
                <h2 className='text-2xl'>Theme Configuration</h2>

                <div className='space-y-2'>
                    <Input
                        placeholder='Enter theme name'
                        value={localTheme.title}
                        onChange={(e) => updateThemeTitle(e.target.value)}
                    />
                    {errors.includes("theme.title") && (
                        <p className='text-sm text-red-600 ml-3'>
                            Theme title is required.
                        </p>
                    )}

                    <Textarea
                        placeholder='Enter theme description (Optional)'
                        value={localTheme.description}
                        onChange={(e) => updateThemeDescription(e.target.value)}
                    />
                    <span className='text-sm text-muted-foreground ml-3'>
                        This name will be displayed when creating a Analysis
                        Request
                    </span>
                </div>
                <div className='flex justify-end'>
                    <AddAnalyzerSheet
                        analyzers={newAnalyzers}
                        addAnalyzer={updateAnalyzerInTheme}
                    />
                </div>
                <div className='space-y-4'>
                    {inUseAnalyzers.length === 0 && (
                        <EmptyList title='No analyzers added yet.' />
                    )}
                    {inUseAnalyzers.map((at) => {
                        if (at.changeStatus === "removed") {
                            return (
                                <AnalyzerConfigRemoved
                                    key={at.key}
                                    analyzerConfig={at}
                                />
                            );
                        }
                        return (
                            <AnalyzerConfig
                                key={at.key}
                                analyzerConfig={at}
                                removeAnalyzer={updateAnalyzerInTheme}
                                updateAnalyzerInput={updateAnalyzerInput}
                            />
                        );
                    })}
                </div>
                <div className='flex justify-between items-center'>
                    <BackLink disabled={isPending}>
                        <Button disabled={isPending} variant='cancel'>
                            Cancel configuration
                        </Button>
                    </BackLink>
                    <Button
                        // type=""
                        disabled={isPending}
                        onClick={saveTheme}
                        className=''
                    >
                        <LuLoaderCircle
                            strokeWidth={1.25}
                            className={cn(
                                "animate-spin",
                                isPending ? "visible" : "hidden"
                            )}
                        />
                        Save Theme
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    );
}

type IAddAnalyzerSheet = {
    analyzers: Array<ThemeAnalyzer>;
    addAnalyzer: (analyzer: ThemeAnalyzer) => void;
};
function AddAnalyzerSheet({ analyzers, addAnalyzer }: IAddAnalyzerSheet) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' size='sm'>
                    Add analyzer
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Available analyzers:</SheetTitle>
                    <div className='space-y-4'>
                        {analyzers.length === 0 && (
                            <EmptyList title='All analyzers added.' />
                        )}
                        {analyzers.map((at) => (
                            <UnusedConfig
                                key={at.key}
                                addAnalyzer={addAnalyzer}
                                analyzerConfig={at}
                            />
                        ))}
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

const changeStatusStyles: Record<ChangeStatus, string> = {
    new: clsx`border-blue-400 text-blue-400`,
    changed: clsx`border-amber-400 text-amber-400`,
    removed: clsx`border-red-400 text-red-400`,
    same: clsx`opacity-0`,
};

type IAnalyzerConfig = {
    analyzerConfig: ThemeAnalyzer;
    removeAnalyzer: (analyzer: ThemeAnalyzer) => void;
    updateAnalyzerInput: (
        analyzerKey: string,
        input: ThemeAnalyzerInput
    ) => void;
};
function AnalyzerConfig({
    analyzerConfig,
    removeAnalyzer,
    updateAnalyzerInput,
}: IAnalyzerConfig) {
    const removeFromTheme = () => {
        removeAnalyzer({
            ...analyzerConfig,
            changeStatus: "new",
            inputs: analyzerConfig.inputs.map((i) => ({
                ...i,
                value: "",
                changeStatus: "new",
            })),
        });
    };

    return (
        <div className='p-4 rounded-xl border border-dashed border-blue-300 space-y-4'>
            <div>
                <div className='flex flex-row justify-between'>
                    <div className='space-x-1'>
                        <span className='text-xl font-medium'>
                            {analyzerConfig.name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            Analyzer
                        </span>
                    </div>
                    <div>
                        <span
                            className={cn(
                                "text-xs px-1 capitalize rounded-sm border",
                                changeStatusStyles[analyzerConfig.changeStatus]
                            )}
                        >
                            {analyzerConfig.changeStatus}
                        </span>
                    </div>
                </div>
                <p className='text-sm font-light text-muted-foreground'>
                    {analyzerConfig.description}
                </p>
            </div>
            <div className='space-y-3'>
                {analyzerConfig.inputs.map((inp) => {
                    if (inp.changeStatus === "removed") {
                        return (
                            <AnalyzerInputRemoved key={inp.key} input={inp} />
                        );
                    }
                    return (
                        <AnalyzerInput
                            key={inp.key}
                            input={inp}
                            analyzerKey={analyzerConfig.key}
                            updateAnalyzerInput={updateAnalyzerInput}
                        />
                    );
                })}
            </div>
            <div className='flex justify-end'>
                <Button variant='cancel' size='sm' onClick={removeFromTheme}>
                    Remove Analyzer
                </Button>
            </div>
        </div>
    );
}

type IAnalyzerConfigRemoved = {
    analyzerConfig: ThemeAnalyzer;
};
function AnalyzerConfigRemoved({ analyzerConfig }: IAnalyzerConfigRemoved) {
    return (
        <div className='p-4 rounded-xl border border-dashed border-blue-300 space-y-4'>
            <div>
                <div className='flex flex-row justify-between'>
                    <div className='space-x-1'>
                        <span className='text-xl font-medium'>
                            {analyzerConfig.key}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            Analyzer
                        </span>
                    </div>
                    <div>
                        <span
                            className={cn(
                                "text-xs px-1 capitalize rounded-sm border",
                                changeStatusStyles[analyzerConfig.changeStatus]
                            )}
                        >
                            {analyzerConfig.changeStatus}
                        </span>
                    </div>
                </div>
                <p className='text-sm font-light text-muted-foreground'>
                    This analyzer has been removed and will be automically
                    removed from your theme config once saved.
                </p>
            </div>
            <div className='space-y-3'>
                {analyzerConfig.inputs.map((inp) => {
                    if (inp.changeStatus === "removed") {
                        return (
                            <AnalyzerInputRemoved key={inp.key} input={inp} />
                        );
                    }
                    return (
                        <AnalyzerInput
                            key={inp.key}
                            input={inp}
                            analyzerKey={analyzerConfig.key}
                            updateAnalyzerInput={() => {}}
                        />
                    );
                })}
            </div>
        </div>
    );
}

type IAnalyzerInput = {
    input: ThemeAnalyzerInput;
    analyzerKey: string;
    updateAnalyzerInput: (
        analyzerKey: string,
        input: ThemeAnalyzerInput
    ) => void;
};
function AnalyzerInput({
    input,
    analyzerKey,
    updateAnalyzerInput,
}: IAnalyzerInput) {
    const updateValue = (val: string) => {
        updateAnalyzerInput(analyzerKey, {
            ...input,
            value: val,
            changeStatus: "changed",
        });
    };

    const getInputArea = () => {
        if (input.type === "textarea") {
            return (
                <Textarea
                    value={input.value}
                    onChange={(e) => updateValue(e.target.value)}
                />
            );
        } else {
            return (
                <div className='flex space-x-3'>
                    <Slider
                        defaultValue={[0]}
                        min={-1}
                        max={1}
                        step={0.01}
                        value={[+input.value]}
                        onValueChange={(e) => updateValue(e[0].toString())}
                    />
                    <span className='text-sm'>{input.value}</span>
                </div>
            );
        }
    };

    return (
        <div className='space-y-1'>
            <div className='flex flex-row justify-between'>
                <div className='font-medium'>{input.name}</div>
                <div className=''>
                    <span
                        className={cn(
                            "text-xs px-1 rounded-sm border capitalize",
                            changeStatusStyles[input.changeStatus]
                        )}
                    >
                        {input.changeStatus}
                    </span>
                </div>
            </div>
            <p className='text-sm font-light text-muted-foreground'>
                {input.description}
            </p>
            <div className='mt-2'>{getInputArea()}</div>
        </div>
    );
}

type IAnalyzerInputRemoved = {
    input: ThemeAnalyzerInput;
};
function AnalyzerInputRemoved({ input }: IAnalyzerInputRemoved) {
    return (
        <div className='space-y-1'>
            <div className='flex flex-row justify-between'>
                <div className='font-medium'>{input.key}</div>
                <div className=''>
                    <Tooltip open={input.changeStatus === "removed"}>
                        <TooltipTrigger asChild>
                            <span
                                className={cn(
                                    "text-xs px-1 rounded-sm border capitalize",
                                    changeStatusStyles[input.changeStatus]
                                )}
                            >
                                {input.changeStatus}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side='right' sticky='always'>
                            <p className='w-56'>
                                This analyzer input has been removed and will be
                                automically removed from your theme config once
                                saved.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

type IUnusedConfig = {
    analyzerConfig: ThemeAnalyzer;
    addAnalyzer: (analyzer: ThemeAnalyzer) => void;
};
function UnusedConfig({ analyzerConfig, addAnalyzer }: IUnusedConfig) {
    const addToTheme = () => {
        addAnalyzer({
            ...analyzerConfig,
            changeStatus: "changed",
            inputs: analyzerConfig.inputs.map((ai) =>
                ai.key === "threshold"
                    ? { ...ai, value: "0", changeStatus: "changed" }
                    : ai
            ),
        });
    };

    return (
        <div className='p-4 rounded-xl border border-dashed border-blue-300 space-y-4'>
            <div className='space-y-1'>
                <div className='flex flex-row justify-between'>
                    <div className='space-x-1'>
                        <span className='text-lg font-medium'>
                            {analyzerConfig.name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            Analyzer
                        </span>
                    </div>
                </div>
                <p className='text-sm font-light text-muted-foreground'>
                    {analyzerConfig.description}
                </p>
            </div>
            <div className='flex justify-end'>
                <Button size='sm' onClick={addToTheme}>
                    Add Analyzer
                </Button>
            </div>
        </div>
    );
}
