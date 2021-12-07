export interface Vantage {
    name: string;
    title: string;
    rank: number;
    physical?: boolean;
}

export const Phobias: string[] = [
    "Chaos", "Darkness", "Enclosed Places", "Fae", "Fire", "Large Animals", "Nobles", "Spell Casters", "Undead"
];

export const Advantages: Vantage[] = [
    {
        "title": "Advantageous Gluttony 1",
        "name": "Advantageous Gluttony",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Call of Freedom 1",
        "name": "Call of Freedom",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Caustic Blood 2",
        "name": "Caustic Blood",
        "rank": 2,
        "physical": true
    },
    {
        "title": "Crushing Strength 1",
        "name": "Crushing Strength",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Crushing Strength 2",
        "name": "Crushing Strength",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Crushing Strength 3",
        "name": "Crushing Strength",
        "rank": 3,
        "physical": false
    },
    {
        "title": "Durability 1",
        "name": "Durability",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Elemental Fury 1",
        "name": "Elemental Fury",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Elemental Fury 2",
        "name": "Elemental Fury",
        "rank": 2,
        "physical": true
    },
    {
        "title": "Elemental Fury 3",
        "name": "Elemental Fury",
        "rank": 3,
        "physical": true
    },
    {
        "title": "Elemental Resistance 1",
        "name": "Elemental Resistance",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Evil Eye 1",
        "name": "Evil Eye",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Feign Death 1",
        "name": "Feign Death",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Forest Ally 1",
        "name": "Forest Ally",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Healing Blood 1",
        "name": "Healing Blood",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Hunter's Senses 1",
        "name": "Hunter's Senses",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Natural Armor 2",
        "name": "Natural Armor",
        "rank": 2,
        "physical": true
    },
    {
        "title": "Old Blood 1",
        "name": "Old Blood",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Poison Spittle 2",
        "name": "Poison Spittle",
        "rank": 2,
        "physical": true
    },
    {
        "title": "Purity 1",
        "name": "Purity",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Skin Changer 2",
        "name": "Skin Changer",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Stonefast 1",
        "name": "Stonefast",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Stubborn Courage 1",
        "name": "Stubborn Courage",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Talent 1",
        "name": "Talent",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Talent 2",
        "name": "Talent",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Talent 3",
        "name": "Talent",
        "rank": 3,
        "physical": false
    },
    {
        "title": "Treewalk 1",
        "name": "Treewalk",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Undead Bane 1",
        "name": "Undead Bane",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Witchblood 1",
        "name": "Witchblood",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Witchblood 2",
        "name": "Witchblood",
        "rank": 2,
        "physical": true
    },
    {
        "title": "Witchblood 3",
        "name": "Witchblood",
        "rank": 3,
        "physical": true
    },
    {
        "title": "Witchblood 4",
        "name": "Witchblood",
        "rank": 4,
        "physical": true
    }
]

export const Disadvantages: Vantage[] = [
    {
        "title": "Anathema 1",
        "name": "Anathema",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Blind 4",
        "name": "Blind",
        "rank": 4,
        "physical": false
    },
    {
        "title": "Bloodlust 3",
        "name": "Bloodlust",
        "rank": 3,
        "physical": false
    },
    {
        "title": "Carouser 1",
        "name": "Carouser",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Cowardice 2",
        "name": "Cowardice",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Creature of the Night 2",
        "name": "Creature of the Night",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Divine Disfavor: God of the Wild 2",
        "name": "Divine Disfavor: God of the Wild",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Divine Disfavor: Goddess of Mercy 4",
        "name": "Divine Disfavor: Goddess of Mercy",
        "rank": 4,
        "physical": false
    },
    {
        "title": "Divine Disfavor: Lord of Justice 1",
        "name": "Divine Disfavor: Lord of Justice",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Eternal Foe: Fae 1",
        "name": "Eternal Foe: Fae",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Eternal Foe: Chaos or Undeath 2",
        "name": "Eternal Foe: Chaos or Undeath",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Excessive Curiosity 1",
        "name": "Excessive Curiosity",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Forgetful 1",
        "name": "Forgetful",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Greed 1",
        "name": "Greed",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Gullible 1",
        "name": "Gullible",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Horribly Disfigured 1",
        "name": "Horribly Disfigured",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Maimed 3",
        "name": "Maimed",
        "rank": 3,
        "physical": false
    },
    {
        "title": "Mostly Illiterate 1",
        "name": "Mostly Illiterate",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Nearsighted 1",
        "name": "Nearsighted",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Pacifist 2",
        "name": "Pacifist",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Perpetual Gloom 1",
        "name": "Perpetual Gloom",
        "rank": 1,
        "physical": false
    },
    ...Phobias.map(name =>
        ({
            "title": `Phobia (${name}) 1`,
            "name": `Phobia (${name})`,
            "rank": 1,
            "physical": false
        })),
    {
        "title": "Raging Hunger 1",
        "name": "Raging Hunger",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Sickly 3",
        "name": "Sickly",
        "rank": 3,
        "physical": false
    },
    {
        "title": "Slow 2",
        "name": "Slow",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Spendthrift 1",
        "name": "Spendthrift",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Tainted 1",
        "name": "Tainted",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Teetotaler 1",
        "name": "Teetotaler",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Troublemaker 1",
        "name": "Troublemaker",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Truthfulness 2",
        "name": "Truthfulness",
        "rank": 2,
        "physical": false
    },
    {
        "title": "Unwashed 1",
        "name": "Unwashed",
        "rank": 1,
        "physical": false
    },
    {
        "title": "Vulnerability 1",
        "name": "Vulnerability",
        "rank": 1,
        "physical": true
    },
    {
        "title": "Wild Heart 1",
        "name": "Wild Heart",
        "rank": 1,
        "physical": true
    }
];

const vantageLookup: Map<string, Vantage> =
    [...Advantages, ...Disadvantages]
        .reduce((dict, v) => {
                dict.set(v.title, v);
                return dict;
            }, new Map<string, Vantage>()
        )
;

export const VantageByTitle: ((title: string) => Vantage) = (title: string) =>
    vantageLookup.get(title) ?? Advantages[0];
