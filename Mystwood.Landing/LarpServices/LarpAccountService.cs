using Grpc.Core;
using Microsoft.Extensions.Options;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.LarpServices;

public partial class LarpAccountService : LarpAccount.LarpAccountBase
{
    private readonly ILogger<LarpAuthenticationService> _logger;
    private readonly AccountOptions _options;
    private readonly ITokenManager _tokenManager;
    private readonly IEmailManager _emailManager;
    private readonly IUserManager _userManager;
    private readonly ICharacterManager _characterManager;
    private readonly IEventManager _eventManager;

    public LarpAccountService(ILogger<LarpAuthenticationService> logger, IEmailManager emailManager, ITokenManager tokenManager, IOptions<AccountOptions> options, IUserManager userManager, ICharacterManager characterManager, IEventManager eventManager)
    {
        _logger = logger;
        _emailManager = emailManager;
        _tokenManager = tokenManager;
        _options = options.Value;
        _userManager = userManager;
        _characterManager = characterManager;
        _eventManager = eventManager;
    }

    public override async Task<CharactersResponse> GetCharacters(BasicRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.GetCharacters(accountId);

        var response = new CharactersResponse();
        response.Characters.AddRange(characters);

        return response;
    }

    public override async Task<CharacterResponse> GetCharacter(GetCharacterRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.GetCharacter(request.CharacterId);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<CharacterResponse> UpdateCharacterDraft(UpdateCharacterRequest request, ServerCallContext context)
    {

        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.UpdateCharacterDraft(accountId, request.CharacterId, request.DraftJson);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<CharacterResponse> CreateCharacterDraft(CreateCharacterRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.CreateCharacter(accountId, request.CharacterName, request.HomeChapter);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<CharacterResponse> UpdateCharacterInReview(UpdateCharacterInReviewRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var character = await _characterManager.UpdateCharacterInReview(accountId, request.CharacterId, request.IsReview);

        return new CharacterResponse() { Character = character };
    }

    public override async Task<EventsResponse> GetEvents(BasicRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId);

        var events = await _eventManager.GetEvents(accountId);

        var response = new EventsResponse();
        response.Events.AddRange(events);

        return response;
    }
}
