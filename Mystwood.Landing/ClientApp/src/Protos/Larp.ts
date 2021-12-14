/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "larp";

export enum ValidationResponseCode {
  SUCCESS = 0,
  EXPIRED = 1,
  INVALID = 2,
  UNRECOGNIZED = -1,
}

export function validationResponseCodeFromJSON(
  object: any
): ValidationResponseCode {
  switch (object) {
    case 0:
    case "SUCCESS":
      return ValidationResponseCode.SUCCESS;
    case 1:
    case "EXPIRED":
      return ValidationResponseCode.EXPIRED;
    case 2:
    case "INVALID":
      return ValidationResponseCode.INVALID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidationResponseCode.UNRECOGNIZED;
  }
}

export function validationResponseCodeToJSON(
  object: ValidationResponseCode
): string {
  switch (object) {
    case ValidationResponseCode.SUCCESS:
      return "SUCCESS";
    case ValidationResponseCode.EXPIRED:
      return "EXPIRED";
    case ValidationResponseCode.INVALID:
      return "INVALID";
    default:
      return "UNKNOWN";
  }
}

export interface ProfileEmail {
  email: string;
  verified: boolean;
}

export interface Profile {
  accountId: number;
  name: string;
  location: string;
  emails: ProfileEmail[];
  phone: string;
  isAdmin: boolean;
  characters: CharacterSummary[];
}

export interface Character {
  characterId: string;
  liveJson: string;
  isLive: boolean;
  draftJson: string;
  isReview: boolean;
  metadata: string;
}

export interface CharacterSummary {
  accountId: number;
  accountName: string;
  characterId: string;
  characterName: string;
  homeChapter: string;
  specialty: string;
  level: number;
  isLive: boolean;
  isReview: boolean;
}

export interface SessionIdentifier {
  sessionId: string;
}

export interface InitiateLoginRequest {
  email: string;
}

export interface InitiateLoginResponse {
  statusCode: ValidationResponseCode;
  message: string;
}

export interface ConfirmLoginRequest {
  email: string;
  code: string;
}

export interface ConfirmLoginResponse {
  session?: SessionIdentifier;
  statusCode: ValidationResponseCode;
  message: string;
  profile?: Profile;
}

export interface UpdateProfileRequest {
  session?: SessionIdentifier;
  value: string;
}

export interface UpdateProfileResponse {
  profile?: Profile;
}

export interface GetProfileRequest {
  session?: SessionIdentifier;
}

export interface GetProfileResponse {
  profile?: Profile;
}

export interface GetCharactersRequest {
  session?: SessionIdentifier;
}

export interface GetCharactersResponse {
  characters: CharacterSummary[];
}

export interface CreateCharacterRequest {
  session?: SessionIdentifier;
  characterName: string;
  homeChapter: string;
}

export interface UpdateCharacterRequest {
  session?: SessionIdentifier;
  characterId: string;
  draftJson: string;
}

export interface UpdateCharacterInReviewRequest {
  session?: SessionIdentifier;
  characterId: string;
  isReview: boolean;
}

export interface GetCharacterRequest {
  session?: SessionIdentifier;
  characterId: string;
}

export interface CharacterResponse {
  character?: Character;
}

export interface GetAccountRequest {
  session?: SessionIdentifier;
  accountId: number;
}

export interface GetAccountResponse {
  profile?: Profile;
}

export interface SearchAccountsRequest {
  session?: SessionIdentifier;
  query: string;
}

export interface SearchAccountsResponse {
  profiles: Profile[];
}

export interface SetAdminRequest {
  session?: SessionIdentifier;
  accountId: number;
  isAdmin: boolean;
}

export interface SetAdminResponse {
  profile?: Profile;
}

export interface SearchCharactersRequest {
  session?: SessionIdentifier;
  query: string;
}

export interface SearchCharactersResponse {
  characters: CharacterSummary[];
}

const baseProfileEmail: object = { email: "", verified: false };

