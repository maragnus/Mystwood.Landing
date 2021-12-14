import CharacterSheet from "../Reference/CharacterSheet";

export enum CharacterStatus {
    New = "New",
    Draft = "Draft",
    Review = "Review",
    Live = "Live"
}

export interface Character {
    id: string;
    live: CharacterSheet;
    draft: CharacterSheet;
    status: CharacterStatus;
}

export interface Profile {
    name: string;
    email: string;
}