import CharacterSheet from "../Reference/CharacterSheet";

export enum CharacterStatus {
    New = "New",
    Current = "Current",
    Draft = "Draft",
    Submitted = "Submitted"
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