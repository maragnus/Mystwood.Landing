export type CharacterSheet = {
    characterName?: string;
    religions?: string[];
    occupation?: string;
    enhancement?: string;
    home?: string;
    publicStory?: string;
    privateStory?: string;
    notes?: string;
}

export type Trait = {
    name: string;
    title?: string;
    description?: string;
    type?: string
    value?: number;
}

export type Gift = {
    name: string;
    title: string;
    levels: GiftLevel[];
}

export type GiftLevel = {
    index: number;
    abilities: Trait[];
}

export const HomeChapters: Trait[] = [
    {name: "albion", title: "Albion"},
    {name: "burgundar", title: "Burgundar"},
    {name: "keep", title: "The Keep"},
]

export const Gifts: Gift[] = [];
export const Skills: Trait[] = [];
export const Advantages: Trait[] = [];
export const Disadvantages: Trait[] = [];

export const Religions: Trait[] = [
    {name: "wild", title: "Follower of the Wild"},
    {name: "justice", title: "Follower of Justice"},
    {name: "mercy", title: "Follower of Mercy"},
];

export const Occupations: Trait[] = [
    {
        title: "Absolver/Flagellant",
        name: "6164ced9be316488997a8294",
        type: "Advanced"
    },
    {
        title: "Almoner",
        name: "6164ced9be316488997a8296",
        type: "Advanced"
    },
    {
        title: "Artist (Author/Gilder/Painter/Sculptor)",
        name: "6164ced9be316488997a8298",
        type: "Advanced"
    },
    {
        title: "Astrologer",
        name: "6164ced9be316488997a829a",
        type: "Advanced"
    },
    {
        title: "Beekeeper",
        name: "6164ced9be316488997a829c",
        type: "Advanced"
    },
    {
        title: "Corporal of the Guard",
        name: "6164ced9be316488997a829e",
        type: "Advanced"
    },
    {
        title: "Crofter",
        name: "6164ced9be316488997a82a0",
        type: "Advanced"
    },
    {
        title: "Demagogue",
        name: "6164ced9be316488997a82a2",
        type: "Advanced"
    },
    {
        title: "Dragon Slayer",
        name: "6164ced9be316488997a82a4",
        type: "Advanced"
    },
    {
        title: "Executioner",
        name: "6164ced9be316488997a82a6",
        type: "Advanced"
    },
    {
        title: "Famulus",
        name: "6164ced9be316488997a82a8",
        type: "Advanced"
    },
    {
        title: "Fence/Pawnbroker",
        name: "6164ced9be316488997a82aa",
        type: "Advanced"
    },
    {
        title: "Forester/Ranger/Gamekeeper",
        name: "6164ced9be316488997a82ac",
        type: "Advanced"
    },
    {
        title: "Freeholder",
        name: "6164ced9be316488997a82ae",
        type: "Advanced"
    },
    {
        title: "Gaoler",
        name: "6164ced9be316488997a82b0",
        type: "Advanced"
    },
    {
        title: "Herald",
        name: "6164ced9be316488997a82b2",
        type: "Advanced"
    },
    {
        title: "Juror",
        name: "6164ced9be316488997a82b4",
        type: "Advanced"
    },
    {
        title: "Knight Errant",
        name: "6164ced9be316488997a82b6",
        type: "Advanced"
    },
    {
        title: "Librarian",
        name: "6164ced9be316488997a82b8",
        type: "Advanced"
    },
    {
        title: "Litigant",
        name: "6164ced9be316488997a82ba",
        type: "Advanced"
    },
    {
        title: "Master Thespian",
        name: "6164ced9be316488997a82bc",
        type: "Advanced"
    },
    {
        title: "Merchant",
        name: "6164ced9be316488997a82be",
        type: "Advanced"
    },
    {
        title: "Miller",
        name: "6164ced9be316488997a82c0",
        type: "Advanced"
    },
    {
        title: "Miner",
        name: "6164ced9be316488997a82c2",
        type: "Advanced"
    },
    {
        title: "Philosopher",
        name: "6164ced9be316488997a82c4",
        type: "Advanced"
    },
    {
        title: "Physician",
        name: "6164ced9be316488997a82c6",
        type: "Advanced"
    },
    {
        title: "Pit Fighter/Judicial Champion",
        name: "6164ced9be316488997a82c8",
        type: "Advanced"
    },
    {
        title: "Poacher",
        name: "6164ced9be316488997a82ca",
        type: "Advanced"
    },
    {
        title: "Quarrier",
        name: "6164ced9be316488997a82cc",
        type: "Advanced"
    },
    {
        title: "Ruffian",
        name: "6164ced9be316488997a82ce",
        type: "Advanced"
    },
    {
        title: "Sacristan",
        name: "6164ced9be316488997a82d0",
        type: "Advanced"
    },
    {
        title: "Sawbones",
        name: "6164ced9be316488997a82d2",
        type: "Advanced"
    },
    {
        title: "Sergeant at Arms/Bodyguard",
        name: "6164ced9be316488997a82d4",
        type: "Advanced"
    },
    {
        title: "Sharp",
        name: "6164ced9be316488997a82d6",
        type: "Advanced"
    },
    {
        title: "Steward",
        name: "6164ced9be316488997a82d8",
        type: "Advanced"
    },
    {
        title: "Theologian",
        name: "6164ced9be316488997a82da",
        type: "Advanced"
    },
    {
        title: "Varlet",
        name: "6164ced9be316488997a82dc",
        type: "Advanced"
    },
    {
        title: "Adventurer",
        name: "6164ced9be316488997a8232",
        type: "Basic"
    },
    {
        title: "Apprentice",
        name: "6164ced9be316488997a8234",
        type: "Basic"
    },
    {
        title: "Baker",
        name: "6164ced9be316488997a8236",
        type: "Basic"
    },
    {
        title: "Barber Surgeon",
        name: "6164ced9be316488997a8238",
        type: "Basic"
    },
    {
        title: "Bard/Minstrel/Thespian",
        name: "6164ced9be316488997a823a",
        type: "Basic"
    },
    {
        title: "Beggar",
        name: "6164ced9be316488997a823c",
        type: "Basic"
    },
    {
        title: "Blacksmith",
        name: "6164ced9be316488997a823e",
        type: "Basic"
    },
    {
        title: "Boatman",
        name: "6164ced9be316488997a8240",
        type: "Basic"
    },
    {
        title: "Butcher",
        name: "6164ced9be316488997a8242",
        type: "Basic"
    },
    {
        title: "Clerk/Forger",
        name: "6164ced9be316488997a8244",
        type: "Basic"
    },
    {
        title: "Courier",
        name: "6164ced9be316488997a8246",
        type: "Basic"
    },
    {
        title: "Dancer/Juggler/Acrobat",
        name: "6164ced9be316488997a8248",
        type: "Basic"
    },
    {
        title: "Folk Healer",
        name: "6164ced9be316488997a824a",
        type: "Basic"
    },
    {
        title: "Fortune Teller",
        name: "6164ced9be316488997a824c",
        type: "Basic"
    },
    {
        title: "Gentlefolk",
        name: "6164ced9be316488997a824e",
        type: "Basic"
    },
    {
        title: "Gravedigger",
        name: "6164ced9be316488997a8250",
        type: "Basic"
    },
    {
        title: "Herbalist",
        name: "6164ced9be316488997a8252",
        type: "Basic"
    },
    {
        title: "Herder",
        name: "6164ced9be316488997a8254",
        type: "Basic"
    },
    {
        title: "Hermit",
        name: "6164ced9be316488997a8256",
        type: "Basic"
    },
    {
        title: "Hunter",
        name: "6164ced9be316488997a8258",
        type: "Basic"
    },
    {
        title: "Laborer",
        name: "6164ced9be316488997a825a",
        type: "Basic"
    },
    {
        title: "Lackey",
        name: "6164ced9be316488997a825c",
        type: "Basic"
    },
    {
        title: "Lay Cleric",
        name: "6164ced9be316488997a825e",
        type: "Basic"
    },
    {
        title: "Locksmith",
        name: "6164ced9be316488997a8260",
        type: "Basic"
    },
    {
        title: "Novice Monk",
        name: "6164ced9be316488997a8262",
        type: "Basic"
    },
    {
        title: "Peddler",
        name: "6164ced9be316488997a8264",
        type: "Basic"
    },
    {
        title: "Penitent",
        name: "6164ced9be316488997a8266",
        type: "Basic"
    },
    {
        title: "Ragpicker",
        name: "6164ced9be316488997a8268",
        type: "Basic"
    },
    {
        title: "Ratcatcher",
        name: "6164ced9be316488997a826a",
        type: "Basic"
    },
    {
        title: "Squire",
        name: "6164ced9be316488997a826c",
        type: "Basic"
    },
    {
        title: "Street Vendor",
        name: "6164ced9be316488997a826e",
        type: "Basic"
    },
    {
        title: "Tailor/Leatherworker",
        name: "6164ced9be316488997a8270",
        type: "Basic"
    },
    {
        title: "Tavern Keeper",
        name: "6164ced9be316488997a8272",
        type: "Basic"
    },
    {
        title: "Tinker",
        name: "6164ced9be316488997a8274",
        type: "Basic"
    },
    {
        title: "Town Crier",
        name: "6164ced9be316488997a8276",
        type: "Basic"
    },
    {
        title: "Town Guard",
        name: "6164ced9be316488997a8278",
        type: "Basic"
    },
    {
        title: "Woodsfolk",
        name: "6164ced9be316488997a827a",
        type: "Basic"
    },
    {
        title: "Cantor",
        name: "6164ced9be316488997a82de",
        type: "Plot"
    },
    {
        title: "Captain of the Guard",
        name: "6164ced9be316488997a82e0",
        type: "Plot"
    },
    {
        title: "Friar",
        name: "6164ced9be316488997a82e2",
        type: "Plot"
    },
    {
        title: "Inquisitor",
        name: "6164ced9be316488997a82e4",
        type: "Plot"
    },
    {
        title: "Knight of the Realm",
        name: "6164ced9be316488997a82ea",
        type: "Plot"
    },
    {
        title: "Knight Paladin",
        name: "6164ced9be316488997a82e6",
        type: "Plot"
    },
    {
        title: "Knight Penitent",
        name: "6164ced9be316488997a82e8",
        type: "Plot"
    },
    {
        title: "Knight Templar",
        name: "6164ced9be316488997a82ec",
        type: "Plot"
    },
    {
        title: "Magistrate",
        name: "6164ced9be316488997a82ee",
        type: "Plot"
    },
    {
        title: "Ordained Priest",
        name: "6164ced9be316488997a82f0",
        type: "Plot"
    },
    {
        title: "Tavern Master",
        name: "6164ced9be316488997a82f2",
        type: "Plot"
    },
    {
        title: "Witch Hunter",
        name: "6164ced9be316488997a82f4",
        type: "Plot"
    },
    {
        title: "Adventurer (Youth)",
        name: "6164ced9be316488997a827c",
        type: "Youth"
    },
    {
        title: "Apprentice (Youth)",
        name: "6164ced9be316488997a827e",
        type: "Youth"
    },
    {
        title: "Bard/Minstrel/Thespian (Youth)",
        name: "6164ced9be316488997a8280",
        type: "Youth"
    },
    {
        title: "Beggar (Youth)",
        name: "6164ced9be316488997a8282",
        type: "Youth"
    },
    {
        title: "Dancer/Juggler/Acrobat (Youth)",
        name: "6164ced9be316488997a8284",
        type: "Youth"
    },
    {
        title: "Guttersnipe (Youth)",
        name: "6164ced9be316488997a8286",
        type: "Youth"
    },
    {
        title: "Initiate (Youth)",
        name: "6164ced9be316488997a8288",
        type: "Youth"
    },
    {
        title: "Lackey (Youth)",
        name: "6164ced9be316488997a828a",
        type: "Youth"
    },
    {
        title: "Page (Youth)",
        name: "6164ced9be316488997a828c",
        type: "Youth"
    },
    {
        title: "Student (Youth)",
        name: "6164ced9be316488997a828e",
        type: "Youth"
    },
    {
        title: "Town Guard Recruit (Youth)",
        name: "6164ced9be316488997a8290",
        type: "Youth"
    },
    {
        title: "Ward (Youth)",
        name: "6164ced9be316488997a8292",
        type: "Youth"
    }
];

export const Enhancements: Trait[] = [
    {
        title: "Alchemist",
        name: "6164ced9be316488997a82f6",
        type: "Enhancement"
    },
    {
        title: "Barback",
        name: "6164ced9be316488997a82f8",
        type: "Enhancement"
    },
    {
        title: "Guild Crafter",
        name: "6164ced9be316488997a82fa",
        type: "Enhancement"
    },
    {
        title: "Master Crafter",
        name: "6164ced9be316488997a82fc",
        type: "Enhancement"
    },
    {
        title: "Master Healer",
        name: "6164ced9be316488997a82fe",
        type: "Enhancement"
    },
    {
        title: "Town Guard Auxiliary",
        name: "6164ced9be316488997a8300",
        type: "Enhancement"
    },
];
