using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using Mystwood.Landing.Data;
using Mystwood.Landing.Data.Validators.Internal;

namespace Mystwood.Landing.Data.Validators.Rules;

public class NoRedunantTraitRule : BaseCharacterValidatorRule
{
    protected override void Validate()
    {
        // The following traits do not allow redundant ranks
        ValidateRedundantTraits(Context.TraitLookup[TraitType.Ability]);
        ValidateRedundantTraits(Context.TraitLookup[TraitType.Advantage]);
        ValidateRedundantTraits(Context.TraitLookup[TraitType.Disadvantage]);
        ValidateRedundantTraits(Context.TraitLookup[TraitType.Skill]);
    }

    private void ValidateRedundantTraits(IEnumerable<TraitInfo> traits)
    {
        var redundants = traits
            .GroupBy(i => i.GroupName)
            .Where(i => i.Count() > 1);

        foreach (var trait in redundants)
            Result.Assert(() => $"Multiple {trait.First().Type} of {trait.Key} in ranks {string.Join(" and ", trait.Select(i => i.GroupRank))}");
    }
}
