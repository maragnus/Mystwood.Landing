namespace Mystwood.Landing.GrpcLarp;

partial class UpdateAccountRequest
{
    public UpdateAccountRequest(SessionIdentifier session, string newValue)
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
