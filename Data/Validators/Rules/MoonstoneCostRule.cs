using MongoDB.Driver;
using Mystwood.Landing.Data.Validators.Internal;

namespace Mystwood.Landing.Data.Validators.Rules;

public class MoonstoneCostRule : BaseCharacterValidatorRule
{
    protected override void Validate()
    {
        // Gifts cost the character's level, the first 5 or 6 levels are free
        var startingLevel = string.IsNullOrWhiteSpace(Context.Character.PublicHistory) ? 5 : 6;
        var currentLevel = Context.TraitLookup[TraitType.Gift].Count();
        var giftCost = Constants.LevelCost(startingLevel, currentLevel);

        // Skills cost their Cost, +1 for each purchased skill after the first
        var skills =
            from trait in Context.TraitLookup[TraitType.Skill]
            join skill in Context.Skills on trait.TraitId equals skill.TraitId
            where isPurchased(trait)
            select skill.Cost;
        var skillCost = skills.DefaultIfEmpty(0).Sum() ?? 0 + skills.Count() - 1;

        // The total cost is all skills minus skill tokens
        var totalCost = giftCost + skillCost - Context.Character.SkillTokens;

        Result.AssertEqual(Context.Character.MoonstoneSpent, totalCost, () => $"Moonstone cost of {Context.Character.MoonstoneSpent} does not match purchased traits at {totalCost}");

        bool isPurchased(TraitInfo traitInfo) => traitInfo.AssociationType == TraitAssociationType.Purchased;
    }
}
