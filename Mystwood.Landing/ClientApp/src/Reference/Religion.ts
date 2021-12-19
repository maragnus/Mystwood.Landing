export default interface Religion {
    name: string;
    title: string;
}

export const Justice: Religion = {name: "justice", title: "Follower of Justice"};
export const Mercy: Religion = {name: "mercy", title: "Follower of Mercy"};
export const Wild: Religion = {name: "wild", title: "Follower of the Wild"};
export const OldFaith: Religion = {name: "old", title: "Old Faith"};
export const AllGods: Religion = {name: "all", title: "All Gods Equally"};

export const Religions: Religion[] = [Justice, Mercy, Wild, OldFaith, AllGods];

const religionLookup: Map<string, Religion> =
    Religions.reduce((dict, item) => {
        dict.set(item.name, item);
        return dict;
    }, new Map<string, Religion>());

export const ReligionByName: ((name: string) => Religion) = (name: string) =>
    religionLookup.get(name) ?? Religions[0];
