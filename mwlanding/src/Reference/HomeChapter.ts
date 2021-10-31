export default interface HomeChapter {
    name: string;
    title: string;
}

export const Albion: HomeChapter = {name: "albion", title: "Albion"};
export const Burgundar: HomeChapter = {name: "burgundar", title: "Burgundar"};
export const TheKeep: HomeChapter = {name: "keep", title: "The Keep"};

export const HomeChapters: HomeChapter[] = [Albion, Burgundar, TheKeep];
