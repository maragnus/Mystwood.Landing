import CharacterSheet, {Albion, Burgundar, Justice, Mercy, TheKeep, Wild} from "../Reference/CharacterSheet";

export enum CharacterStatus {
    New = "New",
    Current = "Current",
    Draft = "Draft",
    Submitted = "Submitted"
}

export interface Character {
    id: number;
    name: string;
    subtitle: string;
    sheet: CharacterSheet;
    draft?: CharacterSheet;
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
                id: id,
                name: c.characterName ?? "",
                subtitle: `Level ${c.currentLevel} ${c.occupation?.name} from ${c.homeChapter?.title}`,
                sheet: c,
                draft: statuses[id] === CharacterStatus.Draft ? {...c} : undefined,
                status: statuses[id]
            }))
        };
    }
}

