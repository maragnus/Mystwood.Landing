using System;
using System.Collections.Generic;
using System.Text;
using Mystwood.Landing.Data.Validators.Rules;

namespace Mystwood.Landing.Data.Validators;

public class CharacterValidationResult
{
    private List<string> _messages = new();

    public override string ToString() => new StringBuilder().AppendJoin("\r\n", _messages).ToString();

    public bool IsSuccessful { get; private set; } = true;

    public BaseCharacterValidatorRule? Rule { get; set; }

    public void AssertEqual(int expected, int actual, Func<string> generateMessage)
    {
        if (expected != actual)
        {
            WriteMessage(generateMessage);
            IsSuccessful = false;
        }
    }

    public void Assert(Func<string> generateMessage)
    {
        WriteMessage(generateMessage);
        IsSuccessful = false;
    }

    private void WriteMessage(Func<string> generateMessage) =>
        _messages.Add($"{Rule?.GetType().Name} {generateMessage()}");

}
