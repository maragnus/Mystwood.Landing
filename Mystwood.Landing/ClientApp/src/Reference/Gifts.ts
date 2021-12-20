

export type Gift = {
    name: string;
    title: string;
    properties: string[];
    ranks: GiftRank[];
}

export type GiftProperty = {
    name: string;
    title: string;
}

export type GiftPropertyValue = {
    name: string;
    value: string;
}

export type GiftRank = {
    rank: number;
    properties: string[];
    abilities?: Ability[];
}

export type Ability = {
    name: string; // Name without rank
    rank: number; // 0 if there's only one rank, otherwise represents I, II, IV, 1, 2 ,3
    title: string; // Name and Rank verbatim
}

export const Gifts: Gift[] = [
    {
        name: "Courage",
        title: "Courage",
        properties: ["Hit Point Bonus", "Battle Endurance per Renew", "Resist Will per Day"],
        ranks: [
            {
                rank: 1,
                properties: ["+0", "1", "-"],
                abilities: [
                    {name: "Use of Arms", rank: 0, title: "Use of Arms"},
                    {name: "Battle Endurance (Disengage)", rank: 0, title: "Battle Endurance (Disengage)"},
                ],
            },
            {
                rank: 2,
                properties: ["+1", "2", "-"],
                abilities: [
                    {name: "Toughness", rank: 1, title: "Toughness I"},
                ],
            },
            {
                rank: 3,
                properties: ["+1", "3", "-"],
                abilities: [
                    {name: "Battle Endurance (Heal 2)", rank: 0, title: "Battle Endurance (Heal 2)"},
                ],
            },
            {
                rank: 4,
                properties: ["+1", "3", "1"],
                abilities: [
                    {name: "Resist Will", rank: 0, title: "Resist Will"},
                ],
            },
            {
                rank: 5,
                properties: ["+2", "4", "1"],
                abilities: [
                    {name: "Toughness", rank: 2, title: "Toughness II"},
                ],
            },
            {
                rank: 6,
                properties: ["+2", "4", "2"],
            },
            {
                rank: 7,
                properties: ["+2", "5", "2"],
                abilities: [
                    {name: "Battle Endurance (Purge Maim)", rank: 0, title: "Battle Endurance (Purge Maim)"},
                ],
            },
            {
                rank: 8,
                properties: ["+3", "5", "3"],
                abilities: [
                    {name: "Toughness", rank: 3, title: "Toughness III"},
                ],
            },
            {
                rank: 9,
                properties: ["+3", "6", "3"],
            },
            {
                rank: 10,
                properties: ["+4", "6", "4"],
                abilities: [
                    {name: "Battle Endurance (Lethal to Harm)", rank: 0, title: "Battle Endurance (Lethal to Harm)"},
                    {name: "Toughness", rank: 4, title: "Toughness IV"},
                ],
            },
        ]
    },


    {
        name: "Dexterity",
        title: "Dexterity",
        properties: ["Special Attacks per Renew", "Assassinate per Day"],
        ranks: [
            {
                rank: 1,
                properties: ["-", "-"],
                abilities: [
                    {name: "Disarm Traps/Pick Locks", rank: 0, title: "Disarm Traps/Pick Locks"},
                    {name: "Thrown Weapon", rank: 0, title: "Thrown Weapon"},
                    {name: "Use Hand Crossbow", rank: 0, title: "Use Hand Crossbow"},
                ],
            },
            {
                rank: 2,
                properties: ["1", "-"],
                abilities: [
                    {name: "Special Attacks", rank: 0, title: "Special Attacks"},
                    {name: "Use Bows", rank: 0, title: "Use Bows"},
                ],
            },
            {
                rank: 3,
                properties: ["1", "-"],
                abilities: [
                    {name: "Florentine", rank: 0, title: "Florentine"},
                    {name: "Pick Pockets", rank: 1, title: "Pick Pockets I"},
                    {name: "Tarot Mortis", rank: 0, title: "Tarot Mortis"},
                ],
            },
            {
                rank: 4,
                properties: ["2", "1"],
                abilities: [
                    {name: "Assassinate", rank: 0, title: "Assassinate"},
                ],
            },
            {
                rank: 5,
                properties: ["2", "1"],
                abilities: [
                    {name: "Two Weapons", rank: 0, title: "Two Weapons"},
                ],
            },
            {
                rank: 6,
                properties: ["3", "2"],
            },
            {
                rank: 7,
                properties: ["4", "2"],
                abilities: [
                    {name: "Swashbuckling", rank: 0, title: "Swashbuckling"},
                ],
            },
            {
                rank: 8,
                properties: ["4", "2"],
                abilities: [
                    {name: "Evade Trap", rank: 0, title: "Evade Trap"},
                ],
            },
            {
                rank: 9,
                properties: ["5", "2"],
                abilities: [
                    {name: "Pick Pockets", rank: 2, title: "Pick Pockets II"},
                ],
            },
            {
                rank: 10,
                properties: ["5", "3"],
            },
        ]
    },


    {
        name: "Empathy",
        title: "Empathy",
        properties: ["Special Attacks per Renew"],
        ranks: [
            {
                rank: 1,
                properties: ["-"],
                abilities: [
                    {name: "First Aid", rank: 0, title: "First Aid"},
                    {name: "Diagnose", rank: 0, title: "Diagnose"},
                ],
            },
            {
                rank: 2,
                properties: ["-"],
                abilities: [
                    {name: "Cure Maim", rank: 0, title: "Cure Maim"},
                ],
            },
            {
                rank: 3,
                properties: ["3"],
                abilities: [
                    {name: "Healing Hand (Heal 2)", rank: 0, title: "Healing Hand (Heal 2)"},
                ],
            },
            {
                rank: 4,
                properties: ["3"],
                abilities: [
                    {name: "Improved First Aid", rank: 0, title: "Improved First Aid"},
                ],
            },
            {
                rank: 5,
                properties: ["4"],
                abilities: [
                    {name: "With Malice Toward None", rank: 3, title: "With Malice Toward None (Heal 3)"},
                ],
            },
            {
                rank: 6,
                properties: ["4"],
                abilities: [
                    {name: "Detect Unconscious", rank: 0, title: "Detect Unconscious"},
                ],
            },
            {
                rank: 7,
                properties: ["5"],
                abilities: [
                    {name: "Master First Aid", rank: 0, title: "Master First Aid"},
                ],
            },
            {
                rank: 8,
                properties: ["5"],
                abilities: [
                    {name: "With Malice Toward None", rank: 5, title: "With Malice Toward None (Heal 5)"},
                ],
            },
            {
                rank: 9,
                properties: ["6"],
                abilities: [
                    {name: "Empath's Cry", rank: 0, title: "Empath's Cry"},
                ],
            },
            {
                rank: 10,
                properties: ["6"],
                abilities: [
                    {name: "Heroic Surgery", rank: 0, title: "Heroic Surgery"},
                ],
            },
        ]
    },


    {
        name: "Passion",
        title: "Passion",
        properties: ["Max Damage per Bolt/Burst", "Bursts per Renew", "Storms per Renew"],
        ranks: [
            {
                rank: 1,
                properties: ["2", "1", "-"],
                abilities: [
                    {name: "Summon Element", rank: 0, title: "Summon Element"},
                    {name: "Elemental Burst", rank: 0, title: "Elemental Burst"},
                ],
            },
            {
                rank: 2,
                properties: ["2", "1", "-"],
                abilities: [
                    {name: "Hedge Magic", rank: 0, title: "Hedge Magic"},
                ],
            },
            {
                rank: 3,
                properties: ["3", "2", "-"],
            },
            {
                rank: 4,
                properties: ["3", "2", "1"],
                abilities: [
                    {name: "Elemental Storm", rank: 0, title: "Elemental Storm"},
                    {name: "Purge Element", rank: 0, title: "Purge Element"},
                ],
            },
            {
                rank: 5,
                properties: ["3", "3", "1"],
                abilities: [
                    {name: "Mage Lore", rank: 0, title: "Mage Lore"},
                ],
            },
            {
                rank: 6,
                properties: ["4", "3", "1"],
            },
            {
                rank: 7,
                properties: ["4", "3", "2"],
                abilities: [
                    {name: "Elemental Kinship", rank: 0, title: "Elemental Kinship"},
                ],
            },
            {
                rank: 8,
                properties: ["4", "4", "2"],
            },
            {
                rank: 9,
                properties: ["5", "5", "2"],
            },
            {
                rank: 10,
                properties: ["5", "5", "2"],
                abilities: [
                    {name: "Summoner's Stride", rank: 0, title: "Summoner's Stride"},
                ],
            },
        ]
    },


    {
        name: "Prowess",
        title: "Prowess",
        properties: ["Special Attacks per Renew", "Deathstrikes per Day"],
        ranks: [
            {
                rank: 1,
                properties: ["1", "-"],
                abilities: [
                    {name: "Use of Arms", rank: 0, title: "Use of Arms"},
                ],
            },
            {
                rank: 2,
                properties: ["1", "-"],
                abilities: [
                    {name: "Detect Health", rank: 0, title: "Detect Health"},
                    {name: "Extra Hit Point", rank: 0, title: "Extra Hit Point"},
                ],
            },
            {
                rank: 3,
                properties: ["2", "-"],
            },
            {
                rank: 4,
                properties: ["2", "1"],
                abilities: [
                    {name: "Deathstrike", rank: 0, title: "Deathstrike"},
                ],
            },
            {
                rank: 5,
                properties: ["3", "1"],
            },
            {
                rank: 6,
                properties: ["4", "1"],
                abilities: [
                    {name: "Thrown Weapon", rank: 0, title: "Thrown Weapon"},
                ],
            },
            {
                rank: 7,
                properties: ["4", "2"],
            },
            {
                rank: 8,
                properties: ["5", "2"],
                abilities: [
                    {name: "Wrist Twist (Resist Crushing)", rank: 0, title: "Wrist Twist (Resist Crushing)"},
                ],
            },
            {
                rank: 9,
                properties: ["6", "2"],
            },
            {
                rank: 10,
                properties: ["6", "3"],
            },
        ]
    },


    {
        name: "Wisdom",
        title: "Wisdom",
        properties: ["Mana", "Resist Magic per Renew"],
        ranks: [
            {
                rank: 1,
                properties: ["1", "-"],
                abilities: [
                    {name: "Lore", rank: 0, title: "Lore"},
                    {name: "Sorcery", rank: 0, title: "Sorcery"},
                ],
            },
            {
                rank: 2,
                properties: ["2", "-"],
                abilities: [
                    {name: "Hedge Magic", rank: 0, title: "Hedge Magic"},
                    {name: "Mage Lore", rank: 0, title: "Mage Lore"},
                ],
            },
            {
                rank: 3,
                properties: ["3", "1"]
            },
            {
                rank: 4,
                properties: ["4", "1"],
                abilities: [
                    {name: "Purge Magic", rank: 1, title: "Purge Magic I"},
                ],
            },
            {
                rank: 5,
                properties: ["5", "1"],
            },
            {
                rank: 6,
                properties: ["6", "2"],
            },
            {
                rank: 7,
                properties: ["7", "2"],
                abilities: [
                    {name: "Purge Magic", rank: 2, title: "Purge Magic II"},
                ],
            },
            {
                rank: 8,
                properties: ["8", "2"],
            },
            {
                rank: 9,
                properties: ["9", "3"],
            },
            {
                rank: 10,
                properties: ["10", "3"],
            },
        ]
    },
];
