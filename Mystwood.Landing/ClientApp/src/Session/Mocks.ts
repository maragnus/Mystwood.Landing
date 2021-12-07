import CharacterSheet from "../Reference/CharacterSheet";
import {Character, CharacterStatus} from "./Session";
import {Justice, Mercy, Wild} from "../Reference/Religion";
import {Albion, Burgundar, TheKeep} from "../Reference/HomeChapter";

export function mockCharacters(): Character[] {
    const nico = CharacterSheet.mock("Nico Atkinson", "Tinker", [Justice, Wild], Albion);
    const maragnus = CharacterSheet.mock("Maragnus Trusen", "Guard", [Justice], Burgundar);
    const acrion = CharacterSheet.mock("Acrion Trusen", "Tinker", [Mercy], TheKeep);
    const characters = [nico, maragnus, acrion];

    const statuses: CharacterStatus[] = [CharacterStatus.Current, CharacterStatus.Draft, CharacterStatus.Submitted];

    return characters.map((c, id) => ({
        id: id,
        name: c.characterName ?? "",
        subtitle: `Level ${c.currentLevel} ${c.occupation} from ${c.homeChapter}`,
        sheet: c,
        draft: statuses[id] === CharacterStatus.Draft ? {...c} : undefined,
        status: statuses[id]
    }))
}
