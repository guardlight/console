import { NIL_UUID } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeConfig } from "@/domain/theme/type";
import { Link } from "@tanstack/react-router";
import { LuArrowRight } from "react-icons/lu";

type IThemeListScreen = {
    themes: Array<ThemeConfig>;
};
export default function ThemeListScreen({ themes }: IThemeListScreen) {
    return (
        <div className='flex flex-1 grow flex-col max-w-2xl space-y-5 mt-24'>
            <div className='flex gap-2 justify-end'>
                {/* <Link to='..' params={{ themeId: NIL_UUID }} replace>
                    <Button variant='outline'>
                        <LuArrowLeft />
                        Home
                    </Button>
                </Link> */}
                <Link to='/theme/$themeId' params={{ themeId: NIL_UUID }}>
                    <Button>New Theme Configuration</Button>
                </Link>
            </div>
            <div className='flex flex-1 flex-col space-y-3'>
                {themes
                    .filter((theme) => theme.id !== NIL_UUID)
                    .map((theme) => (
                        <ThemeListItem themeConfig={theme} />
                    ))}
            </div>
        </div>
    );
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
