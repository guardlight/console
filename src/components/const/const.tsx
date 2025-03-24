import { ContentType } from "@/domain/analysis/type";
import { IconType } from "react-icons/lib";
import { LuBookText, LuClapperboard, LuListMusic, LuTv } from "react-icons/lu";

export const ICON_MAP: Record<ContentType, IconType> = {
    book: LuBookText,
    movie: LuClapperboard,
    series: LuTv,
    lyrics: LuListMusic,
};

export const CONTENT_TYPE_NAME_MAP: Record<ContentType, string> = {
    book: "Book",
    movie: "Movie",
    series: "Series",
    lyrics: "Lyrics",
};

export const NIL_UUID = "00000000-0000-0000-0000-000000000000";
