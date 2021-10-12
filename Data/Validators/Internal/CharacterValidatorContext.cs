using System.Linq;
using Mystwood.Landing.Data;

namespace Mystwood.Landing.Data.Validators.Internal;


public record TraitInfo
{
    public string TraitId = "";
    public string Name = "";
    public string GroupName = "";
    public int GroupRank;
    public TraitType Type;
    public TraitAssociationType AssociationType;
}

public class CharacterValidatorContext
{
    public readonly CharacterValidationResult Result = new();
    public readonly ILookup<TraitType, TraitInfo> TraitLookup;
    public readonly Character Character;
    public readonly GiftTrait[] Gifts;
    public readonly SkillTrait[] Skills;

    public CharacterValidatorContext(Character character, ILookup<TraitType, TraitInfo> traitLookup, GiftTrait[] gifts, SkillTrait[] skills)
    {
        Character = character;
        TraitLookup = traitLookup;
        Gifts = gifts;
        Skills = skills;
    }
}
