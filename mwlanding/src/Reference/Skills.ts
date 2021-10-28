export type Skill = {
    name: string;
    title: string;
    class: SkillClass,
    ranks: SkillRanks,
    rank?: number, // Rank granted per purchase
    cost?: number | null
};

export enum SkillClass {
    Unavailable = 'Unavailable',
    Free = 'Free',
    Minor = 'Minor',
    Standard = 'Standard',
    Major = 'Major',
}

export enum SkillRanks {
    Unavailable = 'Unavailable',
    Once = 'Once',
    Multiple = 'Multiple',
}

export const Skills: Skill[] = [
    {
        name: "Absolution",
        title: "Absolution",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Agility",
        title: "Agility",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Apothecary",
        title: "Apothecary X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Apprenticeship",
        title: "Apprenticeship",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Armor Repair",
        title: "Armor Repair",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Armored In Faith",
        title: "Armored In Faith",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Armstraining",
        title: "Armstraining X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Artistry",
        title: "Artistry",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Bardic Magic",
        title: "Bardic Magic",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Bardic Voice",
        title: "Bardic Voice X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Basic Weaponry",
        title: "Basic Weaponry",
        class: SkillClass.Free,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Battle Rage",
        title: "Battle Rage",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Battlemage",
        title: "Battlemage",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Begging",
        title: "Begging",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Beloved of the Forest",
        title: "Beloved of the Forest",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Bestow Favor",
        title: "Bestow Favor",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Blessed",
        title: "Blessed",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Brawler",
        title: "Brawler",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Butcher",
        title: "Butcher",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Buy/Sell",
        title: "Buy/Sell X",
        class: SkillClass.Minor,
        ranks: SkillRanks.Multiple,
        rank: 10,
        cost: 5
    },
    {
        name: "Carry Wounded",
        title: "Carry Wounded",
        class: SkillClass.Free,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Commerce",
        title: "Commerce",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Cooking",
        title: "Cooking X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Copyist",
        title: "Copyist",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Cosmopolitan Connections",
        title: "Cosmopolitan Connections",
        class: SkillClass.Standard,
        ranks: SkillRanks.Unavailable,
        cost: 10
    },
    {
        name: "Cure Affliction",
        title: "Cure Affliction",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Detect Health",
        title: "Detect Health",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Divine Lore",
        title: "Divine Lore",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Divine Spells",
        title: "Divine Spells",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Drinks on the House",
        title: "Drinks on the House",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Duelist",
        title: "Duelist",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Duty",
        title: "Duty X",
        class: SkillClass.Standard,
        ranks: SkillRanks.Unavailable,
        cost: 10
    },
    {
        name: "Engineering",
        title: "Engineering",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Entertainer",
        title: "Entertainer",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Evade Trap",
        title: "Evade Trap",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Execution",
        title: "Execution",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Fence",
        title: "Fence",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Flee",
        title: "Flee",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Fortune Telling",
        title: "Fortune Telling",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Fully Armored",
        title: "Fully Armored",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Grant Karma",
        title: "Grant Karma",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Guild Wages",
        title: "Guild Wages",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Hagsblood",
        title: "Hagsblood",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Battle Endurance",
        title: "Improved Battle Endurance",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Battle Rage",
        title: "Improved Battle Rage",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Improved Burst Casting",
        title: "Improved Burst Casting",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Improved Bestow Favor",
        title: "Improved Bestow Favor",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Butcher",
        title: "Improved Butcher",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Duelist",
        title: "Improved Duelist",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Improved Instruction",
        title: "Improved Instruction",
        class: SkillClass.Major,
        ranks: SkillRanks.Multiple,
        cost: 15
    },
    {
        name: "Improved Leadership",
        title: "Improved Leadership",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Improved Resistance",
        title: "Improved Resistance",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Scavenging",
        title: "Improved Scavenging",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Improved Storm Casting",
        title: "Improved Storm Casting",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Income",
        title: "Income X",
        class: SkillClass.Minor,
        ranks: SkillRanks.Multiple,
        rank: 5,
        cost: 5
    },
    {
        name: "Increased Mana",
        title: "Increased Mana",
        class: SkillClass.Standard,
        ranks: SkillRanks.Multiple,
        cost: 10
    },
    {
        name: "Information Gathering",
        title: "Information Gathering",
        class: SkillClass.Standard,
        ranks: SkillRanks.Unavailable,
        cost: 10
    },
    {
        name: "Instruction",
        title: "Instruction",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Iron Will",
        title: "Iron Will",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Joy of Life",
        title: "Joy of Life",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Knockout",
        title: "Knockout",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Leadership",
        title: "Leadership",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Literacy",
        title: "Literacy",
        class: SkillClass.Free,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Livery",
        title: "Livery",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Loremaster",
        title: "Loremaster",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Mage Lore",
        title: "Mage Lore",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Master Entertainer",
        title: "Master Entertainer",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Masterwork",
        title: "Masterwork",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Medicine",
        title: "Medicine",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Metalworking",
        title: "Metalworking X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "News & Rumors",
        title: "News & Rumors",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Occupational Spells",
        title: "Occupational Spells",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Pathfinding",
        title: "Pathfinding",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Patronage",
        title: "Patronage X",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Poisoner",
        title: "Poisoner X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Precision",
        title: "Precision",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Production (Type)",
        title: "Production X (Type)",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Quick Learner",
        title: "Quick Learner",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Religious Ceremony",
        title: "Religious Ceremony",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Research",
        title: "Research",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Retainers",
        title: "Retainers X",
        class: SkillClass.Minor,
        ranks: SkillRanks.Multiple,
        rank: 1,
        cost: 5
    },
    {
        name: "Room for More",
        title: "Room for More",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Scavenging",
        title: "Scavenging",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Scribe",
        title: "Scribe X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Sell Drinks",
        title: "Sell Drinks",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Serene Contemplation",
        title: "Serene Contemplation",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Set Trap",
        title: "Set Trap",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Sewing",
        title: "Sewing X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Shifter Senses",
        title: "Shifter Senses",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Slayer (Type)",
        title: "Slayer (Type)",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Standard Bearer",
        title: "Standard Bearer",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Stench of the Enemy",
        title: "Stench of the Enemy",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Sunder",
        title: "Sunder",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Swarm Magic",
        title: "Swarm Magic",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Tarot Mortis Punchinello",
        title: "Tarot Mortis Punchinello",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Taunt",
        title: "Taunt",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Tavern Share",
        title: "Tavern Share",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Tinkering",
        title: "Tinkering",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    },
    {
        name: "Toughness",
        title: "Toughness",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Unarmed Combat",
        title: "Unarmed Combat",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Use Two Weapons",
        title: "Use Two Weapons",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        cost: 15
    },
    {
        name: "Wages of Sin",
        title: "Wages of Sin",
        class: SkillClass.Minor,
        ranks: SkillRanks.Multiple,
        cost: 5
    },
    {
        name: "Warcaster",
        title: "Warcaster",
        class: SkillClass.Standard,
        ranks: SkillRanks.Once,
        cost: 10
    },
    {
        name: "Weapon Specialization (Type)",
        title: "Weapon Specialization (Type)",
        class: SkillClass.Standard,
        ranks: SkillRanks.Multiple,
        cost: 10
    },
    {
        name: "Weapon Use (Type)",
        title: "Weapon Use (Type)",
        class: SkillClass.Standard,
        ranks: SkillRanks.Multiple,
        cost: 10
    },
    {
        name: "Wear Armor",
        title: "Wear Armor X",
        class: SkillClass.Minor,
        ranks: SkillRanks.Multiple,
        rank: 1,
        cost: 5
    },
    {
        name: "Woodwise",
        title: "Woodwise",
        class: SkillClass.Minor,
        ranks: SkillRanks.Once,
        cost: 5
    },
    {
        name: "Woodworking",
        title: "Woodworking X",
        class: SkillClass.Major,
        ranks: SkillRanks.Once,
        rank: 2,
        cost: 15
    },
    {
        name: "Work Rhythm",
        title: "Work Rhythm",
        class: SkillClass.Unavailable,
        ranks: SkillRanks.Unavailable,
        cost: null
    }
];

const skillsLookup: Map<string, Skill> =
    Skills.reduce((dict, skill) => {
        dict.set(skill.name, skill);
        return dict;
    }, new Map<string, Skill>());

export const SkillByName: ((name: string) => Skill) = (name: string) =>
    skillsLookup.get(name) ?? Skills[0];
