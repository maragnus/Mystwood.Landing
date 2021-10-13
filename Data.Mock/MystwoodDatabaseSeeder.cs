using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Mystwood.Landing.Data.Mock
{
    public abstract class BaseBuilder
    {
        public virtual void Done() { }
    }

    public class TraitsBuilder : BaseBuilder
    {
        private readonly List<Trait> _traits = new();

        public TraitsBuilder WithOccupation(OccupationType type, string name, string[] skills,
            string? requirements = null, string? description = null) =>
            WithTrait(new OccupationTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(),
                Name = name,
                Skills = skills,
                Requirement = requirements,
                Description = description,
                OccupationType = type,
            });

        public TraitsBuilder WithOccupation(OccupationType type, string name, string skills,
            string? requirements = null, string? description = null) =>
            WithOccupation(type, name, StringToArray(skills), requirements, description);

        private static string[] StringToArray(string skills) =>
            skills.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();

        public TraitsBuilder WithTrait(Trait trait)
        {
            var traitName = trait.Name ??
                            throw new InvalidOperationException($"{nameof(Trait)}.{nameof(Trait.Name)} is required");
            var parts = Regex.Match(traitName, @"^(?<name>.*) (?<rank>[\dIVX]+)$", RegexOptions.Compiled);
            var groupName = parts.Success ? parts.Groups["name"].Value.Trim() : trait.Name;
            var groupRank = 0;
            if (parts.Success)
            {
                if (int.TryParse(parts.Groups["rank"].Value, out var rank))
                    groupRank = rank;
                else if (RomanNumerals.RomanNumeral.TryParse(parts.Groups["rank"].Value, out rank))
                    groupRank = rank;
            }

            if (traitName.EndsWith(" X"))
                groupName = traitName[..^2];

            _traits.Add(trait with
            {
                GroupName = groupName, GroupRank = groupRank, TraitId = ObjectId.GenerateNewId().ToString()
            });
            return this;
        }

        public TraitsBuilder WithGift(string name, Action<GiftBuilder> builder)
        {
            var giftBuilder = new GiftBuilder(this, name);
            builder(giftBuilder);
            _traits.AddRange(giftBuilder.ToTraits());
            return this;
        }


        public TraitsBuilder WithAbility(string name, string? description = null) =>
            WithTrait(new AbilityTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(), Name = name, Description = description
            });

        public TraitsBuilder WithOrdinarySkill(string name, SkillClass skillClass, int? moonStone = null,
            SkillRank? rank = null, string? description = null) =>
            WithTrait(new SkillTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(),
                Name = name,
                SkillClass = skillClass,
                Cost = moonStone,
                Rank = rank,
                Description = description
            });

        public TraitsBuilder WithCraftSkill(CraftArea type, string name, CraftType craftType, int cp, string components,
            string? description = null) =>
            WithTrait(new CraftSkillTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(),
                CraftArea = type,
                Name = name,
                Cost = cp,
                CraftType = craftType,
                Components = components,
                Description = description
            });

        public TraitsBuilder WithFlavorTrait(string name, string? description = null) =>
            WithTrait(new FlavorTrait {Name = name, Description = description});

        public TraitsBuilder WithAdvantage(string name, bool? isPhysical = false, string? description = null) =>
            WithTrait(new AdvantageTrait {Name = name, IsPhysical = isPhysical ?? false, Description = description});

        public TraitsBuilder WithDisadvantage(string name, bool? isPhysical = false, string? description = null) =>
            WithTrait(new DisadvantageTrait {Name = name, IsPhysical = isPhysical ?? false, Description = description});

        public async Task Write(MystwoodDatabase db, CancellationToken cancellationToken = default)
        {
            var options = new InsertManyOptions();
            await db.Traits.InsertManyAsync(_traits, options, cancellationToken);
        }
    }

    public class GiftBuilder : BaseBuilder
    {
        private readonly TraitsBuilder _traitsBuilder;
        private readonly List<Trait> _traits = new();

        public string Name { get; }

        public GiftBuilder(TraitsBuilder traitsBuilder, string name)
        {
            _traitsBuilder = traitsBuilder;
            Name = name;
        }

        public GiftBuilder WithRank(int level, Action<GiftRankBuilder> builder)
        {
            var rank = new GiftRankBuilder(this, level);
            builder(rank);
            _traits.AddRange(rank.ToTraits());
            return this;
        }

        public IEnumerable<Trait> ToTraits() => _traits;
    }

    public class GiftRankBuilder : BaseBuilder
    {
        private readonly GiftBuilder _giftBuilder;
        private readonly int _level;
        private readonly List<AbilityTrait> _abilities = new();
        private readonly List<GiftProperty> _properties = new();

        public GiftRankBuilder(GiftBuilder giftBuilder, int level)
        {
            _giftBuilder = giftBuilder;
            _level = level;
        }

        public GiftRankBuilder WithProperty(string name, string? value)
        {
            _properties.Add(new GiftProperty(name, value));
            return this;
        }

        public GiftRankBuilder WithAbility(string name, string? description = null)
        {
            _abilities.Add(new AbilityTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(), Name = name, Description = description
            });
            return this;
        }

        public IEnumerable<Trait> ToTraits()
        {
            yield return new GiftTrait()
            {
                TraitId = ObjectId.GenerateNewId().ToString(),
                Name = $"{_giftBuilder.Name} {_level}",
                Abilities = _abilities.Select(i => i.TraitId!).ToArray(),
                Properties = _properties.ToArray()
            };

            foreach (var ability in _abilities)
                yield return ability;
        }
    }

    public class MystwoodDatabaseSeeder
    {
        private readonly MystwoodDatabase _db;

        public MystwoodDatabaseSeeder(MystwoodDatabase db) => _db = db;

        public async Task SeedTestData()
        {
            var playerBuilder = PlayerBuilder.Create("Will");
            playerBuilder.WithEmails("will@larptheseries.com")
                .WithCharacter("Biff", ch => ch
                    .WithGift("Courage", TraitAssociationType.Free, TraitAssociationType.Free,
                        TraitAssociationType.Free, TraitAssociationType.Purchased)
                    .WithPublicHistory("Once upon a time, there was man, he died, the end.")
                );

            await playerBuilder.Write(_db);
        }

        public async Task SeedReferenceData()
        {
            var traits = new TraitsBuilder();

            LoadOrdinationSkills(traits);
            LoadCraftSkills(traits);
            LoadOccupations(traits);
            LoadGifts(traits);
            LoadFlavorTraits(traits);
            LoadAdvantages(traits);
            LoadDisadvantages(traits);

            await traits.Write(_db);
        }

        private static void LoadAdvantages(TraitsBuilder traits) => traits
            .WithAdvantage("Advantageous Gluttony 1",
                description:
                "A character with this Advantage may consume two units of Food to gain +1 maximum Hit Point for the next six hours. This extra Hit Point is not a Bestow, and stacks with other Hit Point sources.")
            .WithAdvantage("Call of Freedom 1", isPhysical: true,
                description:
                "Restraints cannot hold you. You may use this Advantage once per Renew to call “Resist” against the “Bind”, “Paralyze”, or “Root” Effects, or to escape from mundane bindings such as manacles.")
            .WithAdvantage("Caustic Blood 2", isPhysical: true,
                description:
                "Whenever you take 3 or more points of Damage from a single weapon hit, or suffer the “Maim”, “Lethal”, or “Death” Effect from a melee attack, you may call “Return 2 Damage by Poison” as your blood sprays out and burns your attacker. You still take the effect of the hit.")
            .WithAdvantage("Crushing Strength 1",
                description:
                "You may use one “2 Crushing” melee attack per Renew per point you spent on this Advantage.")
            .WithAdvantage("Crushing Strength 2",
                description:
                "You may use one “2 Crushing” melee attack per Renew per point you spent on this Advantage.")
            .WithAdvantage("Crushing Strength 3",
                description:
                "You may use one “2 Crushing” melee attack per Renew per point you spent on this Advantage.")
            .WithAdvantage("Durability 1", description: "Once per Renew, you may call “Resist” to a “Maim” Effect.")
            .WithAdvantage("Elemental Fury 1", isPhysical: true,
                description:
                "You may throw one “2 Damage by <Element> burst per Renew per point of this Advantage you take. To use this ability, you may gather as many packets as you wish, and throw them all at once in a group. You must choose one of the following elements when you take this Advantage: Air, Earth, Fire, or Water.")
            .WithAdvantage("Elemental Fury 2", isPhysical: true,
                description:
                "You may throw one “2 Damage by <Element> burst per Renew per point of this Advantage you take. To use this ability, you may gather as many packets as you wish, and throw them all at once in a group. You must choose one of the following elements when you take this Advantage: Air, Earth, Fire, or Water.")
            .WithAdvantage("Elemental Fury 3", isPhysical: true,
                description:
                "You may throw one “2 Damage by <Element> burst per Renew per point of this Advantage you take. To use this ability, you may gather as many packets as you wish, and throw them all at once in a group. You must choose one of the following elements when you take this Advantage: Air, Earth, Fire, or Water.")
            .WithAdvantage("Elemental Resistance 1", isPhysical: true,
                description:
                "Choose one element to be resistant to. This ability lets you call “Resist” against that element (Air, Earth, Fire or Water only) once per Renew.")
            .WithAdvantage("Evil Eye 1",
                description:
                "Once per Day, you may curse someone with an annoying but not incapacitating effect. You may use any on page 103 or submit other curses to the Staff. You may not curse during combat, as this takes about a 60 count of staring at someone. In addition, you may “Purge Curse” once per Day.")
            .WithAdvantage("Feign Death 1",
                description:
                "Once per Day, you may fall down in a deathlike state. While in this state, which may last for up to 30 minutes, you cannot be harmed in any way, but cannot move or speak. Call “No Effect”.")
            .WithAdvantage("Forest Ally 1", isPhysical: true,
                description:
                "You may use this advantage when out in the wild, out of town, outside of any walls. You may throw one “Bind by Magic” packet and one “Root by Magic” packet per Renew, as the trees rise up and snare your foes.")
            .WithAdvantage("Healing Blood 1", isPhysical: true,
                description:
                "You have powerful blood, possibly the result of vampiric ancestry. Twice per Renew, you may use a few drops of your blood to provide the “Heal 2” Effect to an injured person. If any individual character receives this healing Effect from you more than 3 times, ever, you must also state “Afflict with Blood Bond”.")
            .WithAdvantage("Hunter’s Senses 1",
                description:
                "You may use your senses to call “Detect ___ “, a total of three times per Renew. You may choose any combination of “Animal”, “Living”, “Undead”, or “Vermin”.")
            .WithAdvantage("Natural Armor 2", isPhysical: true,
                description:
                "You always count as wearing 1 Armor Point, which adds to your Hit Points. This Armor Point is NOT cumulative with any other armor you may wear.")
            .WithAdvantage("Old Blood 1", description: @"Once per Day, you may call ""Detect Fae"".")
            .WithAdvantage("Poison Spittle 2", isPhysical: true,
                description:
                "Once per Day, you may lick a blade to coat it with venom. You must call “Doom by Poison” on your next swing. If you miss, or the target blocks your attack, the ability is wasted.")
            .WithAdvantage("Purity 1",
                description: "Once per Renew, you may call “Resist” against a “by Poison” Effect.")
            .WithAdvantage("Skin Changer 2",
                description:
                "Once per Day, you may don a mask, transforming yourself into a horrible beast for up to one hour. During this time, in addition to your normal Gifts, Occupation, and Skills, you may use 30” Claws (see page 41) and gain 2 maximum Hit Points. In addition, you may call “Maim” twice with your claws, and may call “Disengage” 3 times. However, you may not speak or wear armor during this time, and many will not react well to your transformation.")
            .WithAdvantage("Stonefast 1", isPhysical: true,
                description: "Once per Day, you may plant your feet and call “Stonefast”.")
            .WithAdvantage("Stubborn Courage 1",
                description:
                "Once per Day, you may take up a defensive position (a roughly 10 foot area) and resolve to hold it to the last. As long as you do not leave your post, your current and maximum Hit Points are increased by 8. This stacks with any armor you might be wearing. You may not use this ability in duels of any sort.")
            .WithAdvantage("Talent 1",
                description:
                "You have a skill or knack that does not depend on your Occupation. You must be able to explain how you came by this talent. * 1 Point: Any one Minor skill. * 2 Points: Any one Standard skill. * 3 Points: Any one Major skill. If you purchase a given skill with Talent, you may not purchase that skill again with Moonstone (unless it can be purchased multiple times). Further, you may not purchase a skill which is listed as Unavailable.")
            .WithAdvantage("Talent 2",
                description:
                "You have a skill or knack that does not depend on your Occupation. You must be able to explain how you came by this talent. * 1 Point: Any one Minor skill. * 2 Points: Any one Standard skill. * 3 Points: Any one Major skill. If you purchase a given skill with Talent, you may not purchase that skill again with Moonstone (unless it can be purchased multiple times). Further, you may not purchase a skill which is listed as Unavailable.")
            .WithAdvantage("Talent 3",
                description:
                "You have a skill or knack that does not depend on your Occupation. You must be able to explain how you came by this talent. * 1 Point: Any one Minor skill. * 2 Points: Any one Standard skill. * 3 Points: Any one Major skill. If you purchase a given skill with Talent, you may not purchase that skill again with Moonstone (unless it can be purchased multiple times). Further, you may not purchase a skill which is listed as Unavailable.")
            .WithAdvantage("Treewalk 1", isPhysical: true,
                description:
                "Once per Day, while in the wild (outside of town, outside of any walls, and off of any cleared path), you may merge yourself with a tree, and remain so for up to 30 minutes. While merged, you must remain in contact with the tree and may not use any abilities or weapons, but cannot be harmed in any way. Call “No Effect”.")
            .WithAdvantage("Undead Bane 1", description: "You may throw two “5 Damage to Undead” packets per Renew.")
            .WithAdvantage("Witchblood 1", isPhysical: true,
                description:
                "Each Event at check in, you may roll on a chart that gives you small, random magical powers. Beware though, many are not beneficial. See Appendix 4, Witchblood, on page 145 for the chart")
            .WithAdvantage("Witchblood 2", isPhysical: true,
                description:
                "Each Event at check in, you may roll on a chart that gives you small, random magical powers. Beware though, many are not beneficial. See Appendix 4, Witchblood, on page 145 for the chart")
            .WithAdvantage("Witchblood 3", isPhysical: true,
                description:
                "Each Event at check in, you may roll on a chart that gives you small, random magical powers. Beware though, many are not beneficial. See Appendix 4, Witchblood, on page 145 for the chart")
            .WithAdvantage("Witchblood 4", isPhysical: true,
                description:
                "Each Event at check in, you may roll on a chart that gives you small, random magical powers. Beware though, many are not beneficial. See Appendix 4, Witchblood, on page 145 for the chart")
            .Done();

        private static void LoadDisadvantages(TraitsBuilder traits) => traits
            .WithDisadvantage("Anathema 1", isPhysical: true,
                description:
                "The kiss of poison is deadly to you. Any “by Poison” Effect you suffer instead causes you to suffer “Doom”.")
            .WithDisadvantage("Blind 4",
                description:
                "You cannot use weapons, run, throw packets, or read. You must role play this at all times.")
            .WithDisadvantage("Bloodlust 3",
                description:
                "Once you take damage, you are in a fight to the end. You will not run, retreat, negotiate, break off the battle, surrender or take prisoners. If you go more than a minute without encountering a new enemy, you can role play working your way down from your rage.")
            .WithDisadvantage("Carouser 1",
                description:
                "You must always join any drinking, carousing or gambling, or partying that is going on, even if it is not a good idea. You may not stop gambling until the gaming is over, or your funds are exhausted. If there is no celebration on any given night, you must start one. You gain the Carouser trait.")
            .WithDisadvantage("Cowardice 2",
                description:
                "When the going gets rough, you run for it, leaving your friends in the lurch. You must flee from any fight that looks like it’s going badly, even if only to hide in a building.")
            .WithDisadvantage("Creature of the Night 2",
                description:
                "You dislike sunlight and must wear a broad brimmed hat, hood, or other protection during the day, as well as staying inside as much as you can. In addition, you lose 1 Maximum Hit Point between dawn and the change of day at 6 PM. In the event you would be reduced to 0 maximum Hit Points, you instead are reduced to 1 and cannot run, jump, or shout.")
            .WithDisadvantage("Divine Disfavor: God of the Wild 2",
                description:
                "You have done something to anger the god of the Wild. Miracles of Resurrection will not provide the Wild resurrection (typically once per year).")
            .WithDisadvantage("Divine Disfavor: Goddess of Mercy 4",
                description:
                "You have done something to anger the goddess of Mercy. Miracles of Resurrection will not provide the Mercy resurrection (typically once per Event). Note that this may result in a shortlived character!")
            .WithDisadvantage("Divine Disfavor: Lord of Justice 1",
                description:
                "You have done something to anger the Lord of Justice, or you died before your tenure in the Mystwood, and were mysteriously returned. Miracles of Resurrection will not provide the Justice resurrection (typically once ever).")
            .WithDisadvantage("Eternal Foe: Fae 1",
                description:
                "One of the great non-human powers of the world, the Fae, senses you as a great enemy, and will go to great lengths to harass, hunt and even kill you, targeting you above all others in any battle. You gain the trait “Fae Foe” if you have this Disadvantage.")
            .WithDisadvantage("Eternal Foe: Chaos or Undeath 2",
                description:
                "One of the great non-human powers of the world senses you as a great enemy, and will go to great lengths to harass, hunt and kill you, targeting you above all others in any battle. Choose Chaos or Undead to be your Eternal Foe. You gain the trait “Chaos Foe”, or “Undead Foe” if you have this Disadvantage.")
            .WithDisadvantage("Excessive Curiosity 1",
                description:
                "You can’t leave any mystery unexplored. Examples: If you possess Hedge Magic and the appropriate components, you must attempt to make an item when confronted with a matrix. If you encounter a book, you must attempt to read it. Etc.")
            .WithDisadvantage("Forgetful 1",
                description:
                "At least once per Event, you must forget something of importance. You should role play this.")
            .WithDisadvantage("Greed 1",
                description:
                "Gold and other valuables bring out the worst in you. You will not spend money if you can avoid it, and must go to almost any length short of directly harming yourself or others to obtain any money on offer.")
            .WithDisadvantage("Gullible 1",
                description:
                "Reasonable attempts to trick or mislead you always work. You always assume people are telling the truth, unless they are an obvious monster or evil creature.")
            .WithDisadvantage("Horribly Disfigured 1",
                description:
                "You have suffered some nasty injury or illness in the past. You must wear significant makeup or prosthetics to show this- scar wax, rigid collodion, a partial mask, or the like.")
            .WithDisadvantage("Maimed 3",
                description:
                "You may only use one of your arms. This cannot be cured with “Purge Maim”- it is permanent unless you change your disadvantages. Even so, you should come with up an excellent story!")
            .WithDisadvantage("Mostly Illiterate 1",
                description:
                "You cannot read, but may sign your name if needed. You do not possess the Literacy Free Skill.")
            .WithDisadvantage("Nearsighted 1",
                description:
                "You cannot use any ability or weapon that targets someone more than 5 feet away. You cannot identify others at a distance either, or “Resist” any Effect that comes from more than 5 feet away.")
            .WithDisadvantage("Pacifist 2",
                description:
                "You won't harm another human, no matter how tainted or warped, under any circumstances, though animals, daemons, monsters, undead and so on are fine.")
            .WithDisadvantage("Perpetual Gloom 1",
                description:
                "You are always dour and cynical, and must role play seeing the dark side of things. You must respond with “No Effect” to the “Renew” Effect when it is delivered “By my Voice”.")
            .WithDisadvantage("Phobia 1 per Phobia",
                description:
                "You are deathly afraid of one of the following and must avoid it if at all possible. Choose one of the following: Chaos, Darkness, Enclosed Places, Fae, Fire, Large Animals, Nobles, Spell Casters, or Undead. While in the presence of your fear, you cannot think straight, and may not use any abilities that require you to call an Effect, including Resists, spells, etc.")
            .WithDisadvantage("Raging Hunger 1", isPhysical: true,
                description:
                "If you do not consume at least one unit of Food every six hours, you become weak. Until you consume 1 Unit of Food, you lose 1 Maximum Hit Point. If this would cause you to be reduced to 0 maximum Hit Points, you instead are reduced to 1 and cannot run, jump, or shout.")
            .WithDisadvantage("Sickly 3",
                description: "You “bleed out” and move from Unstable to Dead after only a 60 count Unstable.")
            .WithDisadvantage("Slow 2", description: "You may not run.")
            .WithDisadvantage("Spendthrift 1",
                description:
                "You must always spend any money you have at the first opportunity. You may not give treasure to others though- you like spending money. Basically you must spend all your money by the end of the Event.")
            .WithDisadvantage("Tainted 1",
                description:
                "You start with (or gain) 3 Marks of Chaos. Seven marks of Chaos will cause your character to become an NPC. Once In Game, look in the Book of Woe for the full description of this affliction: “Chaos Mark”")
            .WithDisadvantage("Teetotaler 1",
                description:
                "You cannot gain a “Renew” by tavern or tavern keeper provided means (for example, drinking).")
            .WithDisadvantage("Troublemaker 1", description: "You are always meddling and playing pranks on others.")
            .WithDisadvantage("Truthfulness 2", description: "You are bound to never lie.")
            .WithDisadvantage("Unwashed 1",
                description:
                "You are prone to getting sick. At the beginning of each Event, you must roll to discover what Affliction you will suffer from for the duration of the Event. Once In Game, look in the Book of Woe for the full description of this affliction.")
            .WithDisadvantage("Vulnerability 1", isPhysical: true,
                description:
                "Choose one of the four elements: Air, Earth, Fire, or Water. Your humors are imbalanced and this cannot be corrected. You take double damage from any Effect called by that element.")
            .WithDisadvantage("Wild Heart 1", isPhysical: true,
                description:
                "You are not comfortable with civilized things. Any “by Fire” Effect you suffer also causes the “Frenzy”.")
            .Done();

        private static void LoadFlavorTraits(TraitsBuilder traits) => traits
            .WithFlavorTrait("Townsfolk")
            .WithFlavorTrait("Living")
            .WithFlavorTrait("Follower of Justice")
            .WithFlavorTrait("Follower of Mercy")
            .WithFlavorTrait("Follower of Wild")
            .WithFlavorTrait("Audience")
            .WithFlavorTrait("Carouser")
            .WithFlavorTrait("Fae Foe")
            .WithFlavorTrait("Chaos Foe")
            .WithFlavorTrait("Undead Foe")
            .WithFlavorTrait("Eternal Foe")
            .WithFlavorTrait("Oathbreaker")
            .Done();

        private static void LoadGifts(TraitsBuilder traits) => traits
            .WithGift("Courage", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Hit Point Bonus", "+0")
                    .WithProperty("Battle Endurance per Renew", "1")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Use of Arms",
                        description:
                        "Allows you to use any single non-Restricted melee weapon, even two handed ones, or any shield up to 36” in any dimension.Use of Arms does not allow you to use two weapons at once.")
                    .WithAbility("Battle Endurance (Disengage)"))
                .WithRank(2, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "2")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Toughness I"))
                .WithRank(3, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "3")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Battle Endurance (Heal 2)"))
                .WithRank(4, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "3")
                    .WithProperty("Resist Will per Day", "1")
                    .WithAbility("Resist Will"))
                .WithRank(5, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "4")
                    .WithProperty("Resist Will per Day", "1")
                    .WithAbility("Toughness II"))
                .WithRank(6, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "4")
                    .WithProperty("Resist Will per Day", "2"))
                .WithRank(7, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "5")
                    .WithProperty("Resist Will per Day", "2")
                    .WithAbility("Battle Endurance (Purge Maim)"))
                .WithRank(8, rank => rank
                    .WithProperty("Hit Point Bonus", "+3")
                    .WithProperty("Battle Endurance per Renew", "5")
                    .WithProperty("Resist Will per Day", "3")
                    .WithAbility("Toughness III"))
                .WithRank(9, rank => rank
                    .WithProperty("Hit Point Bonus", "+3")
                    .WithProperty("Battle Endurance per Renew", "6")
                    .WithProperty("Resist Will per Day", "3"))
                .WithRank(10, rank => rank
                    .WithProperty("Hit Point Bonus", "+4")
                    .WithProperty("Battle Endurance per Renew", "6")
                    .WithProperty("Resist Will per Day", "4")
                    .WithAbility("Battle Endurance (Lethal to Harm)")
                    .WithAbility("Toughness IV"))
            )
            .WithGift("Dexterity", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Disarm Traps/Pick Locks")
                    .WithAbility("Thrown Weapon")
                    .WithAbility("Use Hand Crossbow"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Special Attacks")
                    .WithAbility("Use Bows"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Florentine")
                    .WithAbility("Pick Pockets I")
                    .WithAbility("Tarot Mortis"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Assassinate per Day", "1")
                    .WithAbility("Assassinate"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Assassinate per Day", "1")
                    .WithAbility("Two Weapons"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithProperty("Assassinate per Day", "2"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Swashbuckling"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Evade Trap"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Pick Pockets II"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Assassinate per Day", "3"))
            )
            .WithGift("Empathy", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithAbility("First Aid")
                    .WithAbility("Diagnose"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithAbility("Cure Maim"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithAbility("Healing Hand (Heal 2)"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithAbility("Improved First Aid"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithAbility("With Malice Toward None (Heal 3)"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithAbility("Detect Unconscious"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithAbility("Master First Aid"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithAbility("With Malice Toward None (Heal 5)"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithAbility("Empath’s Cry"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithAbility("Heroic Surgery"))
            )
            .WithGift("Passion", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "2")
                    .WithProperty("Bursts per Renew", "1")
                    .WithProperty("Storms per Renew", "-")
                    .WithAbility("Summon Element")
                    .WithAbility("Elemental Burst"))
                .WithRank(2, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "2")
                    .WithProperty("Bursts per Renew", "1")
                    .WithProperty("Storms per Renew", "-")
                    .WithAbility("Hedge Magic"))
                .WithRank(3, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "2")
                    .WithProperty("Storms per Renew", "-"))
                .WithRank(4, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "2")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility("Elemental Storm")
                    .WithAbility("Purge Element"))
                .WithRank(5, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility("Mage Lore"))
                .WithRank(6, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility(""))
                .WithRank(7, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "2")
                    .WithAbility("Elemental Kinship"))
                .WithRank(8, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "4")
                    .WithProperty("Storms per Renew", "2"))
                .WithRank(9, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "5")
                    .WithProperty("Bursts per Renew", "5")
                    .WithProperty("Storms per Renew", "2"))
                .WithRank(10, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "5")
                    .WithProperty("Bursts per Renew", "5")
                    .WithProperty("Storms per Renew", "2")
                    .WithAbility("Summoner’s Stride"))
            )
            .WithGift("Prowess", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Deathstrikes per Day", "-")
                    .WithAbility("Use of Arms"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Deathstrikes per Day", "-")
                    .WithAbility("Detect Health")
                    .WithAbility("Extra Hit Point"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Deathstrikes per Day", "-"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Deathstrikes per Day", "1")
                    .WithAbility("Deathstrike"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithProperty("Deathstrikes per Day", "1"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Deathstrikes per Day", "1")
                    .WithAbility("Thrown Weapon"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Deathstrikes per Day", "2"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Deathstrikes per Day", "2")
                    .WithAbility("Wrist Twist (Resist Crushing)"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithProperty("Deathstrikes per Day", "2"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithProperty("Deathstrikes per Day", "3"))
            )
            .WithGift("Wisdom", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Mana", "1")
                    .WithProperty("Resist Magic per Renew", "-")
                    .WithAbility("Lore")
                    .WithAbility("Sorcery"))
                .WithRank(2, rank => rank
                    .WithProperty("Mana", "2")
                    .WithProperty("Resist Magic per Renew", "-")
                    .WithAbility("Hedge Magic")
                    .WithAbility("Mage Lore"))
                .WithRank(3, rank => rank
                    .WithProperty("Mana", "3")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility(""))
                .WithRank(4, rank => rank
                    .WithProperty("Mana", "4")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility("Purge Magic I"))
                .WithRank(5, rank => rank
                    .WithProperty("Mana", "5")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility(""))
                .WithRank(6, rank => rank
                    .WithProperty("Mana", "6")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility(""))
                .WithRank(7, rank => rank
                    .WithProperty("Mana", "7")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility("Purge Magic II"))
                .WithRank(8, rank => rank
                    .WithProperty("Mana", "8")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility(""))
                .WithRank(9, rank => rank
                    .WithProperty("Mana", "9")
                    .WithProperty("Resist Magic per Renew", "3")
                    .WithAbility(""))
                .WithRank(10, rank => rank
                    .WithProperty("Mana", "10")
                    .WithProperty("Resist Magic per Renew", "3")
                    .WithAbility(""))
            )
            .Done();

        private static void LoadOccupations(TraitsBuilder traits) => traits
            .WithOccupation(OccupationType.Basic, "Adventurer",
                "Agility, Scavenging, Serene Contemplation, Wear Armor 2",
                description:
                "Many travelers, especially children, who find their way to the Mystwood Keep have no real training, only seeking a new start where they can make money and set up social ties. New players of any age may have this Occupation until their third Event, after which they must settle into a conventional role. Players under 18 may keep this Occupation until they turn 18.")
            .WithOccupation(OccupationType.Basic, "Apprentice",
                "Agility, Apprenticeship, Duty 1 (assist master), Production X (any 1 Material or Component), Serene Contemplation",
                description:
                "For as long as any can remember, apprenticeship has been the normal way to learn a craft. The skills of an apprentice are very helpful to a master, and therefore this Occupation is in high demand. The pay is not always great, but the perks are useful. Relationships formed as an apprentice can last the rest of your life. In some cases, it might be worth offering your services for free until a wealthier patron comes along to employ you.")
            .WithOccupation(OccupationType.Basic, "Baker", "Cooking 4, Income 10, News & Rumors, Weapon Use (Flail)",
                description:
                "Bread is the most important food for the vast majority of people in Europa, being the basis of nearly every meal. Thus, bakers are common and valued. Since many people come to the baker to get their bread, they are an excellent source of rumors.")
            .WithOccupation(OccupationType.Basic, "Barber Surgeon", "Apothecary 2, Cure Affliction, Medicine",
                description:
                "The practice of Medicine in the Mystwood is not for the faint of heart. Maladies are many and terrible, and the nature of the Mystwood means they progress at terrifying speed. Patients transform into monsters on the operating table, and the Barber Surgeon must take precautions to avoid the most horrid of afflictions.")
            .WithOccupation(OccupationType.Basic, "Bard/Minstrel/Thespian",
                "Bardic Voice 4, Entertainer, News & Rumors",
                description:
                "Jugglers, dancers, minstrels, thespians, even puppeteers, these are the superstars of the Known world. Their performances are often the high points of folk’s existence, especially in times of trouble.")
            .WithOccupation(OccupationType.Basic, "Beggar",
                "Agility, Begging, Livery (rags and patches), Scavenging and one of Information Gathering or Weapon Use (Staff)",
                description:
                "War, famine, plague, and a host of other ills best Europa, and many who lose their homes and livelihoods become beggars, forced to seek bread and coin from generous folk. Such downtrodden often find themselves in rural villages, searching for new lives. Of course, some beggars are false- little better than brigand- and so beggars often have bad reputations.")
            .WithOccupation(OccupationType.Basic, "Blacksmith",
                "Livery (leather apron), Metalworking 4, Weapon Specialization (One Handed Blunt, Two Handed Blunt)",
                description:
                "Blacksmiths form the backbone of the kingdom. They service the many knights who need a great deal of upkeep on their armor. A blacksmith’s use of metalworking is also helpful to the commoners, who need sturdy arrows for their bows.")
            .WithOccupation(OccupationType.Basic, "Boatman",
                "Buy/Sell 10, Income 5, Production (1 Water), News & Rumors, Work Rhythm and one of Cosmopolitan Connections or Scavenging",
                description:
                "In a Europa where roads are uncommon and often plagued by brigands, river travel is common, cheap, and reliable. Most settlements are no more than a day or two's travel from the sea, or from a river, major routes of trade and vital lifelines. Boatmen are those sturdy folk who ensure that small, distant settlements continue to receive finished goods from the outside world, and that the raw materials gained from the wilds are easily obtained by the rest of the Known World.")
            .WithOccupation(OccupationType.Basic, "Butcher",
                "Butcher, Cooking 2, Livery (bloodstained apron), Toughness",
                description:
                "Even peasants in Europa eat a great deal of meat, but few know the ins and outs of cleaning and preparing it for consumption. Thus, the butcher’s trade is invaluable. Butchers require good strength and health in order to move heavy carcasses, and so they are often surprisingly tough.")
            .WithOccupation(OccupationType.Basic, "Clerk/Forger",
                "Copyist, Production (2 Parchment), Scribe 4, Serene Contemplation",
                description:
                "Clerks are employed by many wealthier individuals, though some offer freelance services. They are skilled in the art of writing and record keeping. Clerks are never without a few sheets of quality parchment.")
            .WithOccupation(OccupationType.Basic, "Courier", "Agility, Income 5, News & Rumors, Pathfinding, Scribe 2",
                description:
                "For most, alas, mobility from their villages and farms is difficult at best, and deadly at worst. The threat of raiders and beastmen keeps many behind shuttered window and palisade. What, then, of missives which must be sent from lord to vassal, or merchant to factor? Such is the role of the courier, whose quick feet and cunning eye allows them to move about quickly, and spread information on the strange places and half-heard news they encounter in their travels.")
            .WithOccupation(OccupationType.Basic, "Dancer/Juggler/Acrobat",
                "Agility, Entertainer, Livery (performance costume), News & Rumors, Weapon Specialization (Thrown Weapon)",
                description:
                "Often dressed in colorful and unique attire, dancers, jugglers, and acrobats are popular among commoners. They perform a service desired by all- quality entertainment. They are often agile, and at times their performance skills will benefit them in a fight.")
            .WithOccupation(OccupationType.Basic, "Folk Healer",
                "Apothecary 2, Cure Affliction, Detect Health, News & Rumors",
                description:
                "Folk healers include such cunning men, midwives, witchdoctors and field medics that assist with minor home remedies, childbirth, and wound care to villages and households too small to maintain a professionally trained person. While most would go to a barber-surgeon for a bleeding, or to an herbalist for a poultice, the folk healer is sometimes sought after for advice as much as medicinal wisdom.")
            .WithOccupation(OccupationType.Basic, "Fortune Teller",
                "Fortune Telling, Income 10, Mage Lore, News & Rumors, Serene Contemplation and one of Bardic Voice 2 or Scribe 2",
                description:
                "The future is a riddle many seek to answer, and they are willing to pay handsomely for any clues to what lies ahead. A successful court astrologer can earn tremendous wealth, and even village fortune tellers are quite well off. Alas, seers are also viewed with great suspicion, which can make this career quite risky. The notion that they are all charlatans is sometimes bandied about, and more dire, some believe they make their predictions come true with dark sorcery.")
            .WithOccupation(OccupationType.Basic, "Gentlefolk",
                "Bestow Favor, Income 10 and choose any 2 of the following: Bardic Voice 2, Cooking 2, Divine Lore, Information Gathering, Research, Scribe 2, Serene Contemplation, or Sewing 2",
                description:
                "Gentlefolk (ladies in waiting, gentlemen of leisure and so on), are those who are well off enough to not have to work for a living, and so choose not to. Usually they are the children of knights, but not knights themselves, having chosen not to pursue the path of battle. Sometimes, they are those who have made a small fortune in the past, and are now taking advantage of that wealth. Some are pure charlatans, who use their bearing, glib conversation and clothing to make themselves welcome in the castles and feast halls of others.")
            .WithOccupation(OccupationType.Basic, "Gravedigger",
                "Engineering, Income 5, Occupational Spells (page 126), Production (1 Death Component), Slayer (Undead), Weapon Specialization (Tool), Woodworking 2",
                description:
                "In a time where death can come at any moment, due to plague, famine, or violence, gravediggers have the solemn duty of burying the deceased. Due to their proximity to the dead, each gravedigger has their own unique methods of avoiding sickness or curse. Traditionally, a gravedigger wears dark colors, black in most cases, out of respect for the dead. Grave digging is a very lucrative profession ever since the plagues came to Europa. Few dare to handle the bodies of the dead for fear of affliction, so those brave enough to dispose of them are well compensated.")
            .WithOccupation(OccupationType.Basic, "Herbalist", "Apothecary 4, Cure Affliction, Mage Lore, Woodwise",
                description:
                "Herbalists are the chemists of these blighted ages and play an important role in healing those who are afflicted by ailments. Their ability to brew and identify many powerful potions and poisons makes them a source of knowledge.")
            .WithOccupation(OccupationType.Basic, "Herder",
                "Pathfinding, Production (2 Cloth, 6 Food), Wear Armor 1, Woodwise",
                description:
                "The staple of all communities are the herdsmen and women. They provide fresh meat and cloth for their fellows by nurturing a hearty flock. The creatures herded by these individuals vary considerably- while most herd sheep, goats or pigs, others herd more unique animals.")
            .WithOccupation(OccupationType.Basic, "Hermit", "Apothecary 2, Cure Affliction, Divine Lore, Scribe 2",
                description:
                "There are many strange people who live in the woods, and little is known of why they seek solitude. Perhaps, within nature, they are able to hone their fine skills in brewing, or perhaps they seek the rarest elements, herbs and plants. In any case, a hermit can be a very valuable companion when coerced out of their solitude. They tend to have communion with the gods, and can cure diseases that barber surgeons seldom are aware of.")
            .WithOccupation(OccupationType.Basic, "Hunter",
                "Butcher, Pathfinding, Production (2 Food), Weapon Specialization (Bow, Normal Crossbow), Wear Armor 1, Woodwise",
                description:
                "In the thick woods it is hard to find a suitable place for farmland, and so, hunting is a primary form of food gathering. Hunters are hearty individuals who know how to take care of themselves. One never knows whether the hunt will lead to a more or less harmless deer, or a ferocious wild cat.")
            .WithOccupation(OccupationType.Basic, "Laborer",
                "Duty 2 (Manual Labor), Engineering, Income 5, Toughness, Weapon Use (Two Handed Axe or Two Handed Blunt), Weapon Use (Tool), Work Rhythm",
                description:
                "For many people, daily life is one of toil and back breaking tedium. Nevertheless, fields must have drainage, roads must be leveled, walls built and repaired, and so on. These tasks can only be solved by application of manual labor, and it is the Laborer who performs such duties.")
            .WithOccupation(OccupationType.Basic, "Lackey",
                "Buy/Sell 10, Commerce, Livery (your master's colors), Quick Learner, News & Rumors and one of Serene Contemplation or Unarmed Combat",
                description:
                "A lackey is a servant, indispensable when skilled and knowledgeable, bumbling and in the way when not. Many lackeys eventually become sergeants-at-arms, stewards, or valets for their superiors.")
            .WithOccupation(OccupationType.Basic, "Lay Cleric",
                "Divine Lore, Divine Spells, Income 5, Religious Ceremony, Serene Contemplation, Wear Armor 3 and one of Warcaster or Weapon Specialization (your choice of One Handed Blunt, One Handed Sword, Two Handed Blunt, or Two Handed Sword)",
                description:
                "Messengers of the gods, these individuals are often leading members of communities. They are battle ready to serve their god, and are capable of harnessing powers that allow them to cast spells while wearing armor. They give fiery and thoughtful sermons, while reminding everyone of the true enemies: Chaos and Undeath.")
            .WithOccupation(OccupationType.Basic, "Locksmith",
                "Engineering, Income 5, Set Trap, Weapon Use (Staff), Woodworking 4",
                description:
                "With civilization comes profit, and with profit comes thieves. Locksmiths are usually tasked to open locks other people have set, but the slowly growing populace of middle class folk in Europa calls on knowledgeable folk able to help safeguard wealth.")
            .WithOccupation(OccupationType.Basic, "Novice Monk",
                "Divine Lore, Livery (robe or habit), Research, Scribe 2, Serene Contemplation",
                description:
                "Monks are among the wisest and most learned of people in Europa. Somber and determined, they serve the Church and their neighbors. They tend to dress in dull tones and have an aptitude for book learning, a very rare thing in a society with few who can read well.")
            .WithOccupation(OccupationType.Basic, "Peddler",
                "Buy/Sell (50), Commerce, Income 10, News & Rumors, Pathfinding",
                description:
                "Most merchants don’t begin with a store of their own, they need to build up connections and develop a reputation. To do this, they travel near and far, buying and selling what merchandise they can easily transport.")
            .WithOccupation(OccupationType.Basic, "Penitent",
                "Battle Rage, Blessed, Divine Lore, Livery (icons of faith), Weapon Specialization (Flail), Weapon Use (Flail)",
                description:
                "Penitents are the fanatics of the Church, usually former sinners, but sometimes merely those who are willing to accept great pain on behalf of those who sin and do not recant. They are often travelers, spreading their faith. Some turn to self-flagellation, whereas others try to embrace higher degrees of reason in order to spread their faith. Others still are rather quiet and keep to themselves, completing their spiritual journey alone.")
            .WithOccupation(OccupationType.Basic, "Ragpicker",
                "Duty 2 (Clean up trash), Production (any one Material), Scavenging, Weapon Specialization (Tool) and one of Toughness or Weapon Use (Polearm)",
                description:
                "Somewhat higher than beggars in the hierarchy of civilization’s castoffs, ragpickers exist in every town of any real size. They carry trash from houses to the midden, peddle what things can be repaired, muck stables, and help the ratcatchers and guardsmen fight against such goblins and rats who frequent dumps.")
            .WithOccupation(OccupationType.Basic, "Ratcatcher",
                "Engineering, Livery (rats or rat symbols), Occupational Spells (page 126), Poisoner 2, Set Trap, Slayer (Vermin)",
                description:
                "In the realms of Mystwood, rat catching is serious business. Not only do rats and similar vermin spread disease and devour vital food supplies, but when touched by Chaos they can grow to enormous size and devour livestock, pets and children. At times, great hordes of rats sweep across the land, overwhelming villages, leaving only well gnawed bones behind. The common folk hate and fear rats, and the ratcatcher is thus a figure of both admiration and dread.")
            .WithOccupation(OccupationType.Basic, "Squire",
                "Income 10, Wear Armor 4 and one of Armstraining 4 or Metalworking 2",
                description:
                "In Europa, becoming a knight is often the best way for a free commoner to escape the lower classes and become important and famous. Choosing the path of the squire is one of the best ways to begin the journey to knighthood.")
            .WithOccupation(OccupationType.Basic, "Street Vendor",
                "Buy/Sell 10, Cooking 2, News & Rumors, Scavenging and one of Metalworking 2, Sewing 2, or Woodworking 2",
                description:
                "Every village market has vendors selling food and trinkets. Street vendors are often considered a lesser sort of merchant than even a tinker or peddler, but their unique mix of wares can be valuable.")
            .WithOccupation(OccupationType.Basic, "Tailor/Leatherworker",
                "Duty 1 (mending and patching), Medicine, Sewing 4",
                description:
                "Fine cloth is often in short supply in the darker parts of the kingdom, but many there are in need of leather working and animal hides are easy to find. Talents in stitching can sometimes aid in tending battle wounds as well.")
            .WithOccupation(OccupationType.Basic, "Tavern Keeper",
                "Cooking 2, Drinks on the House, Duty 1 (minding the tavern), Income 10, Information Gathering, News & Rumors, Sell Drinks",
                description:
                "In the year 930, some 40 years ago, a vile Chaos cult nearly brought down the barony of Wickshire in Navarre by distributing tainted wine at a series of festivals. Many died as the vile spirits took effect. Since that time, brewing of any sort has been a closely guarded noble monopoly, carried out by licensed brewers. Taverns, however, need staff to sell such wares, and many a village exists only because it is in a convenient location to stop, spend the night, and have a drink.")
            .WithOccupation(OccupationType.Basic, "Tinker",
                "Armor Repair, Buy/Sell (30), Commerce, News & Rumors, Scavenging, Tinkering",
                description:
                "The tinker is a wanderer, repairing pots and sharpening knives, trading old clothes and scrap, and generally keeping poor villages which never see a true merchant alive. Much lore and myth has evolved about the tinker, and in many lands to harm one is extremely bad luck.")
            .WithOccupation(OccupationType.Basic, "Town Crier",
                "Bardic Voice 2, Duty 1 (shout proclamations you have been hired to, or seditious blather), Income 10, Information Gathering, News & Rumors, Unarmed Combat",
                description:
                "Sometimes a loud mouth is just another loud mouth, getting into brawls at the tavern, spreading nasty rumors, and inciting riots… Other times a person with a good, booming voice is an upstanding member of the community, shouting news, gathering people for meetings, and helping to sell a merchant's stock. It’s up to you which one you’ll be.")
            .WithOccupation(OccupationType.Basic, "Town Guard",
                "Duty 1 (inspection by a Corporal or Captain of the Guard), Income 5, Livery (based on local Chapter), Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 3",
                description:
                "Most towns and villages boast a small contingent of paid guards who patrol trails, guard gates, make sure that laws are observed, and generally assist the local magistrate or lord with ready weapons.")
            .WithOccupation(OccupationType.Basic, "Woodsfolk",
                "Duty 1 (gathering firewood), Weapon Specialization (One Handed Axe, Two Handed Axe), Wear Armor 1, Woodworking 4, Woodwise",
                description:
                "Trees all around, yet wood is still scarce. All living trees are property of nobility, and cannot be cut without a special writ. This makes the job of a woodswoman challenging at times. Nevertheless, good carpentry skills are essential to the survival of any outpost- the walls of buildings and keeps are always in need of repair.")
            .WithOccupation(OccupationType.Youth, "Adventurer (Youth)",
                "Agility, Scavenging, Serene Contemplation, Wear Armor 2",
                description:
                "Many travelers, especially children, have no real training, only seeking a new start where they can make money and set up social ties.")
            .WithOccupation(OccupationType.Youth, "Apprentice (Youth)",
                "Agility, Apprenticeship, Duty 1 (assist master), Production X (any 1 Material or Component), Serene Contemplation",
                description:
                "For as long as any can remember, apprenticeship has been the normal way to learn a craft. The skills of an apprentice are very helpful to a master, and therefore this Occupation is in high demand. The pay is not always great, but the perks are useful. Relationships formed as an apprentice can last the rest of your life. In some cases, it might be worth offering your services for free until a wealthier patron comes along to employ you.")
            .WithOccupation(OccupationType.Youth, "Bard/Minstrel/Thespian (Youth)",
                "Bardic Voice 4, Entertainer, News & Rumors",
                description:
                "Jugglers, dancers, minstrels, thespians, even puppeteers, these are the superstars of the Known world. Their performances are often the high points of folk’s existence, especially in times of trouble.")
            .WithOccupation(OccupationType.Youth, "Beggar (Youth)",
                "Agility, Begging, Livery (rags and patches), Scavenging and one of Information Gathering or Weapon Use (Staff)",
                description:
                "War, famine, plague, and a host of other ills best Europa, and many who lose their homes and livelihoods become beggars, forced to seek bread and coin from generous folk. Such downtrodden often find themselves in rural villages, searching for new lives. Of course, some beggars are false- little better than brigand- and so beggars often have bad reputations.")
            .WithOccupation(OccupationType.Youth, "Dancer/Juggler/Acrobat (Youth)",
                "Agility, Entertainer, Livery (performance costume), News & Rumors, Weapon Specialization (Thrown Weapon)",
                description:
                "Often dressed in colorful and unique attire, dancers, jugglers, and acrobats are popular among commoners. They perform a service desired by all- quality entertainment. They are often agile, and at times their performance skills will benefit them in a fight.")
            .WithOccupation(OccupationType.Youth, "Guttersnipe (Youth)",
                "Agility, Duty 1 (assist master), Evade Trap, Production (1 Death), Scavenging",
                description:
                "There are many people whose jobs are somewhat less than pleasant. Gravediggers, Ragpickers, Ratcatchers and more take apprentices just as any others do, but what is expected of them is entirely different.")
            .WithOccupation(OccupationType.Youth, "Initiate (Youth)",
                "Divine Lore, Livery (robes or other religious symbols), Quick Learner, Serene Contemplation",
                description:
                "Those who join the church as youths, intending to become monks or priests, begin as initiates. Many are orphans, or the younger children of peasants who may not be able to afford to educate or even feed these additional mouths.")
            .WithOccupation(OccupationType.Youth, "Lackey (Youth)",
                "Buy/Sell 10, Commerce, Livery (your master's colors), Quick Learner, News & Rumors and one of Serene Contemplation or Unarmed Combat",
                description:
                "A lackey is a servant, indispensable when skilled and knowledgeable, bumbling and in the way when not. Many lackeys eventually become sergeants-at-arms, stewards, or valets for their superiors.")
            .WithOccupation(OccupationType.Youth, "Page (Youth)",
                "Agility, Income 5, Livery (your patron’s colors), Quick Learner, Wear Armor 2",
                description:
                "Amongst gentlefolk and the children of knights, youths are often sent to learn the arts of war. foster with other families. Often these pages, as they are called, are training to one day become squires.")
            .WithOccupation(OccupationType.Youth, "Student (Youth)",
                "Copyist, Production (1 Parchment), Quick Learner, Serene Contemplation",
                description:
                "Many young people seek an education from the learned people of Europa, and become “full time” students. Such youths often become monks, litigants, scribes and philosophers in later life.")
            .WithOccupation(OccupationType.Youth, "Town Guard Recruit (Youth)",
                "Duty 1 (inspection by Corporal or Captain of the Guard), Income 5, Livery (green and black Town Guard tabard), Wear Armor 2",
                description:
                "Most towns and villages boast a small contingent of paid guards who patrol trails, guard gates, make sure that laws are observed, and generally assist the local magistrate or lord with ready weapons. In dangerous places, young people are often recruited by the Guard, and nearly brought up by them.")
            .WithOccupation(OccupationType.Youth, "Ward (Youth)", "Bestow Favor, Income 10, Quick Learner, Scavenging",
                description:
                "The children of knights, nobles, and priests are often entrusted to others for protection, especially during times of war when children might be exchanged as hostages. Often these children come to respect their tutors and guardians even more than their true parents after long years away from home.")
            .WithOccupation(OccupationType.Advanced, "Absolver/Flagellant",
                "Absolution, Battle Rage, Blessed, Divine Lore, Improved Battle Rage, Iron Will, Livery (icons of faith), Toughness, Weapon Specialization (Flail), Weapon Use (Flail)",
                requirements:
                "Must have previously been a Friar, Knight Penitent, Lay Cleric, or Penitent for at least a year, and be accepted to a cult of flagellants. Must renounce all worldly possessions, save for clothing and a hand weapon.",
                description:
                "The sins of the world are immense. Amongst the penitent, there are a few who seek to atone for all of humanity through their extreme devotion. These folk are the Absolvers. Often, priests and other holy folk come to them for advice on proper penance- though absolvers tend to err on the side of harsh stringency.")
            .WithOccupation(OccupationType.Advanced, "Almoner",
                "Begging, Blessed, Buy/Sell 20, Cooking 2, Divine Lore, Duty 1 (distribute money to the needy), Income 10",
                requirements:
                "Must be either a Beggar or Lay Cleric for one year and accepted into the household/church of an Ordained Priest.",
                description:
                "It is true that many in Europa do not have the means to support themselves. In larger towns and cities, begging is rampant, and the downtrodden poor go hungry and unclothed. The Church, taking pity on these poor souls, hires almoners to both collect and distribute funds, food, and materials to the less fortunate. Often former beggars themselves, almoners take their role very seriously.")
            .WithOccupation(OccupationType.Advanced, "Artist (Author/Gilder/Painter/Sculptor)",
                "Artistry, Income 10, Serene Contemplation one of Metalworking 4, Scribe 4, Sewing 4 or Woodworking 4 and one of Commerce, Divine Lore, Engineering, Mage Lore, or Woodwise",
                requirements:
                "Patronage. Must be approved by the Staff, based on art created in game prior to taking the Artist occupation.",
                description:
                "Artists- true artists- are able to move people to emotions with merely a brush stroke, carved line, or well-placed word. The artists of Mystwood create jewelry, tapestries, paintings, fine carvings, engravings, songs, books and the like in order to enrich the lives and coffers of the folk around them. Where guild crafters and master thespians do these things for their living, and to make a wage, Artists do things for the sheer joy of creation, to bring praise to the gods, or to celebrate the world.")
            .WithOccupation(OccupationType.Advanced, "Astrologer",
                "Fortune Telling, Divine Lore, Information Gathering, Mage Lore, Production (1 Time), Research, Scribe 2, Serene Contemplation",
                requirements:
                "You must possess Fortune Telling, either purchased or from an Occupation. Further, you must spend 200 crown for suitable books and strange tools.",
                description:
                "The practice of stargazing for purposes of fortune telling is ancient, said to have passed to man from drowned Atlantis. While more humble means of fortune tellingcards, runes, and the like- rule divinatory tradition, there are still soothsayers who gaze upon the constellations to seek meaning.")
            .WithOccupation(OccupationType.Advanced, "Beekeeper",
                "Apothecary 2, Income 10, Livery (beekeeping garb with mask), Occupational Spells (page 125), Production (4 Food, 4 Life), Serene Contemplation, Swarm Magic, Wear Armor 1, Woodwise",
                requirements: "200 Crown, or 150 crown and possession of a Queen Bee.",
                description:
                "Honey, wax, comb, and even bee poison all have their uses, and so the occupation of Beekeeper is not an uncommon one where climate allows. Often, beekeepers are monks, whose dwelling cells are a mirror of the hives themselves. Others are hermits, content to dwell in the wilds quietly with their hives, protected from harm by the stinging swarms who are their neighbors and children.")
            .WithOccupation(OccupationType.Advanced, "Corporal of the Guard",
                "Armstraining 2, Duty 2 (inspecting the Guard), Income 10, Leadership (Town Guard), Livery (based on local Chapter), Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 4",
                requirements:
                "Must be appointed to the post by the Captain of the Guard or a similar person after one year or more of service to the Guard as a Town Guard, Town Guard Recruit, or Gaoler.",
                description:
                "Any village of size requires hierarchy in their guardsmen, as a Captain of the Guard can’t be everywhere. Corporals lead groups of the regular guard, instruct recruits, make decisions based on questions of the Code Civitas, and otherwise ensure that the work of the Guard continues smoothly.")
            .WithOccupation(OccupationType.Advanced, "Crofter",
                "News & Rumors, Production (2 Cloth, 4 Food, 4 Wood), Weapon Specialization (Tool), Work Rhythm, Woodworking 2",
                requirements:
                "You must obtain a grant of a forested tract, either by purchase, rent, or reward for deeds, and clear a portion. Alternately, you may be a Laborer and spend 100 crown to build a small cottage and clear fields.",
                description:
                "As the borders of the Mystwood become settled, and small villages spring up between the trees, the crofters lead the settling effort. It is hard and unpleasant work, with little reward- cutting tracks, building mean houses, and eking food and profit from the forest soil. Nevertheless, folk do it, and it is far cheaper than establishing a true freehold.")
            .WithOccupation(OccupationType.Advanced, "Demagogue",
                "Armstraining 4, Bardic Voice 4, Income 10, Information Gathering, Leadership (those who have joined your cause), News & Rumors, Unarmed Combat",
                requirements:
                "Have a cause approved by the Game Masters and gain at least six followers who have sworn themselves to this cause.",
                description:
                "Not all nobles are worthy of the service of commoners. Not all Knights are chivalrous, all churchmen holy, all magistrates fair. Against these rise the demagogues, charismatic folk heroes whose goal is to oppose authority. Usually this is the selfsame corrupt authorities, but not always- many demagogues have opposed legitimate rule, with usually bloody outcomes.")
            .WithOccupation(OccupationType.Advanced, "Dragon Slayer",
                "Battle Rage, Livery (Fantastical costume, hair and tattoos), Scavenging, Slayer (Beastman, Draconian, Goblin, Minotaur, and Troll), Wear Armor 3",
                requirements: "Must slay at least 3 Draconians, Minotaurs, or Trolls.",
                description:
                "While there is but one Dragon, there are countless monsters who run rampant throughout Europa. Those who have made a habit of slaying the most powerful of these beings become Dragon Slayers, and find themselves in high demand by small villages and those who want exotic bodyguards. Market yourself well and you should be able to find employment with wealthier members of society. You may also be well suited for high paying pit fights or dangerous quests.")
            .WithOccupation(OccupationType.Advanced, "Executioner",
                "Entertainer, Execution, Income 10, Livery (black hood), Occupational Spells (page 125), Poisoner 4, Weapon Specialization (One Handed Axe, One Handed Sword, Two Handed Axe, Two Handed Sword)",
                requirements: "Training (100 crown) A writ of appointment from a landed noble.",
                description:
                "The majority of high crimes in Europa end in death- it is costly to house a criminal in a prison for too long, and the spectacle of a public execution is both entertainment and object lesson for the unwashed masses. An executioner, then, is as much a public servant as an entertainer.")
            .WithOccupation(OccupationType.Advanced, "Famulus",
                "Armstraining 2, Iron Will, Livery (your master's symbol), Mage Lore, Slayer (Daemons), Weapon Specialization (any one Weapon Type), Warcaster",
                requirements:
                "Must be linked in a protracted ceremony to a character of great magical power, such as a character with Passion 7+, Wisdom 7+, or as approved by the Staff.",
                description:
                "In Roman times, every sorcerer or summoner of repute had a famulus, a person bound to them as bodyguard and servant. As time passed, the role of the famulus has progressed, and now they are expected both to protect their magus, and correct their magical mistakes, if need be.")
            .WithOccupation(OccupationType.Advanced, "Fence/Pawnbroker",
                "Buy/Sell (50), Commerce, Fence, Income 10, News & Rumors, Retainers 1 and one of Information Gathering or Research",
                requirements:
                "Must be active in the Shadow Guild for at least a year, and spend 100 crown establishing a network of contacts and traders.",
                description:
                "The tradition of the pawnbroker is alive and well, especially in the larger cities. Many people, though, find that sometimes there is a need for goods to quietly disappear. The fence also discretely finds information for their patrons- the right rumor can make a fence's career very lucrative- or end it abruptly.")
            .WithOccupation(OccupationType.Advanced, "Forester/Ranger/Gamekeeper",
                "Pathfinding, Production (8 Wood), Weapon Specialization (One Handed Axe, Two Handed Axe), Wear Armor 2, Woodwise, Woodworking 4",
                requirements:
                "Must be given a writ by a noble to protect an area of a forest and oversee tree felling.",
                description:
                "The Forests of Europa are lucrative resources, most owned by nobles for their pleasure. The beasts of the wood, the trees, the water, and the minerals are all owned by the nobility, who are often far away and unable or unwilling to defend their rights. Thus, most localities have a forester, someone who patrols the wood and ensures that the trees and game are free from poaching and theft.")
            .WithOccupation(OccupationType.Advanced, "Freeholder",
                "Butcher, Patronage 1, Production (4 Cloth, 12 Food, 2 Wood), Weapon Use (Flail), Woodwise, Woodworking 2",
                requirements:
                "You must obtain a grant of land either by purchase, rent, or reward for deeds. Alternately, you may be a Herder and spend 200 crown to expand your herd.",
                description:
                "The wealthiest and most successful farmers and herdsfolk are able to set up their own freehold, an independent farm in the form of the latifundia of long ago. Such freeholders have great political power, as they are a major source of food and job opportunities for their friends and neighbors.")
            .WithOccupation(OccupationType.Advanced, "Gaoler",
                "Duty 1 (inspecting prisoners and upkeeping cells), Income 10, Livery (Town Guard), Occupational Spells (page 125), Set Trap, Weapon Specialization (One Handed Blunt, Two Handed Blunt), Warcaster, Wear Armor 3",
                requirements: "Must be appointed to the post by Captain of the Guard.",
                description:
                "The jail keeper is not the most respected member of the Town Guard, but their role can be critical. Most crimes do not require extensive jail time, so the gaoler might be called on to administer certain other punishments.")
            .WithOccupation(OccupationType.Advanced, "Herald",
                "Armstraining 2, Bardic Voice 4, Income 10, Information Gathering, Livery (Herald’s garb), Occupational Spells (page 126), Scribe 2",
                requirements: "Training (100 crown) and you must pass the examination of the College of Heralds.",
                description:
                "It is the College of Heralds that ratifies all new knights, and helps them work out a unique heraldic device- the symbolic colors and imagery which show all the world the Knight’s honor and virtue. The College of Heralds is also often called upon to mediate disputes between knights and lords, or to advise the gentry and nobility in matters of etiquette and protocol.")
            .WithOccupation(OccupationType.Advanced, "Juror",
                "Bardic Voice 2, Research, Scribe 2, Serene Contemplation and any two of Commerce, Detect Health, Divine Lore, Engineering, Iron Will, Mage Lore, News & Rumors, or Woodwise",
                requirements:
                "Must have been selected as a juror in a trial, successfully spoken on behalf of the accused and written a treatise on local law, or Patronage.",
                description:
                "Magistrates and nobles are often busy people. In many major cities, the selection of jurors has devolved to an educated elite of folk, somewhat knowledgeable in the laws, or at least valued for their wisdom. These semiprofessional Jurors combine legal experience with detective work, sticking their noses in where they are not always wanted.")
            .WithOccupation(OccupationType.Advanced, "Knight Errant",
                "Armstraining 4, Income 10, Leadership (any non-Knight sworn to aid you), Livery (Your heraldry), Retainers 1, Wear Armor 6",
                requirements: "Requirement: You must be Knighted.",
                description:
                "Those who have comported themselves with honor and impressed the right people are knighted by an existing knight or a noble. Landless wanderers, knights errant may carry their own heraldry, create their own retinues, and work toward further impressing the right people and being granted a manor or joining an order of knighthood.")
            .WithOccupation(OccupationType.Advanced, "Librarian",
                "Copyist, Research x2, Scribe 4, Serene Contemplation",
                requirements:
                "Patronage, must be appointed to be caretaker of a collection of at least ten books and/or scrolls.",
                description:
                "Books are rare and valuable, and wherever there is a collection of them, there should be a librarian to protect, repair, and make copies of them. Some libraries are associated with the Church, while others are the private property of the wealthy.")
            .WithOccupation(OccupationType.Advanced, "Litigant",
                "Bardic Voice 2, Battle Rage, Duelist, Livery (red surcoat) Toughness, Unarmed Combat",
                requirements:
                "You must accuse a person of a crime on behalf of another, and then win an ensuing Judicial Combat.",
                description:
                "Once this has occurred three times, you may invest 50 crown on training and equipment and take this profession. There are many occasions where a person has been wronged, but due to fear, inability to fight, or social standing, they are unable to make an accusation on their own. In some nations (notably, Navarre) there exists a profession of litigants, who, for pay, take up the role of accuser. Traditionally, litigants wear a red surcoat called the sendal, and are famed for being rough characters, their accusations and arguments more loud than learned.")
            .WithOccupation(OccupationType.Advanced, "Master Thespian",
                "Bardic Voice 6, Master Entertainer, Income 10, News & Rumors, Scribe 2 and Information Gathering or Research",
                requirements: "Patronage, must have had the Entertainer skill in previous Occupation.",
                description:
                "Successful bards, minsters, dancers and other entertainers seek out a patron, a noble or other wealthy or connected individual who can finance their careers and help them find venues for their trade. Such master thespians are welcome guests in any noble retinue or village celebration.")
            .WithOccupation(OccupationType.Advanced, "Merchant",
                "Buy/Sell (100), Commerce, Income 20, News & Rumors, Patronage 1, Retainers 2 and choice of any one Craft 2 skill",
                requirements:
                "You must spend 300 crown to set yourself up in business. If you maintain an in game “shop” or stall this is reduced by 50 crown, and if you are member of the Shadow Guild by another 50 crown.",
                description:
                "Nowhere in Europa is truly self-sufficient. Crafters must obtain raw materials and then sell their completed wares elsewhere. Where materials are commonplace, the market sells, and where they are scarce, the market buys. The merchant is the blood of this system, buying and selling goods with a shrewd eye, while making themselves wealthy and expanding their households.")
            .WithOccupation(OccupationType.Advanced, "Miller",
                "Income 20, News & Rumors, Production (8 Food), Production (Choose one: 4 Air, 4 Water, or 3 Life), Woodworking 4",
                requirements:
                "A grant of land and the necessary supplies to build a mill, or 300 crown to purchase land on which to build a mill.",
                description:
                "In nearly every village, there is a mill, whether it be a windmill, watermill, or turned by animals. Within this mill is the millstone. This nearly-magical device grinds the grain that makes the bread that feeds lord and peasant alike. The miller gets a share of this grain, which often suffices to keep their lives comfortable, and magical power, from the ever-turning ritual of the grinding gears.")
            .WithOccupation(OccupationType.Advanced, "Miner",
                "Commerce, Engineering, Metalworking 2, Patronage 1, Production (8 Metal), Weapon Specialization (Tool), Wear Armor 3, Woodworking 2",
                requirements: "You must find a mine and spend 100 crown to develop it and obtain writs.",
                description:
                "Most mines in Europa are ancient works, pulling copper, gold, salt and many other materials from the earth. It is a dangerous trade, though lucrative.")
            .WithOccupation(OccupationType.Advanced, "Philosopher",
                "Loremaster, Production (2 Parchment), Research x2, Scribe 6, Serene Contemplation",
                requirements: "Patronage and 100 crown for books and education.",
                description:
                "The richest and most successful households are able to sponsor a philosopher, able to read and research the ancient texts and make new, educative observations of the natural world. Many philosophers have attended one of the great universities of Europa, such as Hectoria or Milan, and bring new ideas to their homelands upon their return.")
            .WithOccupation(OccupationType.Advanced, "Physician",
                "Apothecary 6, Cure Affliction, Livery (doctor’s robes), Medicine, Occupational Spells (page 126), Research, Serene Contemplation",
                requirements: "Patronage and 500 crown in training.",
                description:
                "The great universities of Europa have learned much of anatomy and physiology from the ancients, from experiment, and from necessity. At these vaunted houses of learning, the gentlefolk, herbalist, and barber surgeon are elevated to true masters of the craft of healing, capable of great feats of surgery and of furthering the understanding of the humors.")
            .WithOccupation(OccupationType.Advanced, "Pit Fighter/Judicial Champion",
                "Armstraining 4, Battle Rage, Duelist, Entertainer, Unarmed Combat, Wear Armor 3",
                requirements:
                "You must win at least 5 pit-fights (which are illegal) or 3 Judicial Combats and invest 50 crown in training and equipment.",
                description:
                "Pit fighting is illegal in many lands, but nevertheless it is a popular entertainment. On the flip side, trial by combat is common, but many people cannot fight to literally save their lives. Enter the pit fighter, or judicial champion, two sides of the sport-fighting coin. Market yourself well, and you should be able to earn a decent bit of coin through your duels and pit-fights.")
            .WithOccupation(OccupationType.Advanced, "Poacher",
                "Butcher, Pathfinding, Production (3 Cloth, 6 Food), Weapon Specialization (Bow, Normal Crossbow), Wear Armor 2, Woodwise",
                requirements: "You must be accepted into the Shadow Guild.",
                description:
                "Meat is an important source of food in often hungry Europa. However, the nobility own all the deer, all the bear, all the boar- the best meat. Regardless, there is a lucrative trade in less than legally acquired meat. This is where the poacher comes in. Quietly, they stalk illegal or merely dangerous prey to share with her fellows- or to make a profit.")
            .WithOccupation(OccupationType.Advanced, "Quarrier",
                "Duty 1 (Manual Labor), Engineering, Production (4 Earth), Toughness, Weapon Use (Two Handed Blunt), Wear Armor 1, Work Rhythm",
                requirements: "You must find a quarry and spend 100 crown to develop it and obtain writs.",
                description:
                "Mines produce the metal so critical to weapons and armor. The humble quarry, on the other hand, produces the stone which paves roads, builds houses, and fortifies castles. Productive quarry sites are rare, so what stone can be found is highly prized. Along the way, they often find magical components which can easily be traded for a fine income.")
            .WithOccupation(OccupationType.Advanced, "Ruffian",
                "Brawler, Scavenging, Toughness, Unarmed Combat, Weapon Specialization (One Handed Blunt), Wear Armor 2",
                requirements: "You must possess a Branding, and be a member of the Shadow Guild.",
                description:
                "Thugs, toughs, bravos, and brigands, ruffians are the strong spine of organized crime. Obviously intimidating and ready to fight at a moment’s notice, ruffians often have little of true value to offer society other than their fists and cudgels.")
            .WithOccupation(OccupationType.Advanced, "Sacristan",
                "Blessed, Divine Lore, Research, Scribe 2, Set Trap, Weapon Specialization (any one), Wear Armor 2, Woodworking 2",
                requirements:
                "Village must possess at least 5 relics, which are keep within a single area or safe container, and the sacristan must be elected or appointed to protect them.",
                description:
                "Villages that hold many holy relics may find that they require a dedicated guardian and researcher of those items. A sacristan also knows how to protect their charges.")
            .WithOccupation(OccupationType.Advanced, "Sawbones",
                "Apothecary 4, Cure Affliction, Livery (Apron and gloves), Medicine, Sewing 2, Weapon Specialization (Dagger)",
                requirements:
                "You must be a member of the Shadow Guild and provide 200 crown for training. If you are branded, this is reduced to 100 crown. If you previously possessed the Physician Occupation, you may waive the crown fee entirely.",
                description:
                "There are many professional barbers and doctors in the cities and towns of Europa, who heal and perform surgery on the honest population. Criminals, however, need to be fixed up quietly with few questions asked. Sawbones perform this service, and know bits of knifework that are, strictly speaking, not medicinal.")
            .WithOccupation(OccupationType.Advanced, "Sergeant at Arms/Bodyguard",
                "Armstraining 6, Income 10, Leadership (retainers and followers of your patron), Livery (patron’s colors), Wear Armor 4",
                requirements: "Patronage",
                description:
                "Nobles, magistrates, merchants, and the wealthy often find themselves the targets of violence. These folk must hire themselves guards, who can protect them when danger abounds. Whether such a person is called a bodyguard or a sergeant really depends on the style of the person being protected.")
            .WithOccupation(OccupationType.Advanced, "Sharp",
                "Bardic Voice 2, Commerce, Cosmopolitan Connections, Fortune Telling, Information Gathering, Iron Will, News & Rumors, Room for More, Unarmed Combat.",
                requirements:
                "Must win 100 crown in a single game of gambling, or 500 over a career. Subtract 100 from career winnings if a member of the Shadow Guild.",
                description:
                "Professional gamblers are a scourge in the major cities. While most gamble for entertainment, or small coin, in the higher social circles magic items, writs, and even landhold can be in the ante.")
            .WithOccupation(OccupationType.Advanced, "Steward",
                "Buy/Sell (50), Cooking 6, Commerce, Leadership (retainers and followers of your patron), Scribe 2",
                requirements: "Patronage",
                description:
                "A household is only as good as it’s steward- part cook, part secretary, the steward manages the household and purchases for their noble and the retinue.")
            .WithOccupation(OccupationType.Advanced, "Theologian",
                "Bardic Voice 2, Divine Lore, Divine Spells, Research x2, Scribe 4, Serene Contemplation",
                requirements:
                "Must be ordained by the Church, and create a scholarly or philosophical tract on the nature of each of the three gods.",
                description:
                "Theologians are those members of the Church who study the lives of the Saints and the natural world in order to find answers regarding the plans of the gods.")
            .WithOccupation(OccupationType.Advanced, "Varlet",
                "Duty 2 (fulfilling the requests of your master), Income 5, Information Gathering, Leadership (your master), Unarmed Combat and any one Craft skill 2",
                requirements:
                "50 crown for the purchases of necessary uniform and training. Must be actively employed by another character, PC or NPC, and willing to serve them in various in-game tasks.",
                description:
                "A varlet is a type of manservant whose primary task is to attend to their master's every whim, however foolish. Of course, varlet has come to be slang for a dishonest man, and many varlets have found their master's tongue getting them into the fistfights they are famous for.")
            .WithOccupation(OccupationType.Plot, "Cantor",
                "Absolution, Bardic Voice 4, Divine Lore, Divine Spells, Entertainer, Grant Karma, News & Rumors, Religious Ceremony, Serene Contemplation",
                requirements: "Must have been a bard, friar, lay cleric, or ordained priest in a previous Occupation.",
                description:
                "In larger, better organized churches, there are often songs and chants of prayer. The cantor is the priest who leads such prayers. In times of battle, they double as signallers and messengers.")
            .WithOccupation(OccupationType.Plot, "Captain of the Guard",
                "Duty 1 (reviewing the guard), Income 15, Improved Leadership (Town Guard), Livery (based on local Chapter), Patronage 1, Scribe 2, Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 5",
                requirements: "Must be appointed to the post.",
                description:
                "All guards, corporals, and gaolers in a town ultimately report to a Captain, appointed by a magistrate, mayor, or other worthy. The captain may be a guard himself, with high morals and ability, or may equally likely be a political appointee with little skill but the right connections.")
            .WithOccupation(OccupationType.Plot, "Friar",
                "Absolution, Divine Lore, Divine Spells, Grant Karma, News & Rumors, Pathfinding, Religious Ceremony",
                requirements:
                "Must have been a Lay Cleric in a previous Occupation. Must renounce wealth and live frugally.",
                description:
                "A traveling, mendicant priest, often the only priest small villages ever see, friars wander from place to place ensuring that even the meanest serf sees a member of the Church who can hear their sins and grant them Karma.")
            .WithOccupation(OccupationType.Plot, "Inquisitor",
                "Battlemage, Divine Lore, Divine Spells, Leadership (anyone under your command in battle), Livery (icons of faith), Mage Lore, Slayer (Undead), Wear Armor 3 and Information Gathering or Research",
                requirements: "Writ from the Church to practice this Occupation, 300 crown of training and equipment.",
                description:
                "The Church has different priorities than secular lords, but still has need for warriors who are less rigid than Paladins and more able to root out and eradicate the devious foes of life and light who skulk among the populace, hiding amongst the goodly people.")
            .WithOccupation(OccupationType.Plot, "Knight Paladin",
                "Absolution, Battlemage, Blessed, Divine Lore, Divine Spells, Grant Karma, Income 10, Livery (your heraldry), Religious Ceremony, Retainers 1, Wear Armor 10",
                requirements:
                "You must be a Knight Errant, Knight Penitent, or Knight Templar, or have previously possessed one of those Occupations. Further, you must have completed a Paladin’s quest for each of the three gods or be an Ordained Priest who is Knighted.",
                description:
                "Long ago, Navarre, Burgundy, the League, and great swathes of other lands were united in the throne of Charles the Great, known also as Carolus Magnus or Charlemagne. In Charlemagne's will, he left great chapter houses, fortresses, rich mills and tracts of lands to the stewardship of his favored knights. With this wealth came the understanding that they would forever work to bring humanity together. The Knights Paladin refused to swear themselves to Charlemagne's heirs, instead swearing themselves to the ideal of the Empire- that all mankind might come together beneath the rule of Law and Justice. The Knights Paladin protect those who sit on the thrones of nations as closely as they protect those who hold the holy offices of the Church. The mystical training of the Knights Paladin, as proven most clearly in their Quests of the Three Gods, gives them the education and connection to the gods necessary for absolution, and so the Church in most lands accounts the Knights Paladin as priests, even if they do not serve the Church officially.")
            .WithOccupation(OccupationType.Plot, "Knight Penitent",
                "Battlemage, Blessed, Divine Lore, Divine Spells, Income 10, Livery (your heraldry), Retainers 1, Wear Armor 8",
                requirements:
                "You must be currently or formerly a Knight Errant, who has been accepted into the service of one branch of the Church, and renounced worldly things.",
                description:
                "After several wars with the Tripartites, many knights were disillusioned by waste and lack of honor. These knights formed a new order, the Knights Penitent, giving up the wealth and splendor associated with knighthood in exchange for the nobility of sacrifice and toil. Such knights often wander, some seeking heroic ends against great odds, others simply seeking a place in the world.")
            .WithOccupation(OccupationType.Plot, "Knight of the Realm",
                "Armstraining 4, Income (50), Improved Leadership (anyone wearing your colors), Livery (Your heraldry), Patronage 3, Retainers 6, Wear Armor 8",
                requirements:
                "You must be invited to the Knights of the Realm and be a Knight Errant, Knight Paladin, Knight Penitent, or Knight Templar, or have previously possessed one of those Occupations. Further, you must be granted a fief of land by a noble or the Church.",
                description:
                "Most of the nations of Europa have a strong body of Knights of the Realm who hold the manors, organize and lead the armies, dispense justice, and otherwise comprise a lower nobility. The vast majority of the Knights of the Realm come from the ranks of the Knights Errant, having proved themselves twice- once as prospective Knights, and once as Errants.")
            .WithOccupation(OccupationType.Plot, "Knight Templar",
                "Battlemage, Leadership (any non-Knight sworn to aid you), Income 10, Livery (your heraldry), Mage Lore, Research, Retainers 1, Scribe 4, Wear Armor 6",
                requirements:
                "You must be invited to the Knights Templar. Further, you must spend 500 crown for training and outfitting.",
                description:
                "The secretive order of the Knights Templaer are scholars, warriors, and magicians dedicated to fighting the supernatural foes of civilization wherever they can be found. Many of the Knights Templar come from nontraditional sources- not all were famous warriors or honorable squires before their knighting.")
            .WithOccupation(OccupationType.Plot, "Magistrate",
                "Bardic Voice 2, Commerce, Duty 1 (holding court), Income 20, News & Rumors, Research, Retainers 3, Scribe 4",
                requirements: "Must be appointed by a noble, or elected to the post by the populace.",
                description:
                "Most manors and villages rely on their local knight or lord for justice. When a lord is distant, or too busy with other matters, they may allow a village to elect a magistrate from amongst themselves. Magistrates are largely free to enact their own edicts and enforce law as they see fit, subject to the Codes Civitas and Justinian. Magistrates who abuse their power, though, seldom last long.")
            .WithOccupation(OccupationType.Plot, "Ordained Priest",
                "Absolution, Battlemage, Divine Lore, Divine Spells, Grant Karma, Income 10, Religious Ceremony, Serene Contemplation, Weapon Specialization (your choice of One Handed Blunt, One Handed Sword, Two Handed Blunt, or Two Handed Sword) Wear Armor 4",
                requirements: "Must be ordained by the Church.",
                description:
                "The churches, shrines, monasteries and other places of holy sanctity in Europa are overseen by priests who have been appointed to them by the Church. Often former lay clerics who have found a true calling, such priests swear to uphold the tenets of the faith and serve the followers of their god.")
            .WithOccupation(OccupationType.Plot, "Tavern Master",
                "Buy/Sell 20, Cooking 2, Drinks on the House, Duty 2 (minding the tavern), Income 10, News & Rumors, Patronage, Retainers 1, Sell Drinks, Tavern Share",
                requirements:
                "You must possess the Deed to a building suitable for the housing of a Tavern. In addition, you must have kept a tavern as the Tavern Keeper profession for at least 1 year,and possess a Writ of Hospitality.",
                description:
                "A few lucky few tavern keepers find themselves successful enough, and thereby wealthy enough, to purchase their establishment from the former landlord. Such tavern masters are often among the most wealthy members of society, and are incredibly well connected to the comings and goings of their town.")
            .WithOccupation(OccupationType.Plot, "Witch Hunter",
                "Armstraining 2, Battlemage, Leadership (anyone under your command in battle), Mage Lore, Occupational Spells (page 126), Set Trap, Slayer (Daemons), Wear Armor 4 and Information Gathering or Research",
                requirements: "Writ from a Lord to practice this occupation, 300 crown of training and equipment.",
                description:
                "In a land of sorcerers, necromancers and vampires, Witch Hunters are well respected individuals indeed, and greatly sought after. A Witch Hunter’s writ is their only shield- the more powerful the lord (or Baron or Duke, etc.) who issued it, the more valuable it is, and of course the wording of the writ itself is important.")
            .WithOccupation(OccupationType.Enhancement, "Alchemist",
                "Retain your Basic Occupation, plus add Production (one Chaos or Time)",
                requirements:
                "Must have created at least ten different potions using the rules in Special Appendix Three. 50 crown for training and equipment.",
                description:
                "Masters of the subtle arts of potion making, Alchemists assist their communities through quietly making the love philtres, healing potions, and curatives that so many others need in their day to day professions. In some towns and villages, of course, the alchemist is looked on with suspicion, especially if they work with dangerous ingredients such as cinnabar or aqua regia.")
            .WithOccupation(OccupationType.Enhancement, "Barback",
                "Retain your Basic Occupation, plus add Income 5 and Sell Drinks",
                requirements:
                "Must possess or have previously possessed Brewer, Tavern Keeper, or a similar Occupation that worked in or around a tavern.",
                description:
                "There are always times when the local tavernkeep is too busy for the demand- perhaps a party is going on, or the official tavern master is bleeding in a ditch somewhere, or there are simply too many thirsty souls. Barbacks can pick up the slack while these professionals are too busy.")
            .WithOccupation(OccupationType.Enhancement, "Guild Crafter",
                "Guild Wages, Livery (guild patch and visible tools of the trade). Retain your Basic Occupation, plus add +2 Craft Points to any one Craft Skill you possess.",
                requirements:
                "You must submit an example of your skill, or present a tract or presentation on it, which must be approved by the guild. This Occupational Enhancement can only be appended to a basic Occupation, though a person with an advanced Occupation may still be a Guild Member.",
                description:
                "The cities and towns of Europa expect the craftspeople who dwell there to join a guild, to control prices and ensure that all are able to prosper by gaining business. Guilds also provide a sense of fellowship amongst crafters, and often the Guild is a powerful force amongst the populace.")
            .WithOccupation(OccupationType.Enhancement, "Master Crafter",
                "Guild Wages, Instruction, Livery (guild patch and visible tools of the trade), Masterwork, Retainer 1 Retain Basic Occupations skills, plus add +4 Craft Points to any one Craft Skill you possess.",
                requirements:
                "You must have been a Guild Crafter and must complete a masterwork acclaimed by your peers. This Advanced Occupation can only be appended to a Basic Occupation, though any character may be considered a Master Crafter of the Guild if they have proven themselves.",
                description:
                "The most successful crafters prove their skill by ascending to the rank of Guildmaster, capable of creating impressive new items and educating new guild members alike.")
            .WithOccupation(OccupationType.Enhancement, "Master Healer",
                "Retain your Basic Occupation, plus add Medicine.",
                requirements:
                "Basic Occupation must possess Cure Affliction Skill, must have access to an Apothecary Craft Kit, 100 crown to set up other necessary tools and reagents.",
                description:
                "Not everyone has the ability, opportunity or perseverance to become a doctor. These same folk, however, might be experts at applying herbs, brewing minor potions, and the like. Such people master the talents of the herbalist, hermit, folk healer, and the like, becoming skilled and famous in their small area of expertise.")
            .WithOccupation(OccupationType.Enhancement, "Town Guard Auxiliary",
                "Retain your Basic Occupation’s skills, plus Income (+5) and Livery (based on local Chapter)",
                requirements:
                "Must be accepted into the Town Guard. This Advanced Occupation can only be appended to a Basic Occupation, though a person with an Advanced Occupation can still assist the Town Guard.",
                description:
                "There are many who would see to the defense of town and village, but who possess demanding jobs or community roles that preclude them from dedicating themselves to the Guard. These civic-minded individuals can become Auxiliaries, paid by the Guard and drawn up into service as needed.")
            .Done();

        private static void LoadCraftSkills(TraitsBuilder traits) => traits
            .WithCraftSkill(CraftArea.Apothecary, "Administer Anaesthesia", CraftType.Special, 2, "None",
                description:
                "By administering soothing drugs, you provide a redraw of a failed First Aid attempt. Can only be done once per surgery attempt. May instead be used to call “Knockout” after a 10 count of role play with a willing or restrained target.")
            .Done();

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
