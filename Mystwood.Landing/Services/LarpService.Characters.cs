using Grpc.Core;
using Mystwood.Landing.GrpcLarp;

namespace Mystwood.Landing.Services;

partial class LarpService
{
    public override async Task<GetCharactersResponse> GetCharacters(GetCharactersRequest request, ServerCallContext context)
    {
        var accountId = await _userManager.VerifySessionId(request.Session.SessionId) ??
            throw new Exception("Unauthorized");

        var characters = await _characterManager.GetCharacters(accountId);

        var response = new GetCharactersResponse();
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
}
