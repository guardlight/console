import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/ui/custom/BackLink";
import useGoBack from "@/components/ui/custom/GoBack.hook";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { ThemeKeys, ThemesApi } from "@/domain/theme/api";
import {
    ChangeStatus,
    NIL_THEME_CONFIG,
    ThemeAnalyzer,
    ThemeAnalyzerInput,
} from "@/domain/theme/type";
import { cn } from "@/lib/utils";
import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { LuChartNetwork, LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

type IThemeScreen = {
    themeConfigId: string;
};
export default function ThemeScreen({ themeConfigId }: IThemeScreen) {
    const { data, error } = useQuery(ThemeKeys.themes());

    const [localTheme, setLocalTheme] = useState(
        data?.find((t) => t.id === themeConfigId) || NIL_THEME_CONFIG
    );

    const updateLocalTheme = (title: string) => {
        setLocalTheme((prevState) => ({
            ...prevState,
            title,
        }));
    };

    const { invs } = useInvalidateQuery();
    const { back } = useGoBack();

    const { mutate: updateThemeConfig, isPending } = useMutation({
        mutationFn: () => ThemesApi.createTheme(localTheme),
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

    return (
        <TooltipProvider>
            <div className='flex flex-1 grow flex-col max-w-2xl space-y-4 mb-24 mt-4 md:mt-16'>
                <h2 className='text-2xl'>Theme Configuration</h2>

                <div className=''>
                    <Input
                        placeholder='Enter theme name'
                        value={localTheme.title}
                        onChange={(e) => updateLocalTheme(e.target.value)}
                    />
                    <span className='text-sm text-muted-foreground ml-3'>
                        This name will be displayed when creating a Analysis
                        Request
                    </span>
                </div>
                <Alert variant='info' className='border-dashed'>
                    <LuChartNetwork className='h-4 w-4' />
                    <AlertTitle>Analyzer Selection</AlertTitle>
                    <AlertDescription>
                        If you don't want to use the specific analyzer, don't
                        fill in anything.
                    </AlertDescription>
                </Alert>
                <div className='space-y-4'>
                    {localTheme.analyzers.map((at) => {
                        if (at.changeStatus === "removed") {
                            return (
                                <AnalyzerConfigRemoved
                                    key={at.key}
                                    analyzerConfig={at}
                                />
                            );
                        }
                        return (
                            <AnalyzerConfig key={at.key} analyzerConfig={at} />
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
                        disabled={isPending}
                        onClick={() => updateThemeConfig()}
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

const changeStatusStyles: Record<ChangeStatus, string> = {
    new: clsx`border-blue-400 text-blue-400`,
    changed: clsx`border-amber-400 text-amber-400`,
    removed: clsx`border-red-400 text-red-400`,
    same: clsx`opacity-0`,
};

type IAnalyzerConfig = {
    analyzerConfig: ThemeAnalyzer;
};
function AnalyzerConfig({ analyzerConfig }: IAnalyzerConfig) {
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
                    return <AnalyzerInput key={inp.key} input={inp} />;
                })}
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
                    return <AnalyzerInput key={inp.key} input={inp} />;
                })}
            </div>
        </div>
    );
}

type IAnalyzerInput = {
    input: ThemeAnalyzerInput;
};
function AnalyzerInput({ input }: IAnalyzerInput) {
    const getInputArea = () => {
        if (input.type === "textarea") {
            return <Textarea value={input.value} />;
        } else {
            return <Slider defaultValue={[0]} min={-1} max={1} step={0.01} />;
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
            <div>{getInputArea()}</div>
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
