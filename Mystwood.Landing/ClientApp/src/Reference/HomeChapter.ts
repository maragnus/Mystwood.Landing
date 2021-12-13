export default interface HomeChapter {
    name: string;
    title: string;
}

export const Burgundar: HomeChapter = {name: "burgundar", title: "Burgundar"};
export const TheKeep: HomeChapter = {name: "keep", title: "The Keep"};
export const Novgorond: HomeChapter = {name: "novgorond", title: "Novgorond"};

export const HomeChapters: HomeChapter[] = [Burgundar, TheKeep, Novgorond];

const religionLookup: Map<string, HomeChapter> =
    HomeChapters.reduce((dict, item) => {
        dict.set(item.name, item);
        return dict;
    }, new Map<string, HomeChapter>());

export const HomeChaptersByName: ((name: string) => HomeChapter) = (name: string) =>
    religionLookup.get(name) ?? HomeChapters[0];
