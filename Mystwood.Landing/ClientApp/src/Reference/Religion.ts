export default interface Religion {
    name: string;
    title: string;
}

export const Justice: Religion = {name: "justice", title: "Follower of Justice"};
export const Mercy: Religion = {name: "mercy", title: "Follower of Mercy"};
export const Wild: Religion = {name: "wild", title: "Follower of the Wild"};

export const Religions: Religion[] = [Justice, Mercy, Wild];
