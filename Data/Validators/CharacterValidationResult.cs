namespace Mystwood.Landing.Data.Validators
{
    public class CharacterValidationResult
    {
        private List<string> _messages = new();

        public override string ToString() => _messages.ToString()!;

        public bool IsSuccessful { get; private set; } = true;

        public void AssertEqual(int expected, int actual, Func<string> generateMessage)
        {
            if (expected != actual)
            {
                _messages.Add(generateMessage());
                IsSuccessful = false;
            }
        }

        internal void Assert(Func<string> generateMessage)
        {
            _messages.Add(generateMessage());
            IsSuccessful = false;
        }
    }
}
