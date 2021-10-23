import {Gifts, Ability} from "./Gifts";
import { Occupation } from "./Occupations";

enum SkillType {
    Free,
    Purchased,
    Occupation,
}

export class CharacterSheet {
    characterName?: string;
    religions?: Religion[];
    occupation?: Occupation;
    enhancement?: Occupation;
    home?: HomeChapter;
    publicStory?: string;
    privateStory?: string;
    notes?: string;
    
    startingLevel: number = 6;
    currentLevel: number = 0;

    courage: number = 0;
    dexterity: number = 0;
    empathy: number = 0;
    passion: number = 0;
    prowess: number = 0;
    wisdom: number = 0;
    giftLevels: number = 0;

    properties: CharacterProperty[] = [];
    abilities: CharacterAbility[] = [];
    skills: CharacterSkill[] = [];
    skillLevels: number = 0;
    
    purchasedSkills: PurchasedSkill[] = [];
    
    populate() {
        this.properties = [];
        this.abilities = [];
        this.populateGift("Courage", this.courage);
        this.populateGift("Dexterity", this.dexterity);
        this.populateGift("Empathy", this.empathy);
        this.populateGift("Passion", this.passion);
        this.populateGift("Prowess", this.prowess);
        this.populateGift("Wisdom", this.wisdom);
        
        this.currentLevel = this.courage + this.dexterity + this.empathy + this.passion + this.prowess + this.wisdom;
        this.giftLevels = CharacterSheet.triangle(this.currentLevel) - CharacterSheet.triangle(this.startingLevel);
        this.abilities = this.abilities.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        
        this.skills = this.skills // Sort by name, then by rank
            .sort((a,b) => 
                (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : (
                    (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0
            ))));

        // Each purchased skill has a cost per rank in that skill 
        // Also, the tax of purchasing a skill goes by +1 for each skill purchased after the first
        var purchasedSkillCost =
            this.purchasedSkills.reduce((result, skill) => result + (skill.type == SkillType.Purchased ? skill.cost * skill.rank : 0), 0)
            + CharacterSheet.triangle(Math.max(0, this.purchasedSkills.length - 1));
        
        this.skills = [];
        this.populateOccupation(this.occupation);
        this.populateOccupation(this.enhancement);
        this.populatePurchasedSkills();
    }

    populatePurchasedSkills() {
        throw new Error("Method not implemented.");
    }
    
    populateOccupation(occupation: Occupation | undefined) {
        throw new Error("Method not implemented.");
    }
    
    populateGift(giftName: string, giftRank: number) {
        if (giftRank < 1)
            return;

        let gift = Gifts.filter(g => g.name == giftName)[0];
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
                    if (abilities.some(a => a.name == ability.name))
                        return;

                    abilities.push({
                        name: ability.name,
                        rank: ability.rank,
                        title: ability.title,
                        source: gift.name,
                    });
                });
        }
        
        this.properties.push(...properties);
        this.abilities.push(...abilities);
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

export type PurchasedSkill = {
    name: string;
    rank: number;
    cost: number;
}

export type HomeChapter = {
    name: string;
    title: string;
}

export type Religion = {
    name: string;
    title: string;
}

export const HomeChapters: HomeChapter[] = [
    {name: "albion", title: "Albion"},
    {name: "burgundar", title: "Burgundar"},
    {name: "keep", title: "The Keep"},
]

export const Religions: Religion[] = [
    {name: "wild", title: "Follower of the Wild"},
    {name: "justice", title: "Follower of Justice"},
    {name: "mercy", title: "Follower of Mercy"},
];
