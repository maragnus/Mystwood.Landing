export enum OccupationType {
    Basic = "Basic",
    Youth = "Youth",
    Advanced = "Advanced",
    Plot = "Plot",
    Enhancement = "Enhancement",
}

export type Occupation = {
    name: string;
    type: OccupationType;
    skills: (string | SkillChoice)[]
}

export type SkillChoice = {
    count: number;
    choices: string[];
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
        skills: ["Agility", "Apprenticeship", "Duty 1 (assist master)", "Production X (any 1 Material or Component)", "Serene Contemplation"]
    },
    {
        type: OccupationType.Basic,
        name: "Baker",
        skills: ["Cooking 4", "Income 10", "News & Rumors", "Weapon Use (Flail)"]
    },
    {type: OccupationType.Basic, name: "Barber Surgeon", skills: ["Apothecary 2", "Cure Affliction", "Medicine"]},
    {
        type: OccupationType.Basic,
        name: "Bard/Minstrel/Thespian",
        skills: ["Bardic Voice 4", "Entertainer", "News & Rumors"]
    },
    {
        type: OccupationType.Basic,
        name: "Beggar",
        skills: ["Agility", "Begging", "Livery (rags and patches)", "Scavenging", {
            count: 1,
            choices: ["Information Gathering", "Weapon Use (Staff)"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Blacksmith",
        skills: ["Livery (leather apron)", "Metalworking 4", "Weapon Specialization (One Handed Blunt", "Two Handed Blunt)"]
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
        skills: ["Butcher", "Cooking 2", "Livery (bloodstained apron)", "Toughness"]
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
        skills: ["Agility", "Entertainer", "Livery (performance costume)", "News & Rumors", "Weapon Specialization (Thrown Weapon)"]
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
        skills: ["Pathfinding", "Production (2 Cloth", "6 Food)", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Basic,
        name: "Hermit",
        skills: ["Apothecary 2", "Cure Affliction", "Divine Lore", "Scribe 2"]
    },
    {
        type: OccupationType.Basic,
        name: "Hunter",
        skills: ["Butcher", "Pathfinding", "Production (2 Food)", "Weapon Specialization (Bow", "Normal Crossbow)", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Basic,
        name: "Laborer",
        skills: ["Duty 2 (Manual Labor)", "Engineering", "Income 5", "Toughness", {
            count: 1,
            choices: ["Weapon Use (Two Handed Axe)", "Weapon Use (Two Handed Blunt)"]
        }, "Weapon Use (Tool)", "Work Rhythm"]
    },
    {
        type: OccupationType.Basic,
        name: "Lackey",
        skills: ["Buy/Sell 10", "Commerce", "Livery (your master's colors)", "Quick Learner", "News & Rumors", {
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
        skills: ["Divine Lore", "Livery (robe or habit)", "Research", "Scribe 2", "Serene Contemplation"]
    },
    {
        type: OccupationType.Basic,
        name: "Peddler",
        skills: ["Buy/Sell (50)", "Commerce", "Income 10", "News & Rumors", "Pathfinding"]
    },
    {
        type: OccupationType.Basic,
        name: "Penitent",
        skills: ["Battle Rage", "Blessed", "Divine Lore", "Livery (icons of faith)", "Weapon Specialization (Flail)", "Weapon Use (Flail)"]
    },
    {
        type: OccupationType.Basic,
        name: "Ragpicker",
        skills: ["Duty 2 (Clean up trash)", "Production (any one Material)", "Scavenging", "Weapon Specialization (Tool)", {
            count: 1,
            choices: ["Toughness", "Weapon Use (Polearm)"]
        }]
    },
    {
        type: OccupationType.Basic,
        name: "Ratcatcher",
        skills: ["Engineering", "Livery (rats or rat symbols)", "Occupational Spells (page 126)", "Poisoner 2", "Set Trap", "Slayer (Vermin)"]
    },
    {
        type: OccupationType.Basic,
        name: "Squire",
        skills: ["Income 10", "Wear Armor 4", {count: 1, choices: ["Armstraining 4, Metalworking 2"]}]
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
        skills: ["Duty 1 (mending and patching)", "Medicine", "Sewing 4"]
    },
    {
        type: OccupationType.Basic,
        name: "Tavern Keeper",
        skills: ["Cooking 2", "Drinks on the House", "Duty 1 (minding the tavern)", "Income 10", "Information Gathering", "News & Rumors", "Sell Drinks"]
    },
    {
        type: OccupationType.Basic,
        name: "Tinker",
        skills: ["Armor Repair", "Buy/Sell (30)", "Commerce", "News & Rumors", "Scavenging", "Tinkering"]
    },
    {
        type: OccupationType.Basic,
        name: "Town Crier",
        skills: ["Bardic Voice 2", "Duty 1 (shout proclamations you have been hired to", "or seditious blather)", "Income 10", "Information Gathering", "News & Rumors", "Unarmed Combat"]
    },
    {
        type: OccupationType.Basic,
        name: "Town Guard",
        skills: ["Duty 1 (inspection by a Corporal or Captain of the Guard)", "Income 5", "Livery (based on local Chapter)", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 3"]
    },
    {
        type: OccupationType.Basic,
        name: "Woodsfolk",
        skills: ["Duty 1 (gathering firewood)", "Weapon Specialization (One Handed Axe", "Two Handed Axe)", "Wear Armor 1", "Woodworking 4", "Woodwise"]
    },
    {
        type: OccupationType.Youth,
        name: "Adventurer (Youth)",
        skills: ["Agility", "Scavenging", "Serene Contemplation", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Apprentice (Youth)",
        skills: ["Agility", "Apprenticeship", "Duty 1 (assist master)", "Production X (any 1 Material or Component)", "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Bard/Minstrel/Thespian (Youth)",
        skills: ["Bardic Voice 4", "Entertainer", "News & Rumors"]
    },
    {
        type: OccupationType.Youth,
        name: "Beggar (Youth)",
        skills: ["Agility", "Begging", "Livery (rags and patches)", "Scavenging", {
            count: 1,
            choices: ["Information Gathering", "Weapon Use (Staff)"]
        }]
    },
    {
        type: OccupationType.Youth,
        name: "Dancer/Juggler/Acrobat (Youth)",
        skills: ["Agility", "Entertainer", "Livery (performance costume)", "News & Rumors", "Weapon Specialization (Thrown Weapon)"]
    },
    {
        type: OccupationType.Youth,
        name: "Guttersnipe (Youth)",
        skills: ["Agility", "Duty 1 (assist master)", "Evade Trap", "Production (1 Death)", "Scavenging"]
    },
    {
        type: OccupationType.Youth,
        name: "Initiate (Youth)",
        skills: ["Divine Lore", "Livery (robes or other religious symbols)", "Quick Learner", "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Lackey (Youth)",
        skills: ["Buy/Sell 10", "Commerce", "Livery (your master's colors)", "Quick Learner", "News & Rumors", {
            count: 1,
            choices: ["Serene Contemplation", "Unarmed Combat"]
        }]
    },
    {
        type: OccupationType.Youth,
        name: "Page (Youth)",
        skills: ["Agility", "Income 5", "Livery (your patron’s colors)", "Quick Learner", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Student (Youth)",
        skills: ["Copyist", "Production (1 Parchment)", "Quick Learner", "Serene Contemplation"]
    },
    {
        type: OccupationType.Youth,
        name: "Town Guard Recruit (Youth)",
        skills: ["Duty 1 (inspection by Corporal or Captain of the Guard)", "Income 5", "Livery (green and black Town Guard tabard)", "Wear Armor 2"]
    },
    {
        type: OccupationType.Youth,
        name: "Ward (Youth)",
        skills: ["Bestow Favor", "Income 10", "Quick Learner", "Scavenging"]
    },
    {
        type: OccupationType.Advanced,
        name: "Absolver/Flagellant",
        skills: ["Absolution", "Battle Rage", "Blessed", "Divine Lore", "Improved Battle Rage", "Iron Will", "Livery (icons of faith)", "Toughness", "Weapon Specialization (Flail)", "Weapon Use (Flail)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Almoner",
        skills: ["Begging", "Blessed", "Buy/Sell 20", "Cooking 2", "Divine Lore", "Duty 1 (distribute money to the needy)", "Income 10"]
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
        skills: ["Apothecary 2", "Income 10", "Livery (beekeeping garb with mask)", "Occupational Spells (page 125)", "Production (4 Food", "4 Life)", "Serene Contemplation", "Swarm Magic", "Wear Armor 1", "Woodwise"]
    },
    {
        type: OccupationType.Advanced,
        name: "Corporal of the Guard",
        skills: ["Armstraining 2", "Duty 2 (inspecting the Guard)", "Income 10", "Leadership (Town Guard)", "Livery (based on local Chapter)", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Crofter",
        skills: ["News & Rumors", "Production (2 Cloth", "4 Food", "4 Wood)", "Weapon Specialization (Tool)", "Work Rhythm", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Demagogue",
        skills: ["Armstraining 4", "Bardic Voice 4", "Income 10", "Information Gathering", "Leadership (those who have joined your cause)", "News & Rumors", "Unarmed Combat"]
    },
    {
        type: OccupationType.Advanced,
        name: "Dragon Slayer",
        skills: ["Battle Rage", "Livery (Fantastical costume", "hair and tattoos)", "Scavenging", "Slayer (Beastman", "Draconian", "Goblin", "Minotaur", "and Troll)", "Wear Armor 3"]
    },
    {
        type: OccupationType.Advanced,
        name: "Executioner",
        skills: ["Entertainer", "Execution", "Income 10", "Livery (black hood)", "Occupational Spells (page 125)", "Poisoner 4", "Weapon Specialization (One Handed Axe", "One Handed Sword", "Two Handed Axe", "Two Handed Sword)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Famulus",
        skills: ["Armstraining 2", "Iron Will", "Livery (your master's symbol)", "Mage Lore", "Slayer (Daemons)", "Weapon Specialization (any one Weapon Type)", "Warcaster"]
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
        skills: ["Pathfinding", "Production (8 Wood)", "Weapon Specialization (One Handed Axe", "Two Handed Axe)", "Wear Armor 2", "Woodwise", "Woodworking 4"]
    },
    {
        type: OccupationType.Advanced,
        name: "Freeholder",
        skills: ["Butcher", "Patronage 1", "Production (4 Cloth", "12 Food", "2 Wood)", "Weapon Use (Flail)", "Woodwise", "Woodworking 2"]
    },
    {
        type: OccupationType.Advanced,
        name: "Gaoler",
        skills: ["Duty 1 (inspecting prisoners and upkeeping cells)", "Income 10", "Livery (Town Guard)", "Occupational Spells (page 125)", "Set Trap", "Weapon Specialization (One Handed Blunt", "Two Handed Blunt)", "Warcaster", "Wear Armor 3"]
    },
    {
        type: OccupationType.Advanced,
        name: "Herald",
        skills: ["Armstraining 2", "Bardic Voice 4", "Income 10", "Information Gathering", "Livery (Herald’s garb)", "Occupational Spells (page 126)", "Scribe 2"]
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
        skills: ["Armstraining 4", "Income 10", "Leadership (any non-Knight sworn to aid you)", "Livery (Your heraldry)", "Retainers 1", "Wear Armor 6"]
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
        skills: ["Income 20", "News & Rumors", "Production (8 Food)", "1[Production (4 Air)", "Production (4 Water)", "Production (3 Life)]", "Woodworking 4"]
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
        skills: ["Apothecary 6", "Cure Affliction", "Livery (doctor’s robes)", "Medicine", "Occupational Spells (page 126)", "Research", "Serene Contemplation"]
    },
    {
        type: OccupationType.Advanced,
        name: "Pit Fighter/Judicial Champion",
        skills: ["Armstraining 4", "Battle Rage", "Duelist", "Entertainer", "Unarmed Combat", "Wear Armor 3"]
    },
    {
        type: OccupationType.Advanced,
        name: "Poacher",
        skills: ["Butcher", "Pathfinding", "Production (3 Cloth", "6 Food)", "Weapon Specialization (Bow", "Normal Crossbow)", "Wear Armor 2", "Woodwise"]
    },
    {
        type: OccupationType.Advanced,
        name: "Quarrier",
        skills: ["Duty 1 (Manual Labor)", "Engineering", "Production (4 Earth)", "Toughness", "Weapon Use (Two Handed Blunt)", "Wear Armor 1", "Work Rhythm"]
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
        skills: ["Apothecary 4", "Cure Affliction", "Livery (Apron and gloves)", "Medicine", "Sewing 2", "Weapon Specialization (Dagger)"]
    },
    {
        type: OccupationType.Advanced,
        name: "Sergeant at Arms/Bodyguard",
        skills: ["Armstraining 6", "Income 10", "Leadership (retainers and followers of your patron)", "Livery (patron’s colors)", "Wear Armor 4"]
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
        skills: ["Duty 2 (fulfilling the requests of your master)", "Income 5", "Information Gathering", "Leadership (your master)", "Unarmed Combat", "Craft skill 2"]
    },
    {
        type: OccupationType.Plot,
        name: "Cantor",
        skills: ["Absolution", "Bardic Voice 4", "Divine Lore", "Divine Spells", "Entertainer", "Grant Karma", "News & Rumors", "Religious Ceremony", "Serene Contemplation"]
    },
    {
        type: OccupationType.Plot,
        name: "Captain of the Guard",
        skills: ["Duty 1 (reviewing the guard)", "Income 15", "Improved Leadership (Town Guard)", "Livery (based on local Chapter)", "Patronage 1", "Scribe 2", "Warcaster", "Weapon Specialization (any one Weapon Type)", "Weapon Use (Large Shield)", "Wear Armor 5"]
    },
    {
        type: OccupationType.Plot,
        name: "Friar",
        skills: ["Absolution", "Divine Lore", "Divine Spells", "Grant Karma", "News & Rumors", "Pathfinding", "Religious Ceremony"]
    },
    {
        type: OccupationType.Plot,
        name: "Inquisitor",
        skills: ["Battlemage", "Divine Lore", "Divine Spells", "Leadership (anyone under your command in battle)", "Livery (icons of faith)", "Mage Lore", "Slayer (Undead)", "Wear Armor 3", {
            count: 1,
            choices: ["Information Gathering", "Research"]
        }]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Paladin",
        skills: ["Absolution", "Battlemage", "Blessed", "Divine Lore", "Divine Spells", "Grant Karma", "Income 10", "Livery (your heraldry)", "Religious Ceremony", "Retainers 1, Wear Armor 10"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Penitent",
        skills: ["Battlemage", "Blessed", "Divine Lore", "Divine Spells", "Income 10", "Livery (your heraldry)", "Retainers 1", "Wear Armor 8"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight of the Realm",
        skills: ["Armstraining 4", "Income (50)", "Improved Leadership (anyone wearing your colors)", "Livery (Your heraldry)", "Patronage 3", "Retainers 6", "Wear Armor 8"]
    },
    {
        type: OccupationType.Plot,
        name: "Knight Templar",
        skills: ["Battlemage", "Leadership (any non-Knight sworn to aid you)", "Income 10", "Livery (your heraldry)", "Mage Lore", "Research", "Retainers 1", "Scribe 4", "Wear Armor 6"]
    },
    {
        type: OccupationType.Plot,
        name: "Magistrate",
        skills: ["Bardic Voice 2", "Commerce", "Duty 1 (holding court)", "Income 20", "News & Rumors", "Research", "Retainers 3", "Scribe 4"]
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
        skills: ["Buy/Sell 20", "Cooking 2", "Drinks on the House", "Duty 2 (minding the tavern)", "Income 10", "News & Rumors", "Patronage", "Retainers 1", "Sell Drinks", "Tavern Share"]
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
        skills: ["Guild Wages", "Instruction", "Livery (guild patch and visible tools of the trade)", "Masterwork", "Retain 1 Retain Basic Occupations skills", "+4 Craft Points to any one Craft Skill you possess"]
    },
    {type: OccupationType.Enhancement, name: "Master Healer", skills: ["Medicine"]},
    {
        type: OccupationType.Enhancement,
        name: "Town Guard Auxiliary",
        skills: ["Income (+5)", "Livery (based on local Chapter)"]
    },
];
