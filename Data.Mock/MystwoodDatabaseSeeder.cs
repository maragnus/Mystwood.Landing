using System;
using System.Collections.Generic;
using System.Collections.Immutable;
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

        private static string[] StringToArray(string skills)
        {
            return skills.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();
        }

        public TraitsBuilder WithTrait(Trait trait)
        {
            var traitName = trait.Name ??
                            throw new InvalidOperationException($"{nameof(Trait)}.{nameof(Trait.Name)} is required");
            var (groupName, groupRank) = ExtractName(traitName);

            _traits.Add(trait with
            {
                GroupName = groupName, GroupRank = groupRank, TraitId = ObjectId.GenerateNewId().ToString()
            });
            return this;
        }

        public static (string? groupName, int groupRank) ExtractName(string? traitName)
        {
            var parts = Regex.Match(traitName, @"^(?<name>.*) (?<rank>[\dIVX]+)(?<suffix> \([^)]+\))?$", RegexOptions.Compiled);
            var groupName = parts.Success ? $"{parts.Groups["name"].Value}{parts.Groups["suffix"].Value}".Trim() : traitName;
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
            return (groupName, groupRank);
        }

        public TraitsBuilder WithGift(string name, Action<GiftBuilder> builder)
        {
            var giftBuilder = new GiftBuilder(this, name);
            builder(giftBuilder);
            var traits = giftBuilder.ToTraits().ToList();
            _traits.AddRange(traits);

            var abilities = traits.Where(i => i.Type == TraitType.Ability).Cast<AbilityTrait>()
                .ToImmutableDictionary(i => i.TraitId!);

            Console.WriteLine();
            Console.WriteLine();
            foreach (var gift in traits.Where(i => i.Type == TraitType.Gift).Cast<GiftTrait>()
                .GroupBy((i => i.GroupName)))
            {
                Console.WriteLine("{");
                Console.WriteLine($@"  name: ""{gift.Key}"",");
                Console.WriteLine($@"  title: ""{gift.Key}"", ");
                Console.WriteLine("  properties: [\"" +
                                  string.Join("\", \"", gift.First().Properties.Select(i => i.Name)) + "\"],");
                Console.WriteLine("  levels: [");
                foreach (var level in gift.OrderBy(i => i.GroupRank))
                {
                    Console.WriteLine("  {");
                    Console.WriteLine($"    rank: {level.GroupRank},");
                    Console.WriteLine("    properties: [\"" + string.Join("\", \"", level.Properties.Select(i => i.Value)) +
                                      "\"],");
                    if (level.Abilities.Length > 0)
                    {
                        Console.WriteLine($"    abilities: [");

                        foreach (var ability in level.Abilities.Select(i => abilities[i]))
                        {
                            Console.WriteLine(
                                $"    {{ name: \"{ability.GroupName}\", rank: {ability.GroupRank}, title: \"{ability.Name}\" }},");
                        }

                        Console.WriteLine($"  ],");
                    }

                    Console.WriteLine("},");
                }

                Console.WriteLine("] },");
            }

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
            var (groupName, groupRank) = TraitsBuilder.ExtractName(name);
            
            _abilities.Add(new AbilityTrait
            {
                TraitId = ObjectId.GenerateNewId().ToString(),
                Name = name,
                Description = description,
                GroupName = groupName,
                GroupRank = groupRank
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
                Properties = _properties.ToArray(),
                GroupName = _giftBuilder.Name,
                GroupRank = _level,
            };

            foreach (var ability in _abilities)
                yield return ability;
        }
    }

    public partial class MystwoodDatabaseSeeder
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

        private static void LoadCraftSkills(TraitsBuilder traits) => traits
            .WithCraftSkill(CraftArea.Apothecary, "Administer Anaesthesia", CraftType.Special, 2, "None",
                description:
                "By administering soothing drugs, you provide a redraw of a failed First Aid attempt. Can only be done once per surgery attempt. May instead be used to call “Knockout” after a 10 count of role play with a willing or restrained target.")
            .Done();
    }
}
