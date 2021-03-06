import {Gifts, Ability} from "./Gifts";
import {Enhancements, OccupationByName, SkillChoice} from "./Occupations";
import {SkillByName} from "./Skills";

export default class CharacterSheet {
    startingMoonstone: number = 0;

    // Editor - Profile
    characterName?: string;
    religions?: string[];
    occupation?: string;
    specialty: string = "";
    enhancement: string = Enhancements[0].name;
    homeChapter?: string;
    publicStory?: string;
    privateStory?: string;
    homeland?: string;

    // Editor - Gifts
    courage: number = 0;
    dexterity: number = 0;
    empathy: number = 0;
    passion: number = 0;
    prowess: number = 0;
    wisdom: number = 0;

    // Editor - Skills
    purchasedSkills: PurchasedSkill[] = [];
    chosenSkills: CharacterChosenSkill[] = [];
    skillTokens: number = 0;

    // Editor - Craft Skills
    craftSkills?: undefined;

    // Editor - (Dis)advantages
    advantages: CharacterVantage[] = [];
    disadvantages: CharacterVantage[] = [];

    // Editor - Spells
    spells: string[] = [];

    // Editor - Other
    flavorTraits?: undefined;
    unusualFeatures: string = '';
    cures: string = '';
    documents: string = '';
    notes: string = '';

    // Calculated - Scores
    duty: string = "";
    livery: string = "";
    currentLevel: number = 0;
    startingLevel: number = 6;
    giftCost: number = 0;
    skillCost: number = 0;
    moonstoneSpent: number = 0;
    skillTokensSpend: number = 0;
    skillsPurchased: number = 0;
    advantageScore: number = 0;
    disadvantageScore: number = 0;

    // Calculated - Tables
    specialties: string[] = [];
    properties: CharacterProperty[] = [];
    abilities: CharacterAbility[] = [];
    skills: CharacterSkill[] = [];
    occupationSkills: CharacterSkill[] = [];
    occupationSkillsChoices: CharacterSkillChoice[] = [];

    // Populate reference data fields and calculated fields
    static populate(sheet: CharacterSheet) {
        CharacterSheet.populateProfile(sheet);
        CharacterSheet.populateGifts(sheet);
        CharacterSheet.populateSkills(sheet);
        CharacterSheet.populateVantages(sheet);
    }

    static populateVantages(sheet: CharacterSheet): void {
        sheet.advantageScore = (sheet.advantages ?? []).reduce((score, vantage) => score + vantage.rank, 0);
        sheet.disadvantageScore = (sheet.disadvantages ?? []).reduce((score, vantage) => score + vantage.rank, 0);
    }

    static populateProfile(sheet: CharacterSheet): void {
        const occupation = OccupationByName(sheet.occupation ?? "No Occupation");
        const enhancement = OccupationByName(sheet.enhancement);

        sheet.specialties = occupation.specialties ?? [occupation.name ?? "No Occupation"];
        if (sheet.specialties.length === 1)
            sheet.specialty = sheet.specialties[0];
        else if (!sheet.specialties.some(x => x === sheet.specialty)) {
            sheet.specialty = sheet.specialties[0];
        }

        sheet.duty = [occupation.duty, enhancement.duty].filter(x => !!x).join(",");
        sheet.livery = [occupation.livery, enhancement.livery].filter(x => !!x).join(",");

        if (!sheet.enhancement || !Enhancements.some(e => e.name === sheet.enhancement))
            sheet.enhancement = Enhancements[0].name;
    }

    static populateGifts(sheet: CharacterSheet): void {
        sheet.properties = [];
        sheet.abilities = [];
        CharacterSheet.populateGift(sheet, "Courage", sheet.courage);
        CharacterSheet.populateGift(sheet, "Dexterity", sheet.dexterity);
        CharacterSheet.populateGift(sheet, "Empathy", sheet.empathy);
        CharacterSheet.populateGift(sheet, "Passion", sheet.passion);
        CharacterSheet.populateGift(sheet, "Prowess", sheet.prowess);
        CharacterSheet.populateGift(sheet, "Wisdom", sheet.wisdom);

        sheet.currentLevel = sheet.courage + sheet.dexterity + sheet.empathy + sheet.passion + sheet.prowess + sheet.wisdom;
        sheet.giftCost = Math.max(0, CharacterSheet.triangle(sheet.currentLevel) - CharacterSheet.triangle(sheet.startingLevel));
        sheet.abilities = sheet.abilities.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        sheet.moonstoneSpent = CharacterSheet.CalculateCost(sheet);
    }

