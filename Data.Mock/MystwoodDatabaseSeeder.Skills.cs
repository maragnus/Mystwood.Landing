namespace Mystwood.Landing.Data.Mock
{
    public partial class MystwoodDatabaseSeeder
    {
        private static void LoadOrdinationSkills(TraitsBuilder traits) => traits
            .WithOrdinarySkill("Absolution", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You may offer Absolution to those of your faith, if you deem they have performed a true penance. See the rules in Religion.")
            .WithOrdinarySkill("Agility", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You have unusual flexibility, and are full of surprising maneuvers and flourishes. You may only use this skill when unarmored. You may call “Disengage” once per Renew. In addition, a number of times per Renew, you may “Resist” a Damage call from any single arrow, crossbow bolt, spell packet, or thrown weapon (basically anything that moves through the air)")
            .WithOrdinarySkill("Apothecary X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Apothecary Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones or the Talent Advantage, this provides (or adds) 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 91 for a more detailed description of Apothecary")
            .WithOrdinarySkill("Apprenticeship", SkillClass.Unavailable,
                description:
                "You are skilled at assisting others and at learning trades. Once per Day, you may help another with a Craft Skill. While doing so, you may call “Bestow 2 Craft Points”. Once per Event, you may ask a person with a Craft Skill to set you a challenge or task related to their Occupation or a Craft Skill")
            .WithOrdinarySkill("Armor Repair", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"You must possess the Metalworking Craft Skill or the Tinkering Ordinary Skill to use this skill. You may spend a unit of Metal and a 30 count of role play refitting and repairing an armor piece on a conscious character to call ""Heal 3"".")
            .WithOrdinarySkill("Armored In Faith", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "If you currently possess at least 1 Karma, you gain 1 Armor Point. This does not stack with any other armor.")
            .WithOrdinarySkill("Armstraining X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Armstraining Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 92 for a more detailed description of Armstraining")
            .WithOrdinarySkill("Artistry", SkillClass.Unavailable,
                description:
                "True artists can imbue their crafts with almost supernatural beauty. A character with Artistry may spend Craft Points from any Craft Skill they possess to embellish their created items with exceptional traits, as follows: * 1 CP may be spent to imbue an item with an Air, Earth, Fire, or Water Component. * 1 CP may be spent to attach a tag which reads: ‘Forsooth, upon your first time reading this tag and looking at this item, ‘Compel to stand in awe for a thirty count by Will’ as you are overcome by emotion.’ * 2 CP may be spent to add a Life or Death component")
            .WithOrdinarySkill("Bardic Magic", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Requirement: Bardic Voice AND Gift of Wisdom You have learned the musical magic of the ancient Bards, and may cast the spells listed on pg 127 under Bardic Magic.")
            .WithOrdinarySkill("Bardic Voice X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Bardic Voice Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 93 for a more detailed description of Bardic Voice")
            .WithOrdinarySkill("Basic Weaponry", SkillClass.Free,
                description:
                "You can make use of the following Weapon Types: Dagger, One Handed Axe, One Handed Blunt, One Handed Sword, One Handed Tool, Two Handed Tool, and Normal Crossbow. You may not throw Daggers without the Gift of Dexterity.")
            .WithOrdinarySkill("Battle Rage", SkillClass.Unavailable,
                description:
                "Once per Day, you may spend a 60 count whipping yourself into a state where you are beyond pain and fear. Battle Rage lasts up to 10 minutes. During this time you may call “Resist” against any one Effect. In addition, you add 3 Hit Points to your maximum")
            .WithOrdinarySkill("Battlemage", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Requirement: Warcaster To purchase this skill, you must first have the Warcaster skill. You may cast spells while wearing any amount of physical armor, up to your normal Wear Armor maximum. 83")
            .WithOrdinarySkill("Begging", SkillClass.Unavailable,
                description:
                "Many are the unwashed beggars who plague the towns and villages of Europa. Some few are beggars blessed and able to thank their benefactors in mysterious and supernatural ways. A character who has Begging may, when given a donation, allow their benefactor to draw from a marble bag containing 3 white, 1 red, and 2 black marbles. * The draw of a black marble has no additional effect")
            .WithOrdinarySkill("Beloved of the Forest", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"You must possess the Forest Ally and Treewalk advantages and the Wild Heart disadvantage to use this skill. Once per Day, you may kneel or lay down upon the ground or against a tree for a 60 count to call ""Heal to Self”.")
            .WithOrdinarySkill("Bestow Favor", SkillClass.Unavailable,
                description:
                "Twice per Day, you may give someone a token, such as a scarf or glove, before a battle or adventure. You may then call “Bestow one Resist any Effect”.")
            .WithOrdinarySkill("Blessed", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You may use one Karma per Event, though you do not receive a tag for it and cannot save it for the future. See the Religion section.")
            .WithOrdinarySkill("Brawler", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"You must possess the Unarmed Combat skill to use this skill. You gain the ability to use two 30"" Fists. These represent your fists or kicks. See page 41 for more information")
            .WithOrdinarySkill("Butcher", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You receive 6 Salvage Tags per Event. Each time you role play butchering an Animal (Must be unintelligent, not using weapons, speaking, etc.), you can activate one tag, as either one unit of Food or one unit of Cloth (hide). Only one person can butcher any given animal")
            .WithOrdinarySkill("Buy/Sell X", SkillClass.Minor, 5, SkillRank.Multiple,
                description:
                "Even in peaceful times, only the hardiest of peddlers and merchants will brave the treacherous roads far from the larger towns. Even those who do will not be successful without a good knowledge of when and where goods are likely to be available, what reasonable prices are, and where buyers can be found with actual coin to spend. The Buy/Sell skill represents this knowledge. You may use this skill once per Event, at a time of your choosing")
            .WithOrdinarySkill("Carry Wounded", SkillClass.Free,
                description:
                "You are able to carry an Unconscious character. Hold your arm out and call “Carry”. You may then move with the target at a slow walk. If you, or the target, are struck by any Effect, you must drop the target")
            .WithOrdinarySkill("Commerce", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You know how much things are worth, and can read Flags marked “Commerce” which may reveal the value of various items, and perhaps a little about their history or origin.")
            .WithOrdinarySkill("Cooking X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Cooking Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 94 for a more detailed description of Cooking")
            .WithOrdinarySkill("Copyist", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Once per Event, a character with this skill may spend 5-10 minutes role playing copying a spell text, a cure, or another ingame text which possesses a Copyist note. Make a note of this in your PEL, and you will receive an exact copy of the text at the next Event you Preregister for.")
            .WithOrdinarySkill("Cosmopolitan Connections", SkillClass.Standard, 10,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. At your Home Chapter during check in, you may randomly roll on the following chart of goods, which represents a trip to a nearby major city between Events. There, you either lucked into some wealth, or tried your hand at thievery. 2 Savagely beaten by street hooligans! -1 Maximum Hit Points for the next Day")
            .WithOrdinarySkill("Cure Affliction", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You have sufficient basic medical knowledge to attempt to cure afflictions- various curses, diseases, infections, taints, etc. The known cures can be found within the Library. You should role play the cure, expend any ingredients required, and then state the name of the cure. As the person afflicted cannot tell you the name of their affliction, there is a bit of guesswork involved here")
            .WithOrdinarySkill("Detect Health", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "Once per Renew, by sizing an opponent up for a few moments, you may call the “Detect Health” Effect. 84")
            .WithOrdinarySkill("Divine Lore", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You know much of the lore of the gods, and of your own in particular. You may read Flags marked Divine Lore. If they are marked with the name of a god, however, you may read them only if it is the god you have chosen to worship.")
            .WithOrdinarySkill("Divine Spells", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Each faith has a body of lore that allows them to cast spells. You may not use these skills without possessing the Gift of Wisdom. Divine Spells may be found on page 125.")
            .WithOrdinarySkill("Drinks on the House", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. Once per Event, you may offer free drinks to up to 6 people. They will gain the “Renew” Effect as normal.")
            .WithOrdinarySkill("Duelist", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Once per Day, when you enter into a formal, single combat against a worthy foe (no use challenging rats), you “Renew” your abilities. However, you must have formally accepted your challenge, you must fight fairly, and you must fight to the death.")
            .WithOrdinarySkill("Duty X", SkillClass.Standard, 10,
                description:
                "This Ordinary Skill may normally only be used at your Home Chapter, but see below. Some professions are humbler than others, and have tasks to perform that although necessary, may not be glamorous. However, when you fulfill a “shift” (15 to 30 minutes) of your Duty, you “Renew” your abilities. This skill is useable a limited number of times per Day, as noted in the Occupation")
            .WithOrdinarySkill("Engineering", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You understand the construction of buildings and structures. You may read Engineering flags, which might reveal hidden compartments, unstable walls, secret doors, and so on.")
            .WithOrdinarySkill("Entertainer", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Jugglers, dancers, minstrels, thespians, even puppeteers, these are the superstars of the Known world. Their performances are often the high points of folk’s existence, especially in times of trouble. Once per Event, you may give a performance lasting at least 10 minutes. At the beginning, you select a group of no more than 20, and state “Forsooth, I grant you the trait Audience for the duration of this performance")
            .WithOrdinarySkill("Evade Trap", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "Once per Day, you may call “Resist” against a trap, as you role play jumping out of the way. You may not wear physical armor while using this ability, but may use natural armor or Livery. This stacks with the 8th Level ability from the Gift of Dexterity.")
            .WithOrdinarySkill("Execution", SkillClass.Major, 15, SkillRank.Once,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. You gain the ability to make one “Death” strike against any person you meet who has been legally sentenced to death and is unarmed. You may also spend 1 Fire Component to call “Afflict with Branding” after suitable role play with a branding iron. This must also be used against someone legally convicted of a crime")
            .WithOrdinarySkill("Fence", SkillClass.Unavailable,
                description:
                "You gain 2 Craft Points per Day, which may be used for the Bardic Voice, Poisoner, or Scribe Craft Skills with the following limitations: * You may only perform or make items which cost 0 or 1 CP. * Fence is not a “Craft Skill” and you cannot gain more Craft Points for it using other abilities which improve “Craft Skills” most notably Craft Kits.")
            .WithOrdinarySkill("Flee", SkillClass.Unavailable,
                description:
                "Once per Renew, as long as you are running or moving quickly away from your enemies, you can call “Resist” against any melee attack. You cannot use any other skills or abilities and must run toward safety, not away. You can’t dodge spells or missiles with Flee resists, and Flee can’t be used while wearing more than 2 points of physical armor.")
            .WithOrdinarySkill("Fortune Telling", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You may tell another's fortune using cards, runes, etc. They must first cross your palm with silver, of course. Three times per Day, this may have potentially renew your target. This takes about 5-10 minutes, at the end of which you may call “Renew”")
            .WithOrdinarySkill("Fully Armored", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "Once per Event, you may put on and wear any amount of armor. This skill’s effect lasts until you remove the armor, or 1 hour has passed, whichever comes first.")
            .WithOrdinarySkill("Grant Karma", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You may, after private conference, award Karma to those of your faith. The rules for doing so are in the Religion section.")
            .WithOrdinarySkill("Guild Wages", SkillClass.Unavailable,
                description:
                "Your skill in crafts demands a higher rate of pay. When utilizing the “General Income” crafting ability, you may obtain 2 crown for 1 CP, rather than merely 1 crown.")
            .WithOrdinarySkill("Hagsblood", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"You must possess both the Evil Eye and Witchblood advantages to use this skill. Once per Day, you may call ""Charm by Gesture"" after locking eyes with another character for at least a 10 count.")
            .WithOrdinarySkill("Improved Battle Endurance", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Gift of Courage. You may add 1 to the number of times you may use Battle Endurance per Renew. 85")
            .WithOrdinarySkill("Improved Battle Rage", SkillClass.Major, 15, SkillRank.Once,
                description:
                @"You must possess the Battle Rage skill to use this skill. When in a rage, you are even more of a terror. You may ""Resist"" any two Effects, instead of one, and gain the ability to call “Heal Three to Self” once prior to the end of your rage.")
            .WithOrdinarySkill("Improved Burst Casting", SkillClass.Major, 15, SkillRank.Once,
                description: "Requirement: Gift of Passion You may increase your Bursts per Renew by 1.")
            .WithOrdinarySkill("Improved Bestow Favor", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"You must possess the Bestow Favor skill to use this skill. When you provide a token, it provides both ""Bestow one Resist any Effect”, and “Bestow one Heal 3 to Self”.")
            .WithOrdinarySkill("Improved Butcher", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Butcher skill to use this skill. You gain 3 more Butcher Tags per Event.")
            .WithOrdinarySkill("Improved Duelist", SkillClass.Major, 15, SkillRank.Once,
                description:
                @"You must possess the Duelist skill to use this skill. When entering into a formal duel, not only do you ""Renew"" your abilities, you gain a single additional Special Attack to use during the duel.")
            .WithOrdinarySkill("Improved Instruction", SkillClass.Major, 15, SkillRank.Multiple,
                description:
                "You must possess the Instruction skill in order to use this skill. You gain 3 more Skill Tokens to teach to others per Event.")
            .WithOrdinarySkill("Improved Leadership", SkillClass.Minor, 5, SkillRank.Once,
                description: "You may use Leadership 4 times per Renew instead of 2.")
            .WithOrdinarySkill("Improved Resistance", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Elemental Resistance Advantage to purchase this Skill. You add a second element which you may Resist, and gain a second use per Renew.")
            .WithOrdinarySkill("Improved Scavenging", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Scavenging skill to use this skill. You gain 3 additional Salvage tags per Event.")
            .WithOrdinarySkill("Improved Storm Casting", SkillClass.Major, 15, SkillRank.Once,
                description: "Requirement: Improved Burst Casting You may increase your Storms per Renew by 1.")
            .WithOrdinarySkill("Income X", SkillClass.Minor, 5, SkillRank.Multiple,
                description:
                "You receive the indicated number of crown per Event. If purchased with Moonstones, each purchase grants an income of 5 (or +5) crown per Event. Purchased Income does not Travel, but Income from an Occupation does.")
            .WithOrdinarySkill("Increased Mana", SkillClass.Standard, 10, SkillRank.Multiple,
                description:
                "You must possess the Gift of Wisdom to purchase this skill, and may purchase it up to three times. Each purchase adds one to your Maximum Mana.")
            .WithOrdinarySkill("Information Gathering", SkillClass.Standard, 10,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. This skill represents your character’s ability to track down people who might know something about a particular subject you are looking for information about. This is a “plot skill”- it does nothing during Events, but if you submit a Post Event Letter within two weeks of the Event, you may indicate the type of information you are looking for. If someone is available in the nearby area who possesses this information, they will arrange to meet you in game")
            .WithOrdinarySkill("Instruction", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "Everyone has certain skills they possess, but few are capable of teaching those skills to another. A character with Instruction, however, is a skilled teacher. At check in, you receive three Skill Tokens- limited Moonstones that function only for the purposes of a specific skill. You may use these Skill Tokens to instruct others in the skills you possess, with the following rules")
            .WithOrdinarySkill("Iron Will", SkillClass.Standard, 10, SkillRank.Once,
                description: @"Once per Renew, you may call ""Resist"" to an Effect which was delivered ""by Will”.")
            .WithOrdinarySkill("Joy of Life", SkillClass.Major, 15, SkillRank.Once,
                description:
                @"You must possess the Gift of Empathy. Once per Day, you may spend a single use of Healing Hands to call ""By my Voice, Heal One to Unstable”. If “With Malice towards None” is active, you may instead call “By my Voice, Heal One.”")
            .WithOrdinarySkill("Knockout", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You add “Knockout” to the list of your Special Attacks for 1H Blunt, 2H Blunt, or Tool Weapon Types. This must be delivered from behind and must strike the back. See the Gift of Dexterity. 86")
            .WithOrdinarySkill("Leadership", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You gain the ability to call “Heal 2 to ___ by Gesture”, 2 times per Renew. Note that the Occupation description specifies who this applies to- others cannot voluntarily place themselves in your service to take advantage of this skill. You can do this by offering a few words of encouragement, threatening consequences, and so on, but you cannot use it while suffering from the “Silence” Effect, or when the person you wish to heal is Unconscious. If purchased with Moonstone, you must choose how these followers are linked to you: those whom you employ, those who follow your Faith, or any other connection which is approved by the Staff")
            .WithOrdinarySkill("Literacy", SkillClass.Free, description: "You are able to read and write.")
            .WithOrdinarySkill("Livery", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "While wearing a certain manner of dress, or the colors and heraldry of your sponsor, you gain 1 extra Hit Point. If you purchase Livery with Moonstones, it must strongly represent your Occupation, and be approved by the Staff.")
            .WithOrdinarySkill("Loremaster", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. Once per year, a character with this skill may utilize Research to create new items of in game lore, such as alchemy recipes or spells. You must write a proposal for the effect of the spell or other lore item and submit it to your Chapter’s Staff. If approved, you will receive an in game write up of the item, which will be added to the game's Library as an item which can be researched")
            .WithOrdinarySkill("Mage Lore", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You are aware of spirit essences, invisible runes, ghostly presences, magical taints, etc. You may read Mage Lore Flags at will.")
            .WithOrdinarySkill("Master Entertainer", SkillClass.Unavailable,
                description: "You may use the Entertainer skill Once per Day, instead of Once per Event.")
            .WithOrdinarySkill("Masterwork", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. A master crafter involved in the Guild may further their field and expand their craft. Once per year, if you are signatory to a Craft Kit, you may design an item with abilities and costs, draw up plans, and submit it to your Chapter’s Staff. If approved, you will receive an in game patent for the item, which will be added to the game's Library as an item which can be produced")
            .WithOrdinarySkill("Medicine", SkillClass.Unavailable,
                description:
                "You gain additional Immediate items which you may use Apothecary CP on. These items are listed on the Apothecary list at the end of the table on page 91.")
            .WithOrdinarySkill("Metalworking X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Metalworking Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 95 for a more detailed description of Metalworking")
            .WithOrdinarySkill("News & Rumors", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. You receive a general write up of what is going on in the area at the start of each Event, with a few extra rumors thrown in that may or may not be true.")
            .WithOrdinarySkill("Occupational Spells", SkillClass.Unavailable,
                description:
                "Some Occupations have spells which aid them in their work, a mix of hedge magic and true Sorcery. You may only use these spells if you have the Gift of Wisdom. See page 125 for more information on Occupational Spells.")
            .WithOrdinarySkill("Pathfinding", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. You can find your way to distant locations in the nearby area, navigating the many treacherous paths of the hinterlands. This is a “plot skill”- it does nothing during Events, but if you submit a Post Event Letter within two weeks of the Event, you may indicate 3 locations, in order of preference, that you would like to find your way to. Examples could be “The ruins we visited where we found the six eyed hag”, “The goblin encampment I’ve heard rumors about”, “Any stone monolith”")
            .WithOrdinarySkill("Patronage X", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. Once per year, you may sponsor X people into Advanced Occupations which require Patronage, such as Philosopher or Physician. This represents you using your influence and wealth to enable them to pursue their studies, rather than having to work for their survival.")
            .WithOrdinarySkill("Poisoner X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Poisoner Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 96 for a more detailed description of Poisoner")
            .WithOrdinarySkill("Precision", SkillClass.Standard, 10, SkillRank.Once,
                description:
                @"To use this skill you must possess the Gift of Prowess. You may add ""5 Damage"" to the list of Special Attacks you are capable of performing with any melee weapon. 87")
            .WithOrdinarySkill("Production X (Type)", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. You are able to gather, harvest or otherwise obtain Components or Materials of the indicated type between Events (for example “5 Metal”). Your production will be provided to you at check in. You may need to advise the Staff at that time")
            .WithOrdinarySkill("Quick Learner", SkillClass.Unavailable,
                description:
                "Once per Day, you may spend 10 to 15 minutes role playing learning a skill from another to gain one Skill Token in that skill. They must possess the skill they are teaching, of course. This is in addition to any Skill Tokens you might have gained from the character if they possess Instruction.")
            .WithOrdinarySkill("Religious Ceremony", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Once per Day, you may organize a religious ceremony. After this ceremony, lasting 10 to 15 minutes, you may choose one of the following Effects. The call is “By my Voice, ___ to Follower of <god>.” * Heal and Renew * Bestow one Special Attack * Bestow one Resist Magic Those pledged to other gods may attend the ceremony, but must be respectful and somewhat apart from the faithful")
            .WithOrdinarySkill("Research", SkillClass.Unavailable,
                description:
                @"This Ordinary Skill may only be used at your Home Chapter. The plot skill Research is used between Events, primarily to gain helpful information and clues about Chronicles. Books and items which can be researched will normally be marked with a tag stating ""Research"", the topic that the item may be be used to research on, and an NPC that the research must be directed to. Some categories of items, such as Relics, may be researched without a specific tag on them- the rules for doing so can be found elsewhere in this Rulebook, or in the addendum rules for that particular topic")
            .WithOrdinarySkill("Retainers X", SkillClass.Minor, 5, SkillRank.Multiple,
                description:
                "A number (X) of loyal servants and retainers may wear your colors or symbol, gaining the “Livery” skill. If they already had the skill from their occupation this does not add any benefit. If purchased with Moonstones, each purchase provides 1 retainer.")
            .WithOrdinarySkill("Room for More", SkillClass.Unavailable,
                description:
                @"After a thirty count of calling for gaming, drinking, etc., you may spend 1 Bardic Voice CP to call ""To Room, Compel Carouser to (play a game/drink/party)"". This skill may not be used if there is combat occurring within line of sight.")
            .WithOrdinarySkill("Scavenging", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You are not afraid to loot the dead for items others would not wish to touch. Each Event, you will receive 3 Salvage tags at check in. You may activate one tag as Cloth, Food, or Metal Material when you loot a body. The creatures must be appropriate to the type of Material- you cannot loot Food from an Undead, but could loot Metal from a construct")
            .WithOrdinarySkill("Scribe X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Scribe Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 97 for a more detailed description of Scribe")
            .WithOrdinarySkill("Sell Drinks", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. You may sell licensed ‘booze’ (usually actually soda, iced tea, etc.) of various sorts at the Tavern. These drinks have various effects, which you pronounce on the person buying them (usually “Renew”, but others are possible)")
            .WithOrdinarySkill("Serene Contemplation", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You must possess the Gift of Wisdom to use this skill. You may reduce the Mana cost of some spells, as long as you have not physically attacked someone with a weapon during the current Day. Damage from spells and summoning is allowed. Any spell which costs more than 2 Mana costs 1 less")
            .WithOrdinarySkill("Set Trap", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You can arm and re-arm traps, or move them and set them in new locations. Only traps with a tag can be moved with this skill.")
            .WithOrdinarySkill("Sewing X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Sewing Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 98 for a more detailed description of Sewing")
            .WithOrdinarySkill("Shifter Senses", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Skin Changer Advantage to purchase this skill. Once per Renew, you may call each of the following Effects once: “Detect Animal”, “Detect Vermin”, and “Speak to Animal”.")
            .WithOrdinarySkill("Slayer (Type)", SkillClass.Unavailable,
                description:
                "You gain the ability to call one “Special Attack” against each creature of the indicated type you encounter. When you have a creature in sight, but are not sure if it is actually of the proper sort, you may call “Detect (Type)”. You may not shout this, and can use this ability only to confirm that the monster is of the kind you slay, not to find hidden creatures. This skill may be used even without possessing a Gift which provides Special Attacks")
            .WithOrdinarySkill("Standard Bearer", SkillClass.Major, 15, SkillRank.Once,
                description:
                "Requirements: Livery of a particular group such as a Knight’s retinue, the Town Guard, etc. as approved by Staff) While carrying the heraldic colors of your organization, you gain the choice of a few abilities pertinent to assisting your fellows. Any one of these abilities may be used per Renew. * “Heal One to <Group>”")
            .WithOrdinarySkill("Stench of the Enemy", SkillClass.Minor, 5, SkillRank.Once,
                description:
                @"You must possess the Eternal Foe disadvantage to use this skill. Once per Day, you may call ""Detect Daemon"", “Detect Fae”, or ""Detect Undead"", depending on your Eternal Foe.")
            .WithOrdinarySkill("Sunder", SkillClass.Major, 10, SkillRank.Once,
                description: "Once per Event, you may call “Shatter” with a two handed attack.")
            .WithOrdinarySkill("Swarm Magic", SkillClass.Unavailable,
                description:
                @"Through long practice communing with the hive, you are able to remove and suspend some of your bees in ensorcelled pouches, called ""Beekeeper's Bags"". To create one requires 1 Cloth Material, and 1 Air, 1 Earth, and 1 Life Components. Once created, the item holds 10 ""1 Damage"" packets, representing the stings of your beloved bees.")
            .WithOrdinarySkill("Tarot Mortis Punchinello", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You must possess the Gift of Dexterity. You may add a card representing Harlequin’s rival Punchinello to your deck. It is represented by a Clubs card (if the dedicated Punchinello card is not available), and if drawn, results in “Maim all Limbs”.")
            .WithOrdinarySkill("Taunt", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "This skill requires Bardic Voice to use. Once per Day, you may engage a foe in an insult match. After they have gotten worked up, you may call “Frenzy at me by Will”, sending them into a rage and forcing them to attack you. You may only use this on someone who has shouted insults BACK at you, and whom you feel you have gotten the better of")
            .WithOrdinarySkill("Tavern Share", SkillClass.Unavailable,
                description:
                "This Ordinary Skill may only be used at your Home Chapter. At the end of an Event, you gain 5% (1 in 20 crown) of the crown accumulated from the sale of drinks and other items at the tavern, or 5 crown, whichever is higher. If you are not present for cleanup during an Event, you gain the 5 crown regardless at next check in.")
            .WithOrdinarySkill("Tinkering", SkillClass.Unavailable,
                description:
                @"You gain 2 Craft Points per Day, which may be used to make items from the Apothecary, Metalworking, Sewing, and Woodworking Craft Skills, with the following limitations: * You may only make items which cost 0 or 1 CP. * Tinkering is not a ""Craft Skill"", and you cannot gain more Craft Points for it using other abilities which improve ""Craft Skills"", most notably Craft Kits.")
            .WithOrdinarySkill("Toughness", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You add 1 to your maximum Hit Points. This is cumulative with additional Hit Points from either the Gift of Courage or Prowess.")
            .WithOrdinarySkill("Unarmed Combat", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "Twice per Renew, you may throw a packet at an opponent within melee reach and call “Subdue”.")
            .WithOrdinarySkill("Use Two Weapons", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You may use a weapon of up to 42” in length in each hand. Note that the Gift of Dexterity also provides this skill.")
            .WithOrdinarySkill("Wages of Sin", SkillClass.Minor, 5, SkillRank.Multiple,
                description: "You must possess at least one Chaos Mark. At check in, you will receive 1 Warpstone.")
            .WithOrdinarySkill("Warcaster", SkillClass.Standard, 10, SkillRank.Once,
                description:
                "You may wear 1 Armor Point while casting spells. You must possess Wear Armor 1 or better to benefit from this skill.")
            .WithOrdinarySkill("Weapon Specialization (Type)", SkillClass.Standard, 10, SkillRank.Multiple,
                description:
                "You gain one additional Special Attack per Renew with the indicated weapon type. You must have a Gift which provides Special Attacks to make use of this. You may purchase this with Moonstones multiple times, each time obtaining Specialization with a single weapon type from the table on page 40.")
            .WithOrdinarySkill("Weapon Use (Type)", SkillClass.Standard, 10, SkillRank.Multiple,
                description:
                "You are able to use weapons of the indicated type, even if you do not have the Gifts normally required to do so, or it is a restricted weapon type. Each purchase provides a new type of weapon from the list below: Bow Large Shield Flail Polearm Hand Crossbow Single Throwing Weapon Javelin Staff Other Weapon Types must be learned from Gifts or Occupations. Remember, many Weapon Types (all except Claw, Fist, Flail, and Large Shield) can be obtained from the Gifts of Courage, Dexterity, or Prowess. See Basic Weaponry for the list of Weapon Types all characters may use")
            .WithOrdinarySkill("Wear Armor X", SkillClass.Minor, 5, SkillRank.Multiple,
                description:
                "Allows you to wear X Armor Points, which add to your Hit Points. In order to gain these points, you must actually be wearing enough realistic looking armor to warrant it- see the Armor section on page 37. Purchasing this skill with Moonstones provides the ability to wear 1 Armor Point for each purchase, which stacks with your Occupation. A character with an Occupation which cannot wear armor would thus get Wear Armor 1, while a Town Guard would have a total of Wear Armor 4")
            .WithOrdinarySkill("Woodwise", SkillClass.Minor, 5, SkillRank.Once,
                description:
                "You may read Flags marked Woodwise, which represents your ability to commune with nature, and see things others may miss.")
            .WithOrdinarySkill("Woodworking X", SkillClass.Major, 15, SkillRank.Once,
                description:
                "You possess the Woodworking Craft Skill, and have a certain number of Craft Points per Day. If purchased with Moonstones, this provides 2 Craft Points. Only one Craft Skill may be purchased with Moonstones. See page 99 for a more detailed description of Woodworking")
            .WithOrdinarySkill("Work Rhythm", SkillClass.Unavailable,
                description:
                @"You are used to long days of labor with oar, shovel, hammer, or pick, and have thus developed your own rhythms for working. This affords you a benefit in combat. When armed with a weapon of the following types, every third strike which successfully hits a weapon, shield, or your opponent may be called as ""2 Crushing"". If any of your strikes miss, you must start the three strikes over")
            .Done();
    }
}
