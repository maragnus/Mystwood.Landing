export enum SpellType{
    Bolt = "Bolt",
    Gesture = "Gesture",
    Spray = "Spray",
    Voice = "Voice",
    Storm = "Storm",
    Room = "Room",
    GestureOrVoice = "Gesture/Voice",
}

export interface Spell {
    name: string,
    type: SpellType,
    category: string,
    mana: number,
    effect: string,
}

export const SpellCategories: string[] = [
    "Gift of Wisdom", "Justice", "Mercy", "Wild",
    "Beekeeper", "Executioner", "Gaoler", "Gravedigger", "Physician", "Witch Hunter",
    "Herald", "Ratcatcher", "Bardic"
]

export const Spells: Spell[] = [
    { category: "Gift of Wisdom", name: "Amicus Mort", type: SpellType.Voice, mana: 4, effect: "“By my Voice, Charm Undead”" },
    { category: "Gift of Wisdom", name: "Arrow of Death", type: SpellType.Bolt, mana: 4, effect: "“Doom by Will”" },
    { category: "Gift of Wisdom", name: "Arrows of Time", type: SpellType.Storm, mana: 4, effect: "“Root by Magic”" },
    { category: "Gift of Wisdom", name: "Aura of Chaos", type: SpellType.Voice, mana: 4, effect: "“By my Voice, 1 Damage to Enemy by Magic”" },
    { category: "Gift of Wisdom", name: "Awaken", type: SpellType.Bolt, mana: 1, effect: "“Purge Knockout”" },
    { category: "Gift of Wisdom", name: "Awaken Rage", type: SpellType.Bolt, mana: 1, effect: "“Frenzy to Animal by Magic”" },
    { category: "Gift of Wisdom", name: "Blinding Glamour", type: SpellType.Bolt, mana: 1, effect: "“Subdue by Magic”" },
    { category: "Gift of Wisdom", name: "Castigation of Cassandra", type: SpellType.Bolt, mana: 1, effect: "“3 Damage to Fae by Magic”" },
    { category: "Gift of Wisdom", name: "Disguising Glamour", type: SpellType.Voice, mana: 3, effect: "“By my Voice, Compel you to perceive me as (basic type of creature or person) by Magic”" },
    { category: "Gift of Wisdom", name: "Dispel Magic", type: SpellType.Bolt, mana: 1, effect: "“Purge Magic”" },
    { category: "Gift of Wisdom", name: "Dizzydweamor", type: SpellType.Bolt, mana: 1, effect: "“Compel you to spin around three times by Magic”" },
    { category: "Gift of Wisdom", name: "Dominion Mortis", type: SpellType.Bolt, mana: 3, effect: "“Enslave Undead by Magic”" },
    { category: "Gift of Wisdom", name: "Dreamseeker", type: SpellType.Voice, mana: 1, effect: "“Detect Unconscious”" },
    { category: "Gift of Wisdom", name: "Exponere Mortis", type: SpellType.Voice, mana: 1, effect: "“Detect Undead”" },
    { category: "Gift of Wisdom", name: "Feet of Clay", type: SpellType.Spray, mana: 1, effect: "“Slow by Magic” x3" },
    { category: "Gift of Wisdom", name: "Fool's Gold", type: SpellType.Voice, mana: 1, effect: "“By my Voice, Compel you to perceive this as (a small item) by Magic”" },
    { category: "Gift of Wisdom", name: "Gaze of the Medusa", type: SpellType.Bolt, mana: 4, effect: "“Paralyze by Magic”" },
    { category: "Gift of Wisdom", name: "Gorgon's Breath of Chaos", type: SpellType.Bolt, mana: 4, effect: "“Doom by Magic”" },
    { category: "Gift of Wisdom", name: "Hydra's Grasp", type: SpellType.Spray, mana: 4, effect: "“Bind by Magic” x4" },
    { category: "Gift of Wisdom", name: "Illusory Vermin", type: SpellType.Bolt, mana: 1, effect: "“Compel you to (itch or sneeze) uncontrollably for a 60 count by Magic”" },
    { category: "Gift of Wisdom", name: "Infernal Dominion", type: SpellType.Bolt, mana: 4, effect: "“Enslave Daemon by Magic”" },
    { category: "Gift of Wisdom", name: "Infernal Kinship", type: SpellType.Voice, mana: 4, effect: "“By my Voice, Charm Daemon”" },
    { category: "Gift of Wisdom", name: "Infernal Revelation", type: SpellType.Voice, mana: 1, effect: "“Detect Daemon”" },
    { category: "Gift of Wisdom", name: "Infernal Tongues", type: SpellType.Voice, mana: 1, effect: "“Speak to Daemon”" },
    { category: "Gift of Wisdom", name: "Mage Winds", type: SpellType.Storm, mana: 3, effect: "“Repel by Magic”" },
    { category: "Gift of Wisdom", name: "Mind Blast", type: SpellType.Spray, mana: 2, effect: "“Subdue by Magic” x4" },
    { category: "Gift of Wisdom", name: "Minotaur's Breath", type: SpellType.Spray, mana: 5, effect: "“Frenzy by Magic” x3" },
    { category: "Gift of Wisdom", name: "Mortal Puppet", type: SpellType.Bolt, mana: 1, effect: "“Animate by Magic”" },
    { category: "Gift of Wisdom", name: "Primal Fear", type: SpellType.Bolt, mana: 1, effect: "“1 Damage by Will”" },
    { category: "Gift of Wisdom", name: "Red Bolt of Chaos", type: SpellType.Bolt, mana: 0, effect: "“3 Damage by Magic”. May be used once per Renew. If you possess the Gift of Passion, you may call “by your Element” instead of “by Magic”." },
    { category: "Gift of Wisdom", name: "Red Hex", type: SpellType.Bolt, mana: 3, effect: "“Frenzy by Magic”" },
    { category: "Gift of Wisdom", name: "The Serpent's Coils", type: SpellType.Bolt, mana: 2, effect: "“Bind by Magic”" },
    { category: "Gift of Wisdom", name: "Shield of Capricorn", type: SpellType.Bolt, mana: 1, effect: "“Repel by Magic”" },
    { category: "Gift of Wisdom", name: "Smiting the Beast", type: SpellType.Bolt, mana: 1, effect: "“3 Damage to Animal by Magic”" },
    { category: "Gift of Wisdom", name: "Speech of the Dead", type: SpellType.Voice, mana: 3, effect: "“Speak to Spirit”" },
    { category: "Gift of Wisdom", name: "Sussuria Mortis", type: SpellType.Voice, mana: 1, effect: "“Speak to Undead”" },
    { category: "Gift of Wisdom", name: "Telmar's Transfixion", type: SpellType.Bolt, mana: 1, effect: "“Root by Magic”" },
    { category: "Gift of Wisdom", name: "Tendrils of the Kraken", type: SpellType.Spray, mana: 2, effect: "“Root by Magic” x3" },
    { category: "Gift of Wisdom", name: "Titan's Tread", type: SpellType.Voice, mana: 3, effect: "“By my Voice, Slow to Enemy by Magic”" },
    { category: "Gift of Wisdom", name: "The Twin Serpent", type: SpellType.Spray, mana: 3, effect: "“Bind by Magic” x2" },
    { category: "Gift of Wisdom", name: "Varo's Hand", type: SpellType.Bolt, mana: 1, effect: "“Disarm (Item) by Magic”" },
    { category: "Gift of Wisdom", name: "Voice Stealer", type: SpellType.Bolt, mana: 1, effect: "“Silence by Magic”" },
    { category: "Gift of Wisdom", name: "Webcutter", type: SpellType.Voice, mana: 4, effect: "“By my Voice, Purge Bind and Root”" },

    { category: "Divine Spells of Justice", name: "Apprehend", type: SpellType.Gesture, mana: 3, effect: "“Root by Magic by Gesture”" },
    { category: "Divine Spells of Justice", name: "Banish", type: SpellType.Bolt, mana: 1, effect: "“5 Damage to Daemon”" },
    { category: "Divine Spells of Justice", name: "Castigate", type: SpellType.Voice, mana: 2, effect: "“By my Voice, 1 Damage to Daemon”" },
    { category: "Divine Spells of Justice", name: "Defend", type: SpellType.Spray, mana: 1, effect: "“Root Daemon by Magic” x3" },
    { category: "Divine Spells of Justice", name: "Expose Daemons", type: SpellType.Voice, mana: 1, effect: "“Detect Daemon”" },
    { category: "Divine Spells of Justice", name: "Mute", type: SpellType.Gesture, mana: 3, effect: "“Silence by Magic by Gesture”" },

    { category: "Divine Spells of Mercy", name: "Aid", type: SpellType.Spray, mana: 1, effect: "“Purge Maim” x3" },
    { category: "Divine Spells of Mercy", name: "Calm", type: SpellType.Spray, mana: 1, effect: "“Purge Frenzy” x3" },
    { category: "Divine Spells of Mercy", name: "Cleansing", type: SpellType.Bolt, mana: 3, effect: "“Purge Blight”" },
    { category: "Divine Spells of Mercy", name: "Mercy", type: SpellType.Bolt, mana: 1, effect: "“Heal Enemy”" },
    { category: "Divine Spells of Mercy", name: "Purification", type: SpellType.Bolt, mana: 1, effect: "“3 Damage to Daemon” or “3 Damage to Undead”" },
    { category: "Divine Spells of Mercy", name: "Seek the Fallen", type: SpellType.Voice, mana: 0, effect: "“Detect Unconscious”. May be used once per Renew." },
    { category: "Divine Spells of Mercy", name: "Storm of Battle", type: SpellType.Storm, mana: 4, effect: "“Subdue by Magic”" },

    { category: "Divine Spells of the Wild", name: "Banish Undead", type: SpellType.Bolt, mana: 1, effect: "“5 Damage to Undead”" },
    { category: "Divine Spells of the Wild", name: "Bestial Rage", type: SpellType.Gesture, mana: 4, effect: "“Frenzy by Will by Gesture”" },
    { category: "Divine Spells of the Wild", name: "Castigate Undead", type: SpellType.Voice, mana: 2, effect: "“By my Voice, 1 Damage to Undead”" },
    { category: "Divine Spells of the Wild", name: "Entangle", type: SpellType.Storm, mana: 6, effect: "Storm for “Bind by Magic” or “Root by Magic”, chosen with each packet." },
    { category: "Divine Spells of the Wild", name: "Expose the Unliving", type: SpellType.Voice, mana: 1, effect: "“Detect Undead”" },
    { category: "Divine Spells of the Wild", name: "Freedom", type: SpellType.Voice, mana: 3, effect: "“By my Voice, Purge Root”" },
    { category: "Divine Spells of the Wild", name: "Sympathy", type: SpellType.Bolt, mana: 1, effect: "“Heal Animal”" },

    { category: "Beekeeper", name: "Distracting Stings", type: SpellType.Voice, mana: 1, effect: "“Disengage”" },
    { category: "Beekeeper", name: "Honeyed Words", type: SpellType.Bolt, mana: 2, effect: "“Charm by Magic”" },
    { category: "Beekeeper", name: "Stinging of the Bees", type: SpellType.Spray, mana: 2, effect: "“1 Damage by Earth”" },
    { category: "Beekeeper", name: "Swarmspeech", type: SpellType.Voice, mana: 1, effect: "“Speak to Vermin”" },

    { category: "Executioner", name: "Cauterizing Spark", type: SpellType.Bolt, mana: 1, effect: "“2 Damage by Fire”" },
    { category: "Executioner", name: "Cripple Limb", type: SpellType.Bolt, mana: 1, effect: "“Maim (Limb) by Magic”" },
    { category: "Executioner", name: "Find Fugitive", type: SpellType.Voice, mana: 1, effect: "“Detect Living”" },
    { category: "Executioner", name: "Soothing End", type: SpellType.Bolt, mana: 1, effect: "“Slow and Subdue by Will”" },
    { category: "Executioner", name: "Torment", type: SpellType.Bolt, mana: 1, effect: "Up to three bolts of “Subdue by Will” or “Torment by Will” used within 5 minutes" },

    { category: "Gaoler", name: "Halt Miscreant", type: SpellType.Bolt, mana: 1, effect: "“Root by Magic”" },
    { category: "Gaoler", name: "Shackle", type: SpellType.Bolt, mana: 1, effect: "“Bind by Magic”" },
    { category: "Gaoler", name: "Silence Cell", type: SpellType.Room, mana: 3, effect: "“Silence to Room by Magic”" },
    { category: "Gaoler", name: "Torment", type: SpellType.Bolt, mana: 1, effect: "Up to three bolts of “Subdue by Will” or “Torment by Will” used within 5 minutes" },

    { category: "Gravedigger", name: "Decay", type: SpellType.Bolt, mana: 3, effect: "“Doom to Undead by Magic”" },
    { category: "Gravedigger", name: "Hex against Accidents", type: SpellType.Bolt, mana: 2, effect: "“Bestow one Resist Crushing”" },
    { category: "Gravedigger", name: "Quiet the Dead", type: SpellType.Bolt, mana: 2, effect: "“Paralyze Undead by Magic”" },
    { category: "Gravedigger", name: "Transfix the Dead", type: SpellType.Spray, mana: 1, effect: "“Root Undead by Magic” x3" },

    { category: "Physician", name: "Cauterizing Spark", type: SpellType.Bolt, mana: 1, effect: "“2 Damage by Fire”" },
    { category: "Physician", name: "Cripple Limb", type: SpellType.Bolt, mana: 1, effect: "“Maim (Limb) by Magic”" },
    { category: "Physician", name: "Fleabath", type: SpellType.Bolt, mana: 2, effect: "“Purge Swamp Fleas Affliction and 1 Damage by Water”. Note that this can be used on a character or on a piece of furniture with a Swamp Fleas tag affixed to it, but not on a source of Swamp Fleas, such as a matrix or waystone." },
    { category: "Physician", name: "Peaceful Sleep", type: SpellType.Gesture, mana: 1, effect: "“Knockout by Will”. This may only be used on a willing or helpless character." },

    { category: "Witch Hunter", name: "Find Fugitive", type: SpellType.Voice, mana: 1, effect: "“Detect Living”" },
    { category: "Witch Hunter", name: "Holdfast", type: SpellType.Voice, mana: 2, effect: "“By my Voice, Subdue by Will”" },
    { category: "Witch Hunter", name: "Torment", type: SpellType.Bolt, mana: 1, effect: "Up to three bolts of “Subdue by Will” or “Torment by Will” used within 5 minutes" },
    { category: "Witch Hunter", name: "Transfix the Unnatural", type: SpellType.Spray, mana: 1, effect: "“Root Daemon by Magic” x3" },
    { category: "Witch Hunter", name: "Walk Unhindered", type: SpellType.Spray, mana: 1, effect: "“Purge Root” x3" },

    { category: "Herald", name: "Diplomatic Immunity", type: SpellType.Voice, mana: 3, effect: "“By my Voice, Repel by Magic”" },
    { category: "Herald", name: "Holdfast", type: SpellType.Voice, mana: 2, effect: "“By my Voice, Subdue by Will”" },
    { category: "Herald", name: "Honeyed Words", type: SpellType.Bolt, mana: 2, effect: "“Charm by Magic”" },
    { category: "Herald", name: "Silence in the Ranks", type: SpellType.Voice, mana: 2, effect: "“By my Voice, Silence for one Minute by" },

    { category: "Ratcatcher", name: "Blast Vermin", type: SpellType.Bolt, mana: 1, effect: "“Five Damage to Vermin”" },
    { category: "Ratcatcher", name: "Escape Bonds", type: SpellType.Bolt, mana: 1, effect: "“Purge Bind”" },
    { category: "Ratcatcher", name: "Expose Vermin", type: SpellType.Voice, mana: 1, effect: "“Detect Vermin”" },
    { category: "Ratcatcher", name: "Hex against Accidents", type: SpellType.Bolt, mana: 2, effect: "“Bestow one Resist Crushing”" },
    { category: "Ratcatcher", name: "Smite Vermin", type: SpellType.Voice, mana: 2, effect: "“By my Voice, 1 Damage to Vermin”" },
    { category: "Ratcatcher", name: "Walk Unhindered", type: SpellType.Spray, mana: 1, effect: "“Purge Root” x3" },

    { category: "Bardic", name: "Blather", type: SpellType.Gesture, mana: 1, effect: "Utter a string of nonsense words at a target. If they respond to you, even by saying “What?”, you may call “Subdue by Will by Gesture”. If they do not respond or notice, you do not spend the Mana." },
    { category: "Bardic", name: "Fury", type: SpellType.Gesture, mana: 2, effect: "Work another character up into a bloody rage with your words, then call “Bestow One Special Attack and Frenzy at Foe.” 2 Bardic Voice CP: Work a group of up to six characters up into a bloody rage with your words, then call “Bestow One Special Attack and Frenzy at Foe.”" },
    { category: "Bardic", name: "Rally", type: SpellType.Gesture, mana: 1, effect: "You may sing for at least a 60 count (1 minutes) to call “Heal 1”. 1 Bardic Voice CP: You may sing for at least a 60 count (1 minutes) to call “Heal 5”, which must be used on a conscious character." },
    { category: "Bardic", name: "Song of Courage", type: SpellType.GestureOrVoice, mana: 1, effect: "You may sing for at least a 60 count (1 minutes) to call “Bestow Resist Will” on a target. 1 Bardic Voice CP: You may sing for at least a 60 count (1 minutes) to call “By my Voice, Purge Will”." },

];

const spellLookup: Map<string, Spell> =
    Spells.reduce((dict, v) => {
                dict.set(v.name, v);
                return dict;
            }, new Map<string, Spell>()
        )
;

export const SpellByName = (name: string) => {
    return spellLookup.get(name) ?? Spells[0];
};