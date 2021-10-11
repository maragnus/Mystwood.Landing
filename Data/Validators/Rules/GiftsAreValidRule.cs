namespace Mystwood.Landing.Data.Validators.Rules;

public class GiftsAreValidRule : BaseCharacterValidatorRule
{
    protected override void Validate()
    {
        var myGifts = Context.TraitLookup[TraitType.Gift];
        var hasBackstory = !string.IsNullOrWhiteSpace(Context.Character.PublicHistory);

        if (!myGifts.All(i => i.AssociationType == TraitAssociationType.Free || i.AssociationType == TraitAssociationType.Purchased))
            Result.Assert(() => "Gifts must only be Free or Purchased");
    }
}
