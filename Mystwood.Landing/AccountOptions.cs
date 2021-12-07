namespace Mystwood.Landing
{
    public class AccountOptions
    {
        public TimeSpan SignInTokenDuration { get; set; } = TimeSpan.FromMinutes(15);
    }
}