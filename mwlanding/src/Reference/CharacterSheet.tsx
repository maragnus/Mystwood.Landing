import {Gifts, Ability} from "./Gifts";
import {Occupation, Occupations, SkillChoice} from "./Occupations";

export class CharacterSheet {
    characterName?: string;
    religions?: Religion[];
    occupation?: Occupation;
    enhancement?: Occupation;
    homeChapter?: HomeChapter;
    publicStory?: string;
    privateStory?: string;
    notes?: string;

    advantages?: undefined;
    disadvantages?: undefined;
    flavorTraits?: undefined;
    craftSkills?: undefined;

    startingLevel: number = 6;
    currentLevel: number = 0;

    courage: number = 0;
    dexterity: number = 0;
    empathy: number = 0;
    passion: number = 0;
    prowess: number = 0;
    wisdom: number = 0;

    moonstoneSpent: number = 0;
    skillTokensSpend: number = 0;
    giftLevels: number = 0;
    skillLevels: number = 0;

    properties: CharacterProperty[] = [];
    abilities: CharacterAbility[] = [];

    skills: CharacterSkill[] = [];
    occupationSkills: CharacterSkill[] = [];
    purchasedSkills: PurchasedSkill[] = [];
    occupationSkillsChoices: CharacterSkillChoice[] = [];

    static mock(characterName: string, occupation: Occupation, religions: Religion[], home: HomeChapter ): CharacterSheet {
        const character = new CharacterSheet();
        character.characterName = "Nico Atkinson";
        character.occupation = occupation ?? Occupations[0];
        character.religions = religions;
        character.homeChapter = home;
        return character;
    }

    // Populate reference data fields and calculated fields
    static populate(sheet: CharacterSheet) {
        sheet.properties = [];
        sheet.abilities = [];
        CharacterSheet.populateGift(sheet, "Courage", sheet.courage);
        CharacterSheet.populateGift(sheet, "Dexterity", sheet.dexterity);
        CharacterSheet.populateGift(sheet, "Empathy", sheet.empathy);
        CharacterSheet.populateGift(sheet, "Passion", sheet.passion);
        CharacterSheet.populateGift(sheet, "Prowess", sheet.prowess);
        CharacterSheet.populateGift(sheet, "Wisdom", sheet.wisdom);

        sheet.currentLevel = sheet.courage + sheet.dexterity + sheet.empathy + sheet.passion + sheet.prowess + sheet.wisdom;
        sheet.giftLevels = CharacterSheet.triangle(sheet.currentLevel) - CharacterSheet.triangle(sheet.startingLevel);
        sheet.abilities = sheet.abilities.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        sheet.skills = sheet.skills // Sort by name, then by rank
            .sort((a, b) =>
                (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : (
                    (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0
                    ))));

        // Each purchased skill has a cost per rank in that skill 
        // Also, the tax of purchasing a skill goes by +1 for each skill purchased after the first
        sheet.skillLevels =
            sheet.purchasedSkills.reduce((result, skill) => result + skill.cost * skill.rank, 0)
            + CharacterSheet.triangle(Math.max(0, sheet.purchasedSkills.length - 1));

        sheet.skills = [];
        CharacterSheet.populateOccupation(sheet, sheet.occupation);
        CharacterSheet.populateOccupation(sheet, sheet.enhancement);
        CharacterSheet.populatePurchasedSkills(sheet);
    }

    static populatePurchasedSkills(sheet: CharacterSheet) {
        // TODO
    }

    static populateOccupation(sheet: CharacterSheet, occupation: Occupation | undefined) {
        if (!occupation || !occupation.skills)
            return;

        sheet.occupationSkills = occupation.skills.filter(s => typeof s === "string").map(s => ({
            name: s as string,
            rank: 0,
            source: occupation.name,
        } as CharacterSkill));

        sheet.occupationSkillsChoices = occupation.skills.filter(s => typeof s !== "string").map(s => ({
            count: (s as SkillChoice).count,
            choices: (s as SkillChoice).choices.map(sc => ({
                name: sc,
                rank: 0,
                source: occupation.name
            } as CharacterSkill))
        } as CharacterSkillChoice));
    }

    static populateGift(sheet: CharacterSheet, giftName: string, giftRank: number) {
        if (giftRank < 1)
            return;

        let gift = Gifts.filter(g => g.name === giftName)[0];
        let properties = gift.properties.map((p, propertyIndex) => ({
            name: p,
            value: gift.ranks[giftRank - 1].properties[propertyIndex],
            source: gift.name
        } as CharacterProperty));

        var abilities: CharacterAbility[] = [];
        for (var rank = giftRank; rank > 0; rank--) {
            // Only add the highest rank of each ability
            gift.ranks.slice(0, rank - 1)
                .reverse()
                .reduce((s, r) => [...s, ...r.abilities ?? []], [] as Ability[]) // SelectMany
                .forEach((ability) => {
                    if (abilities.some(a => a.name === ability.name))
                        return;

                    abilities.push({
                        name: ability.name,
                        rank: ability.rank,
                        title: ability.title,
                        source: gift.name,
                    });
                });
        }

        sheet.properties.push(...properties);
        sheet.abilities.push(...abilities);
    }

    static triangle(level: number): number {
        return level * (level + 1) / 2;
    }
}

export type CharacterProperty = {
    name: string;
    value?: string;
    source: string;
}

export type CharacterAbility = {
    name: string;
    rank: number;
    title: string;
    source: string;
}

export type CharacterSkill = {
    name: string;
    rank: number;
    source: string;
}

export type CharacterSkillChoice = {
    count: number;
    choices: CharacterSkill[];
}

export type PurchasedSkill = {
    name: string;
    rank: number;
    cost: number;
}

export type HomeChapter = {
    name: string;
    title: string;
}

export const Albion: HomeChapter = {name: "albion", title: "Albion"};
export const Burgundar: HomeChapter = {name: "burgundar", title: "Burgundar"};
export const TheKeep: HomeChapter = {name: "keep", title: "The Keep"};

export const HomeChapters: HomeChapter[] = [Albion, Burgundar, TheKeep];

export type Religion = {
    name: string;
    title: string;
}

export const Justice: Religion = {name: "justice", title: "Follower of Justice"};
export const Mercy: Religion = {name: "mercy", title: "Follower of Mercy"};
export const Wild: Religion = {name: "wild", title: "Follower of the Wild"};

export const Religions: Religion[] = [Justice, Mercy, Wild];