export const ProfileEmail = {
  encode(
    message: ProfileEmail,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.verified === true) {
      writer.uint32(16).bool(message.verified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProfileEmail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProfileEmail } as ProfileEmail;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.verified = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProfileEmail {
    const message = { ...baseProfileEmail } as ProfileEmail;
    message.email =
      object.email !== undefined && object.email !== null
        ? String(object.email)
        : "";
    message.verified =
      object.verified !== undefined && object.verified !== null
        ? Boolean(object.verified)
        : false;
    return message;
  },

  toJSON(message: ProfileEmail): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.verified !== undefined && (obj.verified = message.verified);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProfileEmail>, I>>(
    object: I
  ): ProfileEmail {
    const message = { ...baseProfileEmail } as ProfileEmail;
    message.email = object.email ?? "";
    message.verified = object.verified ?? false;
    return message;
  },
};

const baseProfile: object = {
  accountId: 0,
  name: "",
  location: "",
  phone: "",
  isAdmin: false,
};

export const Profile = {
  encode(
    message: Profile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountId !== 0) {
      writer.uint32(8).int32(message.accountId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.location !== "") {
      writer.uint32(26).string(message.location);
    }
    for (const v of message.emails) {
      ProfileEmail.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.phone !== "") {
      writer.uint32(42).string(message.phone);
    }
    if (message.isAdmin === true) {
      writer.uint32(48).bool(message.isAdmin);
    }
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Profile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProfile } as Profile;
    message.emails = [];
    message.characters = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.location = reader.string();
          break;
        case 4:
          message.emails.push(ProfileEmail.decode(reader, reader.uint32()));
          break;
        case 5:
          message.phone = reader.string();
          break;
        case 6:
          message.isAdmin = reader.bool();
          break;
        case 7:
          message.characters.push(
            CharacterSummary.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Profile {
    const message = { ...baseProfile } as Profile;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.location =
      object.location !== undefined && object.location !== null
        ? String(object.location)
        : "";
    message.emails = (object.emails ?? []).map((e: any) =>
      ProfileEmail.fromJSON(e)
    );
    message.phone =
      object.phone !== undefined && object.phone !== null
        ? String(object.phone)
        : "";
    message.isAdmin =
      object.isAdmin !== undefined && object.isAdmin !== null
        ? Boolean(object.isAdmin)
        : false;
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Profile): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.name !== undefined && (obj.name = message.name);
    message.location !== undefined && (obj.location = message.location);
    if (message.emails) {
      obj.emails = message.emails.map((e) =>
        e ? ProfileEmail.toJSON(e) : undefined
      );
    } else {
      obj.emails = [];
    }
    message.phone !== undefined && (obj.phone = message.phone);
    message.isAdmin !== undefined && (obj.isAdmin = message.isAdmin);
    if (message.characters) {
      obj.characters = message.characters.map((e) =>
        e ? CharacterSummary.toJSON(e) : undefined
      );
    } else {
      obj.characters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Profile>, I>>(object: I): Profile {
    const message = { ...baseProfile } as Profile;
    message.accountId = object.accountId ?? 0;
    message.name = object.name ?? "";
    message.location = object.location ?? "";
    message.emails =
      object.emails?.map((e) => ProfileEmail.fromPartial(e)) || [];
    message.phone = object.phone ?? "";
    message.isAdmin = object.isAdmin ?? false;
    message.characters =
      object.characters?.map((e) => CharacterSummary.fromPartial(e)) || [];
    return message;
  },
};

const baseCharacter: object = {
  characterId: "",
  liveJson: "",
  isLive: false,
  draftJson: "",
  isReview: false,
  metadata: "",
};

export const Character = {
  encode(
    message: Character,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.characterId !== "") {
      writer.uint32(10).string(message.characterId);
    }
    if (message.liveJson !== "") {
      writer.uint32(18).string(message.liveJson);
    }
    if (message.isLive === true) {
      writer.uint32(24).bool(message.isLive);
    }
    if (message.draftJson !== "") {
      writer.uint32(34).string(message.draftJson);
    }
    if (message.isReview === true) {
      writer.uint32(40).bool(message.isReview);
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Character {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCharacter } as Character;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characterId = reader.string();
          break;
        case 2:
          message.liveJson = reader.string();
          break;
        case 3:
          message.isLive = reader.bool();
          break;
        case 4:
          message.draftJson = reader.string();
          break;
        case 5:
          message.isReview = reader.bool();
          break;
        case 6:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Character {
    const message = { ...baseCharacter } as Character;
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    message.liveJson =
      object.liveJson !== undefined && object.liveJson !== null
        ? String(object.liveJson)
        : "";
    message.isLive =
      object.isLive !== undefined && object.isLive !== null
        ? Boolean(object.isLive)
        : false;
    message.draftJson =
      object.draftJson !== undefined && object.draftJson !== null
        ? String(object.draftJson)
        : "";
    message.isReview =
      object.isReview !== undefined && object.isReview !== null
        ? Boolean(object.isReview)
        : false;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    return message;
  },

  toJSON(message: Character): unknown {
    const obj: any = {};
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    message.liveJson !== undefined && (obj.liveJson = message.liveJson);
    message.isLive !== undefined && (obj.isLive = message.isLive);
    message.draftJson !== undefined && (obj.draftJson = message.draftJson);
    message.isReview !== undefined && (obj.isReview = message.isReview);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Character>, I>>(
    object: I
  ): Character {
    const message = { ...baseCharacter } as Character;
    message.characterId = object.characterId ?? "";
    message.liveJson = object.liveJson ?? "";
    message.isLive = object.isLive ?? false;
    message.draftJson = object.draftJson ?? "";
    message.isReview = object.isReview ?? false;
    message.metadata = object.metadata ?? "";
    return message;
  },
};

const baseCharacterSummary: object = {
  accountId: 0,
  accountName: "",
  characterId: "",
  characterName: "",
  homeChapter: "",
  specialty: "",
  level: 0,
  isLive: false,
  isReview: false,
};

export const CharacterSummary = {
  encode(
    message: CharacterSummary,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountId !== 0) {
      writer.uint32(8).int32(message.accountId);
    }
    if (message.accountName !== "") {
      writer.uint32(18).string(message.accountName);
    }
    if (message.characterId !== "") {
      writer.uint32(26).string(message.characterId);
    }
    if (message.characterName !== "") {
      writer.uint32(34).string(message.characterName);
    }
    if (message.homeChapter !== "") {
      writer.uint32(42).string(message.homeChapter);
    }
    if (message.specialty !== "") {
      writer.uint32(50).string(message.specialty);
    }
    if (message.level !== 0) {
      writer.uint32(56).int32(message.level);
    }
    if (message.isLive === true) {
      writer.uint32(64).bool(message.isLive);
    }
    if (message.isReview === true) {
      writer.uint32(72).bool(message.isReview);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CharacterSummary {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCharacterSummary } as CharacterSummary;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.int32();
          break;
        case 2:
          message.accountName = reader.string();
          break;
        case 3:
          message.characterId = reader.string();
          break;
        case 4:
          message.characterName = reader.string();
          break;
        case 5:
          message.homeChapter = reader.string();
          break;
        case 6:
          message.specialty = reader.string();
          break;
        case 7:
          message.level = reader.int32();
          break;
        case 8:
          message.isLive = reader.bool();
          break;
        case 9:
          message.isReview = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CharacterSummary {
    const message = { ...baseCharacterSummary } as CharacterSummary;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
    message.accountName =
      object.accountName !== undefined && object.accountName !== null
        ? String(object.accountName)
        : "";
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    message.characterName =
      object.characterName !== undefined && object.characterName !== null
        ? String(object.characterName)
        : "";
    message.homeChapter =
      object.homeChapter !== undefined && object.homeChapter !== null
        ? String(object.homeChapter)
        : "";
    message.specialty =
      object.specialty !== undefined && object.specialty !== null
        ? String(object.specialty)
        : "";
    message.level =
      object.level !== undefined && object.level !== null
        ? Number(object.level)
        : 0;
    message.isLive =
      object.isLive !== undefined && object.isLive !== null
        ? Boolean(object.isLive)
        : false;
    message.isReview =
      object.isReview !== undefined && object.isReview !== null
        ? Boolean(object.isReview)
        : false;
    return message;
  },

  toJSON(message: CharacterSummary): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.accountName !== undefined &&
      (obj.accountName = message.accountName);
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    message.characterName !== undefined &&
      (obj.characterName = message.characterName);
    message.homeChapter !== undefined &&
      (obj.homeChapter = message.homeChapter);
    message.specialty !== undefined && (obj.specialty = message.specialty);
    message.level !== undefined && (obj.level = message.level);
    message.isLive !== undefined && (obj.isLive = message.isLive);
    message.isReview !== undefined && (obj.isReview = message.isReview);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CharacterSummary>, I>>(
    object: I
  ): CharacterSummary {
    const message = { ...baseCharacterSummary } as CharacterSummary;
    message.accountId = object.accountId ?? 0;
    message.accountName = object.accountName ?? "";
    message.characterId = object.characterId ?? "";
    message.characterName = object.characterName ?? "";
    message.homeChapter = object.homeChapter ?? "";
    message.specialty = object.specialty ?? "";
    message.level = object.level ?? 0;
    message.isLive = object.isLive ?? false;
    message.isReview = object.isReview ?? false;
    return message;
  },
};

const baseSessionIdentifier: object = { sessionId: "" };

export const SessionIdentifier = {
  encode(
    message: SessionIdentifier,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionIdentifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionIdentifier } as SessionIdentifier;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionIdentifier {
    const message = { ...baseSessionIdentifier } as SessionIdentifier;
    message.sessionId =
      object.sessionId !== undefined && object.sessionId !== null
        ? String(object.sessionId)
        : "";
    return message;
  },

  toJSON(message: SessionIdentifier): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SessionIdentifier>, I>>(
    object: I
  ): SessionIdentifier {
    const message = { ...baseSessionIdentifier } as SessionIdentifier;
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

const baseInitiateLoginRequest: object = { email: "" };

export const InitiateLoginRequest = {
  encode(
    message: InitiateLoginRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InitiateLoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInitiateLoginRequest } as InitiateLoginRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InitiateLoginRequest {
    const message = { ...baseInitiateLoginRequest } as InitiateLoginRequest;
    message.email =
      object.email !== undefined && object.email !== null
        ? String(object.email)
        : "";
    return message;
  },

  toJSON(message: InitiateLoginRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InitiateLoginRequest>, I>>(
    object: I
  ): InitiateLoginRequest {
    const message = { ...baseInitiateLoginRequest } as InitiateLoginRequest;
    message.email = object.email ?? "";
    return message;
  },
};

const baseInitiateLoginResponse: object = { statusCode: 0, message: "" };

export const InitiateLoginResponse = {
  encode(
    message: InitiateLoginResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.statusCode !== 0) {
      writer.uint32(8).int32(message.statusCode);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InitiateLoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInitiateLoginResponse } as InitiateLoginResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statusCode = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InitiateLoginResponse {
    const message = { ...baseInitiateLoginResponse } as InitiateLoginResponse;
    message.statusCode =
      object.statusCode !== undefined && object.statusCode !== null
        ? validationResponseCodeFromJSON(object.statusCode)
        : 0;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : "";
    return message;
  },

  toJSON(message: InitiateLoginResponse): unknown {
    const obj: any = {};
    message.statusCode !== undefined &&
      (obj.statusCode = validationResponseCodeToJSON(message.statusCode));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InitiateLoginResponse>, I>>(
    object: I
  ): InitiateLoginResponse {
    const message = { ...baseInitiateLoginResponse } as InitiateLoginResponse;
    message.statusCode = object.statusCode ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

const baseConfirmLoginRequest: object = { email: "", code: "" };

export const ConfirmLoginRequest = {
  encode(
    message: ConfirmLoginRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfirmLoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConfirmLoginRequest } as ConfirmLoginRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.code = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfirmLoginRequest {
    const message = { ...baseConfirmLoginRequest } as ConfirmLoginRequest;
    message.email =
      object.email !== undefined && object.email !== null
        ? String(object.email)
        : "";
    message.code =
      object.code !== undefined && object.code !== null
        ? String(object.code)
        : "";
    return message;
  },

  toJSON(message: ConfirmLoginRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.code !== undefined && (obj.code = message.code);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfirmLoginRequest>, I>>(
    object: I
  ): ConfirmLoginRequest {
    const message = { ...baseConfirmLoginRequest } as ConfirmLoginRequest;
    message.email = object.email ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

const baseConfirmLoginResponse: object = { statusCode: 0, message: "" };

export const ConfirmLoginResponse = {
  encode(
    message: ConfirmLoginResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.statusCode !== 0) {
      writer.uint32(16).int32(message.statusCode);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConfirmLoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConfirmLoginResponse } as ConfirmLoginResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.statusCode = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        case 4:
          message.profile = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfirmLoginResponse {
    const message = { ...baseConfirmLoginResponse } as ConfirmLoginResponse;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.statusCode =
      object.statusCode !== undefined && object.statusCode !== null
        ? validationResponseCodeFromJSON(object.statusCode)
        : 0;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : "";
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: ConfirmLoginResponse): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.statusCode !== undefined &&
      (obj.statusCode = validationResponseCodeToJSON(message.statusCode));
    message.message !== undefined && (obj.message = message.message);
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Profile.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfirmLoginResponse>, I>>(
    object: I
  ): ConfirmLoginResponse {
    const message = { ...baseConfirmLoginResponse } as ConfirmLoginResponse;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.statusCode = object.statusCode ?? 0;
    message.message = object.message ?? "";
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseUpdateProfileRequest: object = { value: "" };

export const UpdateProfileRequest = {
  encode(
    message: UpdateProfileRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProfileRequest } as UpdateProfileRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProfileRequest {
    const message = { ...baseUpdateProfileRequest } as UpdateProfileRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.value =
      object.value !== undefined && object.value !== null
        ? String(object.value)
        : "";
    return message;
  },

  toJSON(message: UpdateProfileRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateProfileRequest>, I>>(
    object: I
  ): UpdateProfileRequest {
    const message = { ...baseUpdateProfileRequest } as UpdateProfileRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.value = object.value ?? "";
    return message;
  },
};

const baseUpdateProfileResponse: object = {};

export const UpdateProfileResponse = {
  encode(
    message: UpdateProfileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateProfileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProfileResponse } as UpdateProfileResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProfileResponse {
    const message = { ...baseUpdateProfileResponse } as UpdateProfileResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProfileResponse): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Profile.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateProfileResponse>, I>>(
    object: I
  ): UpdateProfileResponse {
    const message = { ...baseUpdateProfileResponse } as UpdateProfileResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseGetProfileRequest: object = {};

export const GetProfileRequest = {
  encode(
    message: GetProfileRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProfileRequest } as GetProfileRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProfileRequest {
    const message = { ...baseGetProfileRequest } as GetProfileRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    return message;
  },

  toJSON(message: GetProfileRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProfileRequest>, I>>(
    object: I
  ): GetProfileRequest {
    const message = { ...baseGetProfileRequest } as GetProfileRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    return message;
  },
};

const baseGetProfileResponse: object = {};

export const GetProfileResponse = {
  encode(
    message: GetProfileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProfileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProfileResponse } as GetProfileResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProfileResponse {
    const message = { ...baseGetProfileResponse } as GetProfileResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: GetProfileResponse): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Profile.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProfileResponse>, I>>(
    object: I
  ): GetProfileResponse {
    const message = { ...baseGetProfileResponse } as GetProfileResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseGetCharactersRequest: object = {};

export const GetCharactersRequest = {
  encode(
    message: GetCharactersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCharactersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCharactersRequest } as GetCharactersRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCharactersRequest {
    const message = { ...baseGetCharactersRequest } as GetCharactersRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    return message;
  },

  toJSON(message: GetCharactersRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCharactersRequest>, I>>(
    object: I
  ): GetCharactersRequest {
    const message = { ...baseGetCharactersRequest } as GetCharactersRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    return message;
  },
};

const baseGetCharactersResponse: object = {};

export const GetCharactersResponse = {
  encode(
    message: GetCharactersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCharactersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCharactersResponse } as GetCharactersResponse;
    message.characters = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characters.push(
            CharacterSummary.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCharactersResponse {
    const message = { ...baseGetCharactersResponse } as GetCharactersResponse;
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetCharactersResponse): unknown {
    const obj: any = {};
    if (message.characters) {
      obj.characters = message.characters.map((e) =>
        e ? CharacterSummary.toJSON(e) : undefined
      );
    } else {
      obj.characters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCharactersResponse>, I>>(
    object: I
  ): GetCharactersResponse {
    const message = { ...baseGetCharactersResponse } as GetCharactersResponse;
    message.characters =
      object.characters?.map((e) => CharacterSummary.fromPartial(e)) || [];
    return message;
  },
};

const baseCreateCharacterRequest: object = {
  characterName: "",
  homeChapter: "",
};

export const CreateCharacterRequest = {
  encode(
    message: CreateCharacterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.characterName !== "") {
      writer.uint32(18).string(message.characterName);
    }
    if (message.homeChapter !== "") {
      writer.uint32(26).string(message.homeChapter);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateCharacterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateCharacterRequest } as CreateCharacterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.characterName = reader.string();
          break;
        case 3:
          message.homeChapter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCharacterRequest {
    const message = { ...baseCreateCharacterRequest } as CreateCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.characterName =
      object.characterName !== undefined && object.characterName !== null
        ? String(object.characterName)
        : "";
    message.homeChapter =
      object.homeChapter !== undefined && object.homeChapter !== null
        ? String(object.homeChapter)
        : "";
    return message;
  },

  toJSON(message: CreateCharacterRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.characterName !== undefined &&
      (obj.characterName = message.characterName);
    message.homeChapter !== undefined &&
      (obj.homeChapter = message.homeChapter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateCharacterRequest>, I>>(
    object: I
  ): CreateCharacterRequest {
    const message = { ...baseCreateCharacterRequest } as CreateCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.characterName = object.characterName ?? "";
    message.homeChapter = object.homeChapter ?? "";
    return message;
  },
};

const baseUpdateCharacterRequest: object = { characterId: "", draftJson: "" };

export const UpdateCharacterRequest = {
  encode(
    message: UpdateCharacterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.characterId !== "") {
      writer.uint32(18).string(message.characterId);
    }
    if (message.draftJson !== "") {
      writer.uint32(26).string(message.draftJson);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateCharacterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateCharacterRequest } as UpdateCharacterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.characterId = reader.string();
          break;
        case 3:
          message.draftJson = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCharacterRequest {
    const message = { ...baseUpdateCharacterRequest } as UpdateCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    message.draftJson =
      object.draftJson !== undefined && object.draftJson !== null
        ? String(object.draftJson)
        : "";
    return message;
  },

  toJSON(message: UpdateCharacterRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    message.draftJson !== undefined && (obj.draftJson = message.draftJson);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateCharacterRequest>, I>>(
    object: I
  ): UpdateCharacterRequest {
    const message = { ...baseUpdateCharacterRequest } as UpdateCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.characterId = object.characterId ?? "";
    message.draftJson = object.draftJson ?? "";
    return message;
  },
};

const baseUpdateCharacterInReviewRequest: object = {
  characterId: "",
  isReview: false,
};

export const UpdateCharacterInReviewRequest = {
  encode(
    message: UpdateCharacterInReviewRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.characterId !== "") {
      writer.uint32(18).string(message.characterId);
    }
    if (message.isReview === true) {
      writer.uint32(24).bool(message.isReview);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateCharacterInReviewRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateCharacterInReviewRequest,
    } as UpdateCharacterInReviewRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.characterId = reader.string();
          break;
        case 3:
          message.isReview = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCharacterInReviewRequest {
    const message = {
      ...baseUpdateCharacterInReviewRequest,
    } as UpdateCharacterInReviewRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    message.isReview =
      object.isReview !== undefined && object.isReview !== null
        ? Boolean(object.isReview)
        : false;
    return message;
  },

  toJSON(message: UpdateCharacterInReviewRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    message.isReview !== undefined && (obj.isReview = message.isReview);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateCharacterInReviewRequest>, I>>(
    object: I
  ): UpdateCharacterInReviewRequest {
    const message = {
      ...baseUpdateCharacterInReviewRequest,
    } as UpdateCharacterInReviewRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.characterId = object.characterId ?? "";
    message.isReview = object.isReview ?? false;
    return message;
  },
};

const baseGetCharacterRequest: object = { characterId: "" };

export const GetCharacterRequest = {
  encode(
    message: GetCharacterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.characterId !== "") {
      writer.uint32(18).string(message.characterId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCharacterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCharacterRequest } as GetCharacterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.characterId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCharacterRequest {
    const message = { ...baseGetCharacterRequest } as GetCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    return message;
  },

  toJSON(message: GetCharacterRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCharacterRequest>, I>>(
    object: I
  ): GetCharacterRequest {
    const message = { ...baseGetCharacterRequest } as GetCharacterRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.characterId = object.characterId ?? "";
    return message;
  },
};

const baseCharacterResponse: object = {};

export const CharacterResponse = {
  encode(
    message: CharacterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.character !== undefined) {
      Character.encode(message.character, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CharacterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCharacterResponse } as CharacterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.character = Character.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CharacterResponse {
    const message = { ...baseCharacterResponse } as CharacterResponse;
    message.character =
      object.character !== undefined && object.character !== null
        ? Character.fromJSON(object.character)
        : undefined;
    return message;
  },

  toJSON(message: CharacterResponse): unknown {
    const obj: any = {};
    message.character !== undefined &&
      (obj.character = message.character
        ? Character.toJSON(message.character)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CharacterResponse>, I>>(
    object: I
  ): CharacterResponse {
    const message = { ...baseCharacterResponse } as CharacterResponse;
    message.character =
      object.character !== undefined && object.character !== null
        ? Character.fromPartial(object.character)
        : undefined;
    return message;
  },
};

const baseGetAccountRequest: object = { accountId: 0 };

export const GetAccountRequest = {
  encode(
    message: GetAccountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.accountId !== 0) {
      writer.uint32(16).int32(message.accountId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.accountId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAccountRequest {
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
    return message;
  },

  toJSON(message: GetAccountRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAccountRequest>, I>>(
    object: I
  ): GetAccountRequest {
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.accountId = object.accountId ?? 0;
    return message;
  },
};

const baseGetAccountResponse: object = {};

export const GetAccountResponse = {
  encode(
    message: GetAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAccountResponse {
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: GetAccountResponse): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Profile.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAccountResponse>, I>>(
    object: I
  ): GetAccountResponse {
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseSearchAccountsRequest: object = { query: "" };

export const SearchAccountsRequest = {
  encode(
    message: SearchAccountsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.query !== "") {
      writer.uint32(18).string(message.query);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SearchAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchAccountsRequest } as SearchAccountsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchAccountsRequest {
    const message = { ...baseSearchAccountsRequest } as SearchAccountsRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? String(object.query)
        : "";
    return message;
  },

  toJSON(message: SearchAccountsRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.query !== undefined && (obj.query = message.query);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchAccountsRequest>, I>>(
    object: I
  ): SearchAccountsRequest {
    const message = { ...baseSearchAccountsRequest } as SearchAccountsRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.query = object.query ?? "";
    return message;
  },
};

const baseSearchAccountsResponse: object = {};

export const SearchAccountsResponse = {
  encode(
    message: SearchAccountsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.profiles) {
      Profile.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SearchAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchAccountsResponse } as SearchAccountsResponse;
    message.profiles = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profiles.push(Profile.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchAccountsResponse {
    const message = { ...baseSearchAccountsResponse } as SearchAccountsResponse;
    message.profiles = (object.profiles ?? []).map((e: any) =>
      Profile.fromJSON(e)
    );
    return message;
  },

  toJSON(message: SearchAccountsResponse): unknown {
    const obj: any = {};
    if (message.profiles) {
      obj.profiles = message.profiles.map((e) =>
        e ? Profile.toJSON(e) : undefined
      );
    } else {
      obj.profiles = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchAccountsResponse>, I>>(
    object: I
  ): SearchAccountsResponse {
    const message = { ...baseSearchAccountsResponse } as SearchAccountsResponse;
    message.profiles =
      object.profiles?.map((e) => Profile.fromPartial(e)) || [];
    return message;
  },
};

const baseSetAdminRequest: object = { accountId: 0, isAdmin: false };

export const SetAdminRequest = {
  encode(
    message: SetAdminRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.accountId !== 0) {
      writer.uint32(16).int32(message.accountId);
    }
    if (message.isAdmin === true) {
      writer.uint32(24).bool(message.isAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetAdminRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSetAdminRequest } as SetAdminRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.accountId = reader.int32();
          break;
        case 3:
          message.isAdmin = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAdminRequest {
    const message = { ...baseSetAdminRequest } as SetAdminRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
    message.isAdmin =
      object.isAdmin !== undefined && object.isAdmin !== null
        ? Boolean(object.isAdmin)
        : false;
    return message;
  },

  toJSON(message: SetAdminRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.isAdmin !== undefined && (obj.isAdmin = message.isAdmin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAdminRequest>, I>>(
    object: I
  ): SetAdminRequest {
    const message = { ...baseSetAdminRequest } as SetAdminRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.accountId = object.accountId ?? 0;
    message.isAdmin = object.isAdmin ?? false;
    return message;
  },
};

const baseSetAdminResponse: object = {};

export const SetAdminResponse = {
  encode(
    message: SetAdminResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSetAdminResponse } as SetAdminResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAdminResponse {
    const message = { ...baseSetAdminResponse } as SetAdminResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: SetAdminResponse): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Profile.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAdminResponse>, I>>(
    object: I
  ): SetAdminResponse {
    const message = { ...baseSetAdminResponse } as SetAdminResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Profile.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseSearchCharactersRequest: object = { query: "" };

export const SearchCharactersRequest = {
  encode(
    message: SearchCharactersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.query !== "") {
      writer.uint32(18).string(message.query);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SearchCharactersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSearchCharactersRequest,
    } as SearchCharactersRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchCharactersRequest {
    const message = {
      ...baseSearchCharactersRequest,
    } as SearchCharactersRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? String(object.query)
        : "";
    return message;
  },

  toJSON(message: SearchCharactersRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.query !== undefined && (obj.query = message.query);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchCharactersRequest>, I>>(
    object: I
  ): SearchCharactersRequest {
    const message = {
      ...baseSearchCharactersRequest,
    } as SearchCharactersRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.query = object.query ?? "";
    return message;
  },
};

const baseSearchCharactersResponse: object = {};

export const SearchCharactersResponse = {
  encode(
    message: SearchCharactersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SearchCharactersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSearchCharactersResponse,
    } as SearchCharactersResponse;
    message.characters = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characters.push(
            CharacterSummary.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchCharactersResponse {
    const message = {
      ...baseSearchCharactersResponse,
    } as SearchCharactersResponse;
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: SearchCharactersResponse): unknown {
    const obj: any = {};
    if (message.characters) {
      obj.characters = message.characters.map((e) =>
        e ? CharacterSummary.toJSON(e) : undefined
      );
    } else {
      obj.characters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchCharactersResponse>, I>>(
    object: I
  ): SearchCharactersResponse {
    const message = {
      ...baseSearchCharactersResponse,
    } as SearchCharactersResponse;
    message.characters =
      object.characters?.map((e) => CharacterSummary.fromPartial(e)) || [];
    return message;
  },
};

export interface Larp {
  InitiateLogin(
    request: DeepPartial<InitiateLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<InitiateLoginResponse>;
  ConfirmLogin(
    request: DeepPartial<ConfirmLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<ConfirmLoginResponse>;
  GetProfile(
    request: DeepPartial<GetProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetProfileResponse>;
  SetProfileName(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse>;
  SetProfileLocation(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse>;
  SetProfilePhone(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse>;
  AddProfileEmail(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse>;
  RemoveProfileEmail(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse>;
  GetCharacters(
    request: DeepPartial<GetCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetCharactersResponse>;
  GetCharacter(
    request: DeepPartial<GetCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse>;
  CreateCharacterDraft(
    request: DeepPartial<CreateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse>;
  UpdateCharacterDraft(
    request: DeepPartial<UpdateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse>;
  UpdateCharacterInReview(
    request: DeepPartial<UpdateCharacterInReviewRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse>;
  GetAccount(
    request: DeepPartial<GetAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetAccountResponse>;
  SearchAccounts(
    request: DeepPartial<SearchAccountsRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchAccountsResponse>;
  SetAdmin(
    request: DeepPartial<SetAdminRequest>,
    metadata?: grpc.Metadata
  ): Promise<SetAdminResponse>;
  SearchCharacters(
    request: DeepPartial<SearchCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchCharactersResponse>;
}

export class LarpClientImpl implements Larp {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InitiateLogin = this.InitiateLogin.bind(this);
    this.ConfirmLogin = this.ConfirmLogin.bind(this);
    this.GetProfile = this.GetProfile.bind(this);
    this.SetProfileName = this.SetProfileName.bind(this);
    this.SetProfileLocation = this.SetProfileLocation.bind(this);
    this.SetProfilePhone = this.SetProfilePhone.bind(this);
    this.AddProfileEmail = this.AddProfileEmail.bind(this);
    this.RemoveProfileEmail = this.RemoveProfileEmail.bind(this);
    this.GetCharacters = this.GetCharacters.bind(this);
    this.GetCharacter = this.GetCharacter.bind(this);
    this.CreateCharacterDraft = this.CreateCharacterDraft.bind(this);
    this.UpdateCharacterDraft = this.UpdateCharacterDraft.bind(this);
    this.UpdateCharacterInReview = this.UpdateCharacterInReview.bind(this);
    this.GetAccount = this.GetAccount.bind(this);
    this.SearchAccounts = this.SearchAccounts.bind(this);
    this.SetAdmin = this.SetAdmin.bind(this);
    this.SearchCharacters = this.SearchCharacters.bind(this);
  }

  InitiateLogin(
    request: DeepPartial<InitiateLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<InitiateLoginResponse> {
    return this.rpc.unary(
      LarpInitiateLoginDesc,
      InitiateLoginRequest.fromPartial(request),
      metadata
    );
  }

  ConfirmLogin(
    request: DeepPartial<ConfirmLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<ConfirmLoginResponse> {
    return this.rpc.unary(
      LarpConfirmLoginDesc,
      ConfirmLoginRequest.fromPartial(request),
      metadata
    );
  }

  GetProfile(
    request: DeepPartial<GetProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetProfileResponse> {
    return this.rpc.unary(
      LarpGetProfileDesc,
      GetProfileRequest.fromPartial(request),
      metadata
    );
  }

  SetProfileName(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse> {
    return this.rpc.unary(
      LarpSetProfileNameDesc,
      UpdateProfileRequest.fromPartial(request),
      metadata
    );
  }

  SetProfileLocation(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse> {
    return this.rpc.unary(
      LarpSetProfileLocationDesc,
      UpdateProfileRequest.fromPartial(request),
      metadata
    );
  }

  SetProfilePhone(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse> {
    return this.rpc.unary(
      LarpSetProfilePhoneDesc,
      UpdateProfileRequest.fromPartial(request),
      metadata
    );
  }

  AddProfileEmail(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse> {
    return this.rpc.unary(
      LarpAddProfileEmailDesc,
      UpdateProfileRequest.fromPartial(request),
      metadata
    );
  }

  RemoveProfileEmail(
    request: DeepPartial<UpdateProfileRequest>,
    metadata?: grpc.Metadata
  ): Promise<UpdateProfileResponse> {
    return this.rpc.unary(
      LarpRemoveProfileEmailDesc,
      UpdateProfileRequest.fromPartial(request),
      metadata
    );
  }

  GetCharacters(
    request: DeepPartial<GetCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetCharactersResponse> {
    return this.rpc.unary(
      LarpGetCharactersDesc,
      GetCharactersRequest.fromPartial(request),
      metadata
    );
  }

  GetCharacter(
    request: DeepPartial<GetCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpGetCharacterDesc,
      GetCharacterRequest.fromPartial(request),
      metadata
    );
  }

  CreateCharacterDraft(
    request: DeepPartial<CreateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpCreateCharacterDraftDesc,
      CreateCharacterRequest.fromPartial(request),
      metadata
    );
  }

  UpdateCharacterDraft(
    request: DeepPartial<UpdateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpUpdateCharacterDraftDesc,
      UpdateCharacterRequest.fromPartial(request),
      metadata
    );
  }

  UpdateCharacterInReview(
    request: DeepPartial<UpdateCharacterInReviewRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpUpdateCharacterInReviewDesc,
      UpdateCharacterInReviewRequest.fromPartial(request),
      metadata
    );
  }

  GetAccount(
    request: DeepPartial<GetAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetAccountResponse> {
    return this.rpc.unary(
      LarpGetAccountDesc,
      GetAccountRequest.fromPartial(request),
      metadata
    );
  }

  SearchAccounts(
    request: DeepPartial<SearchAccountsRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchAccountsResponse> {
    return this.rpc.unary(
      LarpSearchAccountsDesc,
      SearchAccountsRequest.fromPartial(request),
      metadata
    );
  }

  SetAdmin(
    request: DeepPartial<SetAdminRequest>,
    metadata?: grpc.Metadata
  ): Promise<SetAdminResponse> {
    return this.rpc.unary(
      LarpSetAdminDesc,
      SetAdminRequest.fromPartial(request),
      metadata
    );
  }

  SearchCharacters(
    request: DeepPartial<SearchCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchCharactersResponse> {
    return this.rpc.unary(
      LarpSearchCharactersDesc,
      SearchCharactersRequest.fromPartial(request),
      metadata
    );
  }
}

export const LarpDesc = {
  serviceName: "larp.Larp",
};

export const LarpInitiateLoginDesc: UnaryMethodDefinitionish = {
  methodName: "InitiateLogin",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return InitiateLoginRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...InitiateLoginResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpConfirmLoginDesc: UnaryMethodDefinitionish = {
  methodName: "ConfirmLogin",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ConfirmLoginRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...ConfirmLoginResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpGetProfileDesc: UnaryMethodDefinitionish = {
  methodName: "GetProfile",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSetProfileNameDesc: UnaryMethodDefinitionish = {
  methodName: "SetProfileName",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...UpdateProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSetProfileLocationDesc: UnaryMethodDefinitionish = {
  methodName: "SetProfileLocation",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...UpdateProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSetProfilePhoneDesc: UnaryMethodDefinitionish = {
  methodName: "SetProfilePhone",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...UpdateProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAddProfileEmailDesc: UnaryMethodDefinitionish = {
  methodName: "AddProfileEmail",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...UpdateProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpRemoveProfileEmailDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveProfileEmail",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...UpdateProfileResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpGetCharactersDesc: UnaryMethodDefinitionish = {
  methodName: "GetCharacters",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCharactersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetCharactersResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpGetCharacterDesc: UnaryMethodDefinitionish = {
  methodName: "GetCharacter",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCharacterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CharacterResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpCreateCharacterDraftDesc: UnaryMethodDefinitionish = {
  methodName: "CreateCharacterDraft",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateCharacterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CharacterResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpUpdateCharacterDraftDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCharacterDraft",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateCharacterRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CharacterResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpUpdateCharacterInReviewDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCharacterInReview",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateCharacterInReviewRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CharacterResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpGetAccountDesc: UnaryMethodDefinitionish = {
  methodName: "GetAccount",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetAccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSearchAccountsDesc: UnaryMethodDefinitionish = {
  methodName: "SearchAccounts",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SearchAccountsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...SearchAccountsResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSetAdminDesc: UnaryMethodDefinitionish = {
  methodName: "SetAdmin",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetAdminRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...SetAdminResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpSearchCharactersDesc: UnaryMethodDefinitionish = {
  methodName: "SearchCharacters",
  service: LarpDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SearchCharactersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...SearchCharactersResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
