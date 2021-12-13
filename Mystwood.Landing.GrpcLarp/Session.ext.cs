namespace Mystwood.Landing.GrpcLarp;

partial class UpdateProfileRequest
{
    public UpdateProfileRequest(SessionIdentifier session, string newValue)
    {
        this.Session = session;
        this.Value = newValue;
    }
}

partial class SessionIdentifier
{
    public SessionIdentifier(string sessionId)
    {
        SessionId = sessionId;
    }
}

partial class Character
{
    public int AccountId { get; set; }
}
