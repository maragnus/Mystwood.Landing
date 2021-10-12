using System.Linq;
using MongoDB.Driver;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.Data.Validators.Rules;
public class FreeTraitsContiguousRule : BaseCharacterValidatorRule
{
    protected override void Validate()
    {
        var myGifts = Context.TraitLookup[TraitType.Gift];

        // Contiguous free traits
        var gifts = myGifts
            .GroupBy(i => i.GroupName)
            .Select(i => new
            {
                GiftName = i.Key,
                AssociationTypes = i.OrderBy(i => i.GroupRank).Select(i => i.AssociationType)
            });

        foreach (var gift in gifts)
        {
            var invalid = gift.AssociationTypes
                .SkipWhile(i => i == TraitAssociationType.Free)
                .Any(i => i != TraitAssociationType.Purchased);
            if (!invalid)
                Result.Assert(() => $"All Free Gifts must appear prior to Purchased Gifts in {gift.GiftName}");
        }

        Result.AssertEqual(myGifts.Count(), Character.Level, () => $"Characer level ({Character.Level}) is expect to equal the number of gifts ({myGifts.Count()})");
    }
}
