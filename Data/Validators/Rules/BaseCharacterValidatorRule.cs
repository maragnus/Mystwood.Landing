using Mystwood.Landing.Data;
using Mystwood.Landing.Data.Validators.Internal;

namespace Mystwood.Landing.Data.Validators.Rules;

public abstract class BaseCharacterValidatorRule
{
    protected CharacterValidatorContext Context { get; private set; } = null!;
    protected CharacterValidationResult Result => Context.Result;
    protected Character Character => Context.Character;

    public void Validate(CharacterValidatorContext context)
    {
        this.Context = context;
        context.Result.Rule = this;
        Validate();
        context.Result.Rule = null;
    }

    protected abstract void Validate();
}
