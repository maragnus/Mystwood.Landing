namespace Mystwood.Landing.MwlApi.Controllers;

public class ErrorDetails
{
    public ErrorDetails(string message) => ErrorMessage = message;
    public string ErrorMessage { get; set; }
}