    static populateSkills(sheet: CharacterSheet): void {
        sheet.skills = [];
        sheet.occupationSkills = [];
        sheet.occupationSkillsChoices = [];

        CharacterSheet.populatePurchasedSkills(sheet);
        sheet.moonstoneSpent = CharacterSheet.CalculateCost(sheet);

        if (sheet.occupation) {
            CharacterSheet.populateOccupation(sheet, sheet.occupation);
            CharacterSheet.populateOccupation(sheet, sheet.enhancement);
            CharacterSheet.populateChosenSkills(sheet);
        }
        // Sort skills
        sheet.skills = sheet.skills // Sort by name, then by rank
            .sort((a, b) =>
                (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : (
                    (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0
                    ))));
    }

    static populatePurchasedSkills(sheet: CharacterSheet): void {
        // Clean up any skills without ranks
        sheet.purchasedSkills = (sheet.purchasedSkills ?? []).filter(s => s.purchasedRank > 0);

        const purchases: { ranks: number, cost: number }[] =
            sheet.purchasedSkills.map(skill => ({
                ranks: skill.purchasedRank,
                cost: (SkillByName(skill.name).cost ?? 0) * skill.purchasedRank
            }));

        // Number of skill purchases
        sheet.skillsPurchased = purchases.reduce((result, skill) => result + skill.ranks, 0);

        // Each purchased skill has a cost per rank in that skill
        // Also, the tax of purchasing a skill goes by +1 for each skill purchased after the first
        sheet.skillCost =
            purchases.reduce((result, skill) => result + skill.cost, 0)
            + CharacterSheet.triangle(Math.max(0, sheet.skillsPurchased - 1));

        const purchasedSkills: CharacterSkill[] = sheet.purchasedSkills.map(skill => ({
            name: skill.name,
            rank: skill.purchasedRank * (SkillByName(skill.name).rank ?? 1),
            source: "Purchased"
        } as CharacterSkill));

        sheet.skills = [
            ...sheet.skills,
            ...purchasedSkills
        ]
    }

    static populateChosenSkills(sheet: CharacterSheet): void {
        sheet.skills = [
            ...sheet.skills,
            ...sheet.occupationSkills.map(s => ({
                name: s.name,
                rank: s.rank,
                source: s.source
            })),
            ...sheet.chosenSkills.map(s => ({
                name: s.name,
                source: "choice"
            } as CharacterSkill))
        ];
    }

    static populateOccupation(sheet: CharacterSheet, occupationName: string): void {
        const occupation = OccupationByName(occupationName);

        if (!occupation || !occupation.skills)
            return;

        const skills: CharacterSkill[] =
            occupation.skills.filter(s => typeof s === "string").map(s => ({
                name: s as string,
                rank: 0,
                source: occupation.name,
            } as CharacterSkill));

        sheet.occupationSkills = [...sheet.occupationSkills, ...skills];

        const choices: CharacterSkillChoice[] =
            occupation.skills.filter(s => typeof s !== "string").map(s => ({
                count: (s as SkillChoice).count,
                choices: (s as SkillChoice).choices.map(sc => ({
                    name: sc,
                    rank: 0,
                    source: occupation.name
                } as CharacterSkill))
            } as CharacterSkillChoice));

        sheet.occupationSkillsChoices = [...sheet.occupationSkillsChoices, ...choices];
    }

    static populateGift(sheet: CharacterSheet, giftName: string, giftRank: number) {
        if (giftRank === undefined || giftRank < 1)
            return;

        let gift = Gifts.filter(g => g.name === giftName)[0];
        let properties = gift.properties.map((p, propertyIndex) => ({
            name: p,
            value: gift.ranks[giftRank - 1].properties[propertyIndex],
            source: gift.name
        } as CharacterProperty));

        let abilities: CharacterAbility[] = [];
        for (let rank = giftRank; rank > 0; rank--) {
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
        return Math.max(0, level * (level + 1) / 2);
    }

    static CalculateCost(sheet: CharacterSheet) {
        const skillCost = Math.max(0, sheet.skillCost - sheet.skillTokens);
        return sheet.giftCost + skillCost;
    }


    // Removes unnecessary calculated fields before saving
    static unpopulate(sheet: CharacterSheet): void {
        // do nothing
    }
}

export interface CharacterVantage {
    name: string;
    rank: number;
}

export interface CharacterChosenSkill {
    name: string;
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
    purchasedRank: number;
}
