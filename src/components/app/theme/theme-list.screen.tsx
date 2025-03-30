import { NIL_UUID } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { ThemeKeys } from "@/domain/theme/api";
import { ThemeConfig } from "@/domain/theme/type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LuArrowRight, LuRefreshCw } from "react-icons/lu";

type IThemeListScreen = {};
export default function ThemeListScreen({}: IThemeListScreen) {
    const { data, isFetching, isRefetching, error } = useQuery(
        ThemeKeys.themes()
    );

    const { invs } = useInvalidateQuery();

    const newConfigDisabled = isFetching || Boolean(error) || !!!data;

    return (
        <div className='flex flex-1 grow flex-col max-w-2xl space-y-5 mt-4 md:mt-24'>
            <div className='flex gap-2 justify-end'>
                <Button
                    variant='ghost'
                    className='text-muted-foreground'
                    onClick={() => invs(ThemeKeys.themes().queryKey)}
                >
                    <LuRefreshCw
                        strokeWidth={1.25}
                        className={isRefetching ? "animate-spin" : ""}
                    />
                    Refresh
                </Button>
                <div className='grow' />
                <Link
                    disabled={newConfigDisabled}
                    to='/theme/$themeId'
                    params={{ themeId: NIL_UUID }}
                >
                    <Button disabled={newConfigDisabled}>
                        New Theme Configuration
                    </Button>
                </Link>
            </div>
            <div className='flex flex-1 flex-col space-y-3'>
                <ThemesLoading
                    isFetching={isFetching}
                    error={error}
                    themes={data}
                />
            </div>
        </div>
    );
}

type IThemesLoading = {
    error: Error | null;
    isFetching: boolean;
    themes?: Array<ThemeConfig>;
};
function ThemesLoading({ isFetching, themes, error }: IThemesLoading) {
    if (isFetching) return <DataLoaderSpinner title='Loading your themes.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load your themes."
                queryKeys={ThemeKeys.themes().queryKey}
            />
        );

    if (!themes || themes.filter((theme) => theme.id !== NIL_UUID).length === 0)
        return (
            <EmptyList title='No themes created yet.'>
                <p>
                    Click on{" "}
                    <span className='font-medium'>New Theme Configuration</span>{" "}
                    to get started.
                </p>
            </EmptyList>
        );

    return themes
        .filter((theme) => theme.id !== NIL_UUID)
        .map((theme) => <ThemeListItem key={theme.id} themeConfig={theme} />);
}

type IThemeListItem = {
    themeConfig: ThemeConfig;
};
function ThemeListItem({ themeConfig }: IThemeListItem) {
    return (
        <Link to='/theme/$themeId' params={{ themeId: themeConfig.id }}>
            <Card className='p-4 flex flex-row grow items-center justify-between cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99'>
                <div className='flex items-center space-x-5'>
                    <div className='text tracking-wider'>
                        {themeConfig.title}
                    </div>
                </div>
                <div className='flex items-center space-x-8'>
                    <LuArrowRight className='size-6' strokeWidth={1.5} />
                </div>
            </Card>
        </Link>
    );
}
