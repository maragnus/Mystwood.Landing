import CharacterSheet from "../Reference/CharacterSheet";
import {Wild, Mercy, Justice} from "../Reference/Religion";
import {TheKeep, Burgundar, Albion} from "../Reference/HomeChapter";

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

export class ApplicationSession {
    profile?: Profile;
    characters: Character[] = [];

    static mock(): ApplicationSession {
        const nico = CharacterSheet.mock("Nico Atkinson", "Tinker", [Justice, Wild], Albion);
        const maragnus = CharacterSheet.mock("Maragnus Trusen", "Guard", [Justice], Burgundar);
        const acrion = CharacterSheet.mock("Acrion Trusen", "Tinker", [Mercy], TheKeep);
        const characters = [nico, maragnus, acrion];

        const statuses: CharacterStatus[] = [CharacterStatus.Current, CharacterStatus.Draft, CharacterStatus.Submitted];

        return {
            profile: {
                name: "Josh Brown",
                email: "acrion@gmail.com"
            },
            characters: characters.map((c, id) => ({
                id: id.toString(),
                name: c.characterName ?? "",
                subtitle: `Level ${c.currentLevel} ${c.occupation} from ${c.homeChapter}`,
                live: c,
                draft: statuses[id] === CharacterStatus.Draft ? {...c} : {} as CharacterSheet,
                status: statuses[id]
            }))
        };
    }
}

