export enum OccupationType {
    Basic = "Basic",
    Youth = "Youth",
    Advanced = "Advanced",
    Plot = "Plot",
    Enhancement = "Enhancement",
}

export interface Occupation {
    name: string;
    type: OccupationType;
    skills: (string | SkillChoice)[]
    duty?: string,
    livery?: string,
}

export type SkillChoice = {
    count: number;
    choices: string[];
}

const Materials: string[] = ["Cloth", "Food", "Metal", "Parchment", "Wood"];
const Components: string[] = ["Air", "Earth", "Fire", "Water", "Chaos", "Death", "Life", "Time"];

function ProductionMaterialOrComponent(count: number, quantity: number): SkillChoice {
    return {
        count: count,
        choices: [...Materials, ...Components].map(name => `Production (${quantity} ${name})`)
    };
}

function ProductionMaterial(count: number, quantity: number): SkillChoice {
    return {
        count: count,
        choices: [...Materials].map(name => `Production (${quantity} ${name})`)
    };
}

export const Occupations: Occupation[] = [
    {
        type: OccupationType.Basic,
        name: "Adventurer",
        skills: ["Agility", "Scavenging", "Serene Contemplation", "Wear Armor 2"]
    },
    {
        type: OccupationType.Basic,
        name: "Apprentice",
        duty: "assist master",
        skills: ["Agility", "Apprenticeship", "Duty 1", ProductionMaterialOrComponent(1, 1), "Serene Contemplation"],
    },
    {
        type: OccupationType.Basic,
        name: "Baker",
        skills: ["Cooking 4", "Income 10", "News & Rumors", "Weapon Use (Flail)"]
    },
    {
        type: OccupationType.Basic,
        name: "Barber Surgeon",
        skills: ["Apothecary 2", "Cure Affliction", "Medicine"]
    },
    {
        type: OccupationType.Basic,
        name: "Bard/Minstrel/Thespian",
        skills: ["Bardic Voice 4", "Entertainer", "News & Rumors"]
    },
    {
        type: OccupationType.Basic,
        name: "Beggar",
        skills: ["Agility", "Begging", "Livery", "Scavenging", {
            count: 1,
            choices: ["Information Gathering", "Weapon Use (Staff)"]
        }],
        livery: "rags and patches"
    },
    {
        type: OccupationType.Basic,
        name: "Blacksmith",
        livery: "leather apron",
        skills: ["Livery", "Metalworking 4", "Weapon Specialization (One Handed Blunt)", "Weapon Specialization (Two Handed Blunt)"]
    },
    {
        type: OccupationType.Basic,
        name: "Boatman",
        skills: ["Buy/Sell 10", "Income 5", "Production (1 Water)", "News & Rumors", "Work Rhythm", {
            count: 1,
            choices: ["Cosmopolitan Connections", "Scavenging"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Butcher",
        livery: "bloodstained apron",
        skills: ["Butcher", "Cooking 2", "Livery", "Toughness"]
    },
    {
        type: OccupationType.Basic,
        name: "Clerk/Forger",
        skills: ["Copyist", "Production (2 Parchment)", "Scribe 4", "Serene Contemplation"]
    },
    {
        type: OccupationType.Basic,
        name: "Courier",
        skills: ["Agility", "Income 5", "News & Rumors", "Pathfinding", "Scribe 2"]
    },
    {
        type: OccupationType.Basic,
        name: "Dancer/Juggler/Acrobat",
        livery: "performance costume",
        skills: ["Agility", "Entertainer", "Livery", "News & Rumors", "Weapon Specialization (Thrown Weapon)"]
    },
    {
        type: OccupationType.Basic,
        name: "Folk Healer",
        skills: ["Apothecary 2", "Cure Affliction", "Detect Health", "News & Rumors"]
    },
    {
        type: OccupationType.Basic,
        name: "Fortune Teller",
        skills: ["Fortune Telling", "Income 10", "Mage Lore", "News & Rumors", "Serene Contemplation", {
            count: 1,
            choices: ["Bardic Voice 2", "Scribe 2"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Gentlefolk",
        skills: ["Bestow Favor", "Income 10", {
            count: 2,
            choices: ["Bardic Voice 2", "Cooking 2", "Divine Lore", "Information Gathering", "Research", "Scribe 2", "Serene Contemplation", "Sewing 2"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Gravedigger",
        skills: ["Engineering", "Income 5", "Occupational Spells (page 126)", "Production (1 Death Component)", "Slayer (Undead)", "Weapon Specialization (Tool)", "Woodworking 2"]
    },
    {
        type: OccupationType.Basic,
        name: "Herbalist",
        skills: ["Apothecary 4", "Cure Affliction", "Mage Lore", "Woodwise"]
    },
    {
        type: OccupationType.Basic,
        name: "Herder",
        skills: ["Pathfinding", "Production (2 Cloth)", "Production (6 Food)", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Basic,
        name: "Hermit",
        skills: ["Apothecary 2", "Cure Affliction", "Divine Lore", "Scribe 2"]
    },
    {
        type: OccupationType.Basic,
        name: "Hunter",
        skills: ["Butcher", "Pathfinding", "Production (2 Food)", "Weapon Specialization (Bow)", "Weapon Specialization (Normal Crossbow)", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Basic,
        name: "Laborer",
        duty: "Manual Labor",
        skills: ["Duty 2", "Engineering", "Income 5", "Toughness", {
            count: 1,
            choices: ["Weapon Use (Two Handed Axe)", "Weapon Use (Two Handed Blunt)"]
        }, "Weapon Use (Tool)", "Work Rhythm"]
    },
    {
        type: OccupationType.Basic,
        name: "Lackey",
        livery: "your master's colors",
        skills: ["Buy/Sell 10", "Commerce", "Livery", "Quick Learner", "News & Rumors", {
            count: 1,
            choices: ["Serene Contemplation", "Unarmed Combat"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Lay Cleric",
        skills: ["Divine Lore", "Divine Spells", "Income 5", "Religious Ceremony", "Serene Contemplation", "Wear Armor 3", {
            count: 1,
            choices: ["Warcaster", "Weapon Specialization (One Handed Blunt)", "Weapon Specialization (One Handed Sword)", "Weapon Specialization (Two Handed Blunt)", "Weapon Specialization (Two Handed Sword)"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Locksmith",
        skills: ["Engineering", "Income 5", "Set Trap", "Weapon Use (Staff)", "Woodworking 4"]
    },
    {
        type: OccupationType.Basic,
        name: "Novice Monk",
        livery: "robe or habit",
        skills: ["Divine Lore", "Livery", "Research", "Scribe 2", "Serene Contemplation"]
    },
    {
        type: OccupationType.Basic,
        name: "Peddler",
        skills: ["Buy/Sell (50)", "Commerce", "Income 10", "News & Rumors", "Pathfinding"]
    },
    {
        type: OccupationType.Basic,
        name: "Penitent",
        livery: "icons of faith",
        skills: ["Battle Rage", "Blessed", "Divine Lore", "Livery", "Weapon Specialization (Flail)", "Weapon Use (Flail)"]
    },
    {
        type: OccupationType.Basic,
        name: "Ragpicker",
        duty: "Clean up trash",
        skills: ["Duty 2", ProductionMaterial(1, 1), "Scavenging", "Weapon Specialization (Tool)", {
            count: 1,
            choices: ["Toughness", "Weapon Use (Polearm)"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Ratcatcher",
        livery: "rats or rat symbols",
        skills: ["Engineering", "Livery", "Occupational Spells (page 126)", "Poisoner 2", "Set Trap", "Slayer (Vermin)"]
    },
    {
        type: OccupationType.Basic,
        name: "Squire",
        skills: ["Income 10", "Wear Armor 4", {count: 1, choices: ["Armstraining 4", "Metalworking 2"]}]
    },
    {
        type: OccupationType.Basic,
        name: "Street Vendor",
        skills: ["Buy/Sell 10", "Cooking 2", "News & Rumors", "Scavenging", {
            count: 1,
            choices: ["Metalworking 2", "Sewing 2", "Woodworking 2"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Tailor/Leatherworker",
        duty: "mending and patching",
        skills: ["Duty 1", "Medicine", "Sewing 4"]
    },
    {
        type: OccupationType.Basic,
        name: "Tavern Keeper",
        duty: "minding the tavern",
        skills: ["Cooking 2", "Drinks on the House", "Duty 1", "Income 10", "Information Gathering", "News & Rumors", "Sell Drinks"]
    },
    {
        type: OccupationType.Basic,
        name: "Tinker",
        skills: ["Armor Repair", "Buy/Sell (30)", "Commerce", "News & Rumors", "Scavenging", "Tinkering"]
    },
    {
        type: OccupationType.Basic,
        name: "Town Crier",
        skills: ["Bardic Voice 2", "Duty 1", "Income 10", "Information Gathering", "News & Rumors", "Unarmed Combat"],
        duty: "shout proclamations you have been hired to or seditious blather"
    },
    {
        type: OccupationType.Basic,
        name: "Town Guard",
        duty: "inspection by a Corporal or Captain of the Guard",
        livery: "based on local Chapter",
        skills: ["Duty 1", "Income 5", "Livery", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 3"]
    },
    {
        type: OccupationType.Basic,
        name: "Woodsfolk",
        duty: "gathering firewood",
        skills: ["Duty 1", "Weapon Specialization (One Handed Axe)", "Weapon Specialization (Two Handed Axe)", "Wear Armor 1", "Woodworking 4", "Woodwise"]
    },
    {
        type: OccupationType.Youth,
        name: "Adventurer (Youth)",
        skills: ["Agility", "Scavenging", "Serene Contemplation", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Apprentice (Youth)",
        duty: "assist master",
        skills: ["Agility", "Apprenticeship", "Duty 1", ProductionMaterialOrComponent(1, 1), "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Bard/Minstrel/Thespian (Youth)",
        skills: ["Bardic Voice 4", "Entertainer", "News & Rumors"]
    },
    {
        type: OccupationType.Youth,
        name: "Beggar (Youth)",
        livery: "rags and patches",
        skills: ["Agility", "Begging", "Livery", "Scavenging", {
            count: 1,
            choices: ["Information Gathering", "Weapon Use (Staff)"]
        }]
    },
    {
        type: OccupationType.Youth,
        name: "Dancer/Juggler/Acrobat (Youth)",
        livery: "performance costume",
        skills: ["Agility", "Entertainer", "Livery", "News & Rumors", "Weapon Specialization (Thrown Weapon)"]
    },
    {
        type: OccupationType.Youth,
        name: "Guttersnipe (Youth)",
        duty: "assist master",
        skills: ["Agility", "Duty 1", "Evade Trap", "Production (1 Death)", "Scavenging"]
    },
    {
        type: OccupationType.Youth,
        name: "Initiate (Youth)",
        livery: "robes or other religious symbols",
        skills: ["Divine Lore", "Livery", "Quick Learner", "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Lackey (Youth)",
        livery: "your master's colors",
        skills: ["Buy/Sell 10", "Commerce", "Livery", "Quick Learner", "News & Rumors", {
            count: 1,
            choices: ["Serene Contemplation", "Unarmed Combat"]
        }]
    },
    {
        type: OccupationType.Youth,
        name: "Page (Youth)",
        livery: "your patron’s colors",
        skills: ["Agility", "Income 5", "Livery", "Quick Learner", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Student (Youth)",
        skills: ["Copyist", "Production (1 Parchment)", "Quick Learner", "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Town Guard Recruit (Youth)",
        duty: "inspection by Corporal or Captain of the Guard",
        livery: "green and black Town Guard tabard",
        skills: ["Duty 1", "Income 5", "Livery", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Ward (Youth)",
        skills: ["Bestow Favor", "Income 10", "Quick Learner", "Scavenging"]
    },
    {
        type: OccupationType.Advanced,
        name: "Absolver/Flagellant",
        livery: "icons of faith",
        skills: ["Absolution", "Battle Rage", "Blessed", "Divine Lore", "Improved Battle Rage", "Iron Will", "Livery", "Toughness", "Weapon Specialization (Flail)", "Weapon Use (Flail)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Almoner",
        duty: "distribute money to the needy",
        skills: ["Begging", "Blessed", "Buy/Sell 20", "Cooking 2", "Divine Lore", "Duty 1", "Income 10"]
    },
    {
        type: OccupationType.Advanced,
        name: "Artist (Author/Gilder/Painter/Sculptor)",
        skills: ["Artistry", "Income 10", "Serene Contemplation", {
            count: 1,
            choices: ["Metalworking 4", "Scribe 4", "Sewing 4", "Woodworking 4"]
        }, {
            count: 1,
            choices: ["Commerce", "Divine Lore", "Engineering", "Mage Lore", "Woodwise"]
        }
        ]
    },
    {
        type: OccupationType.Advanced,
        name: "Astrologer",
        skills: ["Fortune Telling", "Divine Lore", "Information Gathering", "Mage Lore", "Production (1 Time)", "Research", "Scribe 2", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Beekeeper",
        livery: "beekeeping garb with mask",
        skills: ["Apothecary 2", "Income 10", "Livery", "Occupational Spells (page 125)", "Production (4 Food)", "Production (4 Life)", "Serene Contemplation", "Swarm Magic", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Advanced,
        name: "Corporal of the Guard",
        duty: "inspecting the Guard",
        livery: "based on local Chapter",
        skills: ["Armstraining 2", "Duty 2", "Income 10", "Leadership (Town Guard)", "Livery", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Crofter",
        skills: ["News & Rumors", "Production (2 Cloth)", "Production (4 Food)", "Production (4 Wood)", "Weapon Specialization (Tool)", "Work Rhythm", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Demagogue",
        skills: ["Armstraining 4", "Bardic Voice 4", "Income 10", "Information Gathering", "Leadership (those who have joined your cause)", "News & Rumors", "Unarmed Combat"]
    },
    {
        type: OccupationType.Advanced,
        name: "Dragon Slayer",
        skills: ["Battle Rage", "Livery", "Scavenging", "Slayer (Beastman)", "Slayer (Draconian)", "Slayer (Goblin)", "Slayer (Minotaur)", "Slayer (Troll)", "Wear Armor 3"],
        livery: "Fantastical costume, hair, and tattoos",
    },
    {
        type: OccupationType.Advanced,
        name: "Executioner",
        livery: "black hood",
        skills: ["Entertainer", "Execution", "Income 10", "Livery", "Occupational Spells (page 125)", "Poisoner 4", "Weapon Specialization (One Handed Axe)", "Weapon Specialization (One Handed Sword)", "Weapon Specialization (Two Handed Axe)", "Weapon Specialization (Two Handed Sword)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Famulus",
        livery: "your master's symbol",
        skills: ["Armstraining 2", "Iron Will", "Livery", "Mage Lore", "Slayer (Daemons)", "Weapon Specialization (any one Weapon Type)", "Warcaster"]
    },
    {
        type: OccupationType.Advanced,
        name: "Fence/Pawnbroker",
        skills: ["Buy/Sell (50)", "Commerce", "Fence", "Income 10", "News & Rumors", "Retainers 1", {
            count: 1,
            choices: ["Information Gathering", "Research"]
        }]
    },
    {
        type: OccupationType.Advanced,
        name: "Forester/Ranger/Gamekeeper",
        skills: ["Pathfinding", "Production (8 Wood)", "Weapon Specialization (One Handed Axe)", "Weapon Specialization (Two Handed Axe)", "Wear Armor 2", "Woodwise", "Woodworking 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Freeholder",
        skills: ["Butcher", "Patronage 1", "Production (4 Cloth)", "Production (12 Food)", "Production (2 Wood)", "Weapon Use (Flail)", "Woodwise", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Gaoler",
        duty: "inspecting prisoners and upkeeping cells",
        livery: "Town Guard",
        skills: ["Duty 1", "Income 10", "Livery", "Occupational Spells (page 125)", "Set Trap", "Weapon Specialization (One Handed Blunt)", "Weapon Specialization (Two Handed Blunt)", "Warcaster", "Wear Armor 3"]
    },
    {
        type: OccupationType.Advanced,
        name: "Herald",
        livery: "Herald’s garb",
        skills: ["Armstraining 2", "Bardic Voice 4", "Income 10", "Information Gathering", "Livery", "Occupational Spells (page 126)", "Scribe 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Juror",
        skills: ["Bardic Voice 2", "Research", "Scribe 2", "Serene Contemplation", {
            count: 2,
            choices: ["Commerce", "Detect Health", "Divine Lore", "Engineering", "Iron Will", "Mage Lore", "News & Rumors", "Woodwise"]
        }]
    },
    {
        type: OccupationType.Advanced,
        name: "Knight Errant",
        livery: "Your heraldry",
        skills: ["Armstraining 4", "Income 10", "Leadership (any non-Knight sworn to aid you)", "Livery", "Retainers 1", "Wear Armor 6"]
    },
    {
        type: OccupationType.Advanced,
        name: "Librarian",
        skills: ["Copyist", "Research x2", "Scribe 4", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Litigant",
        skills: ["Bardic Voice 2", "Battle Rage", "Duelist", "Livery (red surcoat) Toughness", "Unarmed Combat"]
    },
    {
        type: OccupationType.Advanced,
        name: "Master Thespian",
        skills: ["Bardic Voice 6", "Master Entertainer", "Income 10", "News & Rumors", "Scribe 2", {
            count: 1,
            choices: ["Information Gathering", "Research"]
        }]
    },
    {
        type: OccupationType.Advanced,
        name: "Merchant",
        skills: ["Buy/Sell (100)", "Commerce", "Income 20", "News & Rumors", "Patronage 1", "Retainers 2", "any one Craft 2 skill"]
    },
    {
        type: OccupationType.Advanced,
        name: "Miller",
        skills: ["Income 20", "News & Rumors", "Production (8 Food)", {
            count: 1,
            choices: ["Production (4 Air)", "Production (4 Water)", "Production (3 Life)"]
        },
            "Woodworking 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Miner",
        skills: ["Commerce", "Engineering", "Metalworking 2", "Patronage 1", "Production (8 Metal)", "Weapon Specialization (Tool)", "Wear Armor 3", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Philosopher",
        skills: ["Loremaster", "Production (2 Parchment)", "Research x2", "Scribe 6", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Physician",
        livery: "doctor’s robes",
        skills: ["Apothecary 6", "Cure Affliction", "Livery", "Medicine", "Occupational Spells (page 126)", "Research", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Pit Fighter/Judicial Champion",
        skills: ["Armstraining 4", "Battle Rage", "Duelist", "Entertainer", "Unarmed Combat", "Wear Armor 3"]
    },
    {
        type: OccupationType.Advanced,
        name: "Poacher",
        skills: ["Butcher", "Pathfinding", "Production (3 Cloth)", "Production (6 Food)", "Weapon Specialization (Bow)", "Weapon Specialization (Normal Crossbow)", "Wear Armor 2", "Woodwise"]
    },
    {
        type: OccupationType.Advanced,
        name: "Quarrier",
        duty: "Manual Labor",
        skills: ["Duty 1", "Engineering", "Production (4 Earth)", "Toughness", "Weapon Use (Two Handed Blunt)", "Wear Armor 1", "Work Rhythm"]
    },
    {
        type: OccupationType.Advanced,
        name: "Ruffian",
        skills: ["Brawler", "Scavenging", "Toughness", "Unarmed Combat", "Weapon Specialization (One Handed Blunt)", "Wear Armor 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Sacristan",
        skills: ["Blessed", "Divine Lore", "Research", "Scribe 2", "Set Trap", "Weapon Specialization (any one)", "Wear Armor 2", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Sawbones",
        livery: "Apron and gloves",
        skills: ["Apothecary 4", "Cure Affliction", "Livery", "Medicine", "Sewing 2", "Weapon Specialization (Dagger)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Sergeant at Arms/Bodyguard",
        livery: "patron’s colors",
        skills: ["Armstraining 6", "Income 10", "Leadership (retainers and followers of your patron)", "Livery", "Wear Armor 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Sharp",
        skills: ["Bardic Voice 2", "Commerce", "Cosmopolitan Connections", "Fortune Telling", "Information Gathering", "Iron Will", "News & Rumors", "Room for More", "Unarmed Combat."]
    },
    {
        type: OccupationType.Advanced,
        name: "Steward",
        skills: ["Buy/Sell (50)", "Cooking 6", "Commerce", "Leadership (retainers and followers of your patron)", "Scribe 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Theologian",
        skills: ["Bardic Voice 2", "Divine Lore", "Divine Spells", "Research x2", "Scribe 4", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Varlet",
        duty: "fulfilling the requests of your master",
        skills: ["Duty 2", "Income 5", "Information Gathering", "Leadership (your master)", "Unarmed Combat", "Craft skill 2"]
    },
    {
        type: OccupationType.Plot,
        name: "Cantor",
        skills: ["Absolution", "Bardic Voice 4", "Divine Lore", "Divine Spells", "Entertainer", "Grant Karma", "News & Rumors", "Religious Ceremony", "Serene Contemplation"]
    },
    {
        type: OccupationType.Plot,
        name: "Captain of the Guard",
        duty: "reviewing the guard",
        livery: "based on local Chapter",
        skills: ["Duty 1", "Income 15", "Improved Leadership (Town Guard)", "Livery", "Patronage 1", "Scribe 2", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 5"]
    },
    {
        type: OccupationType.Plot,
        name: "Friar",
        skills: ["Absolution", "Divine Lore", "Divine Spells", "Grant Karma", "News & Rumors", "Pathfinding", "Religious Ceremony"]
    },
    {
        type: OccupationType.Plot,
        name: "Inquisitor",
        livery: "icons of faith",
        skills: ["Battlemage", "Divine Lore", "Divine Spells", "Leadership (anyone under your command in battle)", "Livery", "Mage Lore", "Slayer (Undead)", "Wear Armor 3", {
            count: 1,
            choices: ["Information Gathering", "Research"]
        }]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Paladin",
        livery: "your heraldry",
        skills: ["Absolution", "Battlemage", "Blessed", "Divine Lore", "Divine Spells", "Grant Karma", "Income 10", "Livery", "Religious Ceremony", "Retainers 1, Wear Armor 10"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Penitent",
        livery: "your heraldry",
        skills: ["Battlemage", "Blessed", "Divine Lore", "Divine Spells", "Income 10", "Livery", "Retainers 1", "Wear Armor 8"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight of the Realm",
        livery: "Your heraldry",
        skills: ["Armstraining 4", "Income (50)", "Improved Leadership (anyone wearing your colors)", "Livery", "Patronage 3", "Retainers 6", "Wear Armor 8"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Templar",
        livery: "your heraldry",
        skills: ["Battlemage", "Leadership (any non-Knight sworn to aid you)", "Income 10", "Livery", "Mage Lore", "Research", "Retainers 1", "Scribe 4", "Wear Armor 6"]
    },
    {
        type: OccupationType.Plot,
        name: "Magistrate",
        duty: "holding court",
        skills: ["Bardic Voice 2", "Commerce", "Duty 1", "Income 20", "News & Rumors", "Research", "Retainers 3", "Scribe 4"]
    },
    {
        type: OccupationType.Plot,
        name: "Ordained Priest",
        skills: ["Absolution", "Battlemage", "Divine Lore", "Divine Spells", "Grant Karma", "Income 10", "Religious Ceremony", "Serene Contemplation", {
            count: 1,
            choices: ["Weapon Specialization (One Handed Blunt)", "Weapon Specialization (One Handed Sword)", "Weapon Specialization (Two Handed Blunt)", "Weapon Specialization (Two Handed Sword)"]
        }, "Wear Armor 4"]
    },
    {
        type: OccupationType.Plot,
        name: "Tavern Master",
        duty: "minding the tavern",
        skills: ["Buy/Sell 20", "Cooking 2", "Drinks on the House", "Duty 2", "Income 10", "News & Rumors", "Patronage", "Retainers 1", "Sell Drinks", "Tavern Share"]
    },
    {
        type: OccupationType.Plot,
        name: "Witch Hunter",
        skills: ["Armstraining 2", "Battlemage", "Leadership (anyone under your command in battle)", "Mage Lore", "Occupational Spells (page 126)", "Set Trap", "Slayer (Daemons)", "Wear Armor 4", {
            count: 1,
            choices: ["Information Gathering", "Research"]
        }]
    }
];

export const Enhancements: Occupation[] = [
    {
        type: OccupationType.Enhancement,
        name: "Alchemist",
        skills: [{count: 1, choices: ["Production (Chaos)", "Production (Time)"]}]
    },
    {type: OccupationType.Enhancement, name: "Barback", skills: ["Income 5", "Sell Drinks"]},
    {
        type: OccupationType.Enhancement,
        name: "Guild Crafter",
        skills: ["Guild Wages", "Livery (guild patch and visible tools of the trade). +2 Craft Points to any one Craft Skill you possess."]
    },
    {
        type: OccupationType.Enhancement,
        name: "Master Crafter",
        livery: "guild patch and visible tools of the trade",
        skills: ["Guild Wages", "Instruction", "Livery", "Masterwork", "Retain 1 Retain Basic Occupations skills", "+4 Craft Points to any one Craft Skill you possess"]
    },
    {type: OccupationType.Enhancement, name: "Master Healer", skills: ["Medicine"]},
    {
        type: OccupationType.Enhancement,
        name: "Town Guard Auxiliary",
        livery: "based on local Chapter",
        skills: ["Income (+5)", "Livery"]
    },
];
