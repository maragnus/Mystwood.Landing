/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "larp";

export enum EventRsvp {
  UNANSWERED = 0,
  NO = 1,
  MAYBE = 2,
  YES = 3,
  CONFIRMED = 4,
  APPROVED = 5,
  UNRECOGNIZED = -1,
}

export function eventRsvpFromJSON(object: any): EventRsvp {
  switch (object) {
    case 0:
    case "UNANSWERED":
      return EventRsvp.UNANSWERED;
    case 1:
    case "NO":
      return EventRsvp.NO;
    case 2:
    case "MAYBE":
      return EventRsvp.MAYBE;
    case 3:
    case "YES":
      return EventRsvp.YES;
    case 4:
    case "CONFIRMED":
      return EventRsvp.CONFIRMED;
    case 5:
    case "APPROVED":
      return EventRsvp.APPROVED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EventRsvp.UNRECOGNIZED;
  }
}

export function eventRsvpToJSON(object: EventRsvp): string {
  switch (object) {
    case EventRsvp.UNANSWERED:
      return "UNANSWERED";
    case EventRsvp.NO:
      return "NO";
    case EventRsvp.MAYBE:
      return "MAYBE";
    case EventRsvp.YES:
      return "YES";
    case EventRsvp.CONFIRMED:
      return "CONFIRMED";
    case EventRsvp.APPROVED:
      return "APPROVED";
    default:
      return "UNKNOWN";
  }
}

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

export interface Event {
  eventId: number;
  title: string;
  location: string;
  date: string;
  eventType: string;
  rsvp: boolean;
  hidden: boolean;
  attendees: AccountAttendance[];
}

export interface AccountAttendance {
  accountId: number;
  name: string;
  moonstone: number;
  rsvp: EventRsvp;
  characters: CharacterSummary[];
}

export interface AccountEmail {
  email: string;
  verified: boolean;
}

export interface Account {
  accountId: number;
  name: string;
  location: string;
  emails: AccountEmail[];
  phone: string;
  isAdmin: boolean;
  notes: string;
  created: string;
  characters: CharacterSummary[];
}

export interface Character {
  characterId: string;
  liveJson: string;
  isLive: boolean;
  draftJson: string;
  isReview: boolean;
  metadata: string;
  accountId: number;
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

export interface CharacterUpdate {
  characterId: string;
  fields: { [key: string]: string };
}

export interface CharacterUpdate_FieldsEntry {
  key: string;
  value: string;
}

export interface SessionIdentifier {
  sessionId: string;
}

export interface NoResponse {}

export interface BasicRequest {
  session?: SessionIdentifier;
}

export interface AccountResponse {
  profile?: Account;
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
  profile?: Account;
}

export interface UpdateAccountRequest {
  session?: SessionIdentifier;
  value: string;
}

export interface ManageAccountRequest {
  session?: SessionIdentifier;
  profile?: Account;
}

export interface CharactersResponse {
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

export interface AdminCommandRequest {
  session?: SessionIdentifier;
  command: string;
  arguments: string[];
}

export interface AdminCommandResponse {
  outputs: string[];
}

export interface GetAccountRequest {
  session?: SessionIdentifier;
  accountId: number;
}

export interface SearchAccountsRequest {
  session?: SessionIdentifier;
  query: string;
}

export interface SearchAccountsResponse {
  profiles: Account[];
}

export interface SetAdminRequest {
  session?: SessionIdentifier;
  accountId: number;
  isAdmin: boolean;
}

export interface SearchCharactersRequest {
  session?: SessionIdentifier;
  query: string;
}

export interface SearchCharactersResponse {
  characters: CharacterSummary[];
}

export interface EventRequest {
  session?: SessionIdentifier;
  event?: Event;
}

export interface EventIdRequest {
  session?: SessionIdentifier;
  eventId: number;
}

export interface EventResponse {
  event?: Event;
}

export interface EventsResponse {
  events: Event[];
}

export interface RsvpRequest {
  session?: SessionIdentifier;
  eventId: number;
  accountId?: number | undefined;
  rsvp: EventRsvp;
}

const baseEvent: object = {
  eventId: 0,
  title: "",
  location: "",
  date: "",
  eventType: "",
  rsvp: false,
  hidden: false,
};

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventId !== 0) {
      writer.uint32(8).int32(message.eventId);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.location !== "") {
      writer.uint32(26).string(message.location);
    }
    if (message.date !== "") {
      writer.uint32(34).string(message.date);
    }
    if (message.eventType !== "") {
      writer.uint32(42).string(message.eventType);
    }
    if (message.rsvp === true) {
      writer.uint32(48).bool(message.rsvp);
    }
    if (message.hidden === true) {
      writer.uint32(56).bool(message.hidden);
    }
    for (const v of message.attendees) {
      AccountAttendance.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    message.attendees = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.int32();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.location = reader.string();
          break;
        case 4:
          message.date = reader.string();
          break;
        case 5:
          message.eventType = reader.string();
          break;
        case 6:
          message.rsvp = reader.bool();
          break;
        case 7:
          message.hidden = reader.bool();
          break;
        case 8:
          message.attendees.push(
            AccountAttendance.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    message.eventId =
      object.eventId !== undefined && object.eventId !== null
        ? Number(object.eventId)
        : 0;
    message.title =
      object.title !== undefined && object.title !== null
        ? String(object.title)
        : "";
    message.location =
      object.location !== undefined && object.location !== null
        ? String(object.location)
        : "";
    message.date =
      object.date !== undefined && object.date !== null
        ? String(object.date)
        : "";
    message.eventType =
      object.eventType !== undefined && object.eventType !== null
        ? String(object.eventType)
        : "";
    message.rsvp =
      object.rsvp !== undefined && object.rsvp !== null
        ? Boolean(object.rsvp)
        : false;
    message.hidden =
      object.hidden !== undefined && object.hidden !== null
        ? Boolean(object.hidden)
        : false;
    message.attendees = (object.attendees ?? []).map((e: any) =>
      AccountAttendance.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.title !== undefined && (obj.title = message.title);
    message.location !== undefined && (obj.location = message.location);
    message.date !== undefined && (obj.date = message.date);
    message.eventType !== undefined && (obj.eventType = message.eventType);
    message.rsvp !== undefined && (obj.rsvp = message.rsvp);
    message.hidden !== undefined && (obj.hidden = message.hidden);
    if (message.attendees) {
      obj.attendees = message.attendees.map((e) =>
        e ? AccountAttendance.toJSON(e) : undefined
      );
    } else {
      obj.attendees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = { ...baseEvent } as Event;
    message.eventId = object.eventId ?? 0;
    message.title = object.title ?? "";
    message.location = object.location ?? "";
    message.date = object.date ?? "";
    message.eventType = object.eventType ?? "";
    message.rsvp = object.rsvp ?? false;
    message.hidden = object.hidden ?? false;
    message.attendees =
      object.attendees?.map((e) => AccountAttendance.fromPartial(e)) || [];
    return message;
  },
};

const baseAccountAttendance: object = {
  accountId: 0,
  name: "",
  moonstone: 0,
  rsvp: 0,
};

export const AccountAttendance = {
  encode(
    message: AccountAttendance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountId !== 0) {
      writer.uint32(8).int32(message.accountId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.moonstone !== 0) {
      writer.uint32(24).int32(message.moonstone);
    }
    if (message.rsvp !== 0) {
      writer.uint32(32).int32(message.rsvp);
    }
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountAttendance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountAttendance } as AccountAttendance;
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
          message.moonstone = reader.int32();
          break;
        case 4:
          message.rsvp = reader.int32() as any;
          break;
        case 5:
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

  fromJSON(object: any): AccountAttendance {
    const message = { ...baseAccountAttendance } as AccountAttendance;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.moonstone =
      object.moonstone !== undefined && object.moonstone !== null
        ? Number(object.moonstone)
        : 0;
    message.rsvp =
      object.rsvp !== undefined && object.rsvp !== null
        ? eventRsvpFromJSON(object.rsvp)
        : 0;
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: AccountAttendance): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.name !== undefined && (obj.name = message.name);
    message.moonstone !== undefined && (obj.moonstone = message.moonstone);
    message.rsvp !== undefined && (obj.rsvp = eventRsvpToJSON(message.rsvp));
    if (message.characters) {
      obj.characters = message.characters.map((e) =>
        e ? CharacterSummary.toJSON(e) : undefined
      );
    } else {
      obj.characters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountAttendance>, I>>(
    object: I
  ): AccountAttendance {
    const message = { ...baseAccountAttendance } as AccountAttendance;
    message.accountId = object.accountId ?? 0;
    message.name = object.name ?? "";
    message.moonstone = object.moonstone ?? 0;
    message.rsvp = object.rsvp ?? 0;
    message.characters =
      object.characters?.map((e) => CharacterSummary.fromPartial(e)) || [];
    return message;
  },
};

const baseAccountEmail: object = { email: "", verified: false };

export const AccountEmail = {
  encode(
    message: AccountEmail,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountEmail } as AccountEmail;
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

  fromJSON(object: any): AccountEmail {
    const message = { ...baseAccountEmail } as AccountEmail;
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

  toJSON(message: AccountEmail): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.verified !== undefined && (obj.verified = message.verified);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountEmail>, I>>(
    object: I
  ): AccountEmail {
    const message = { ...baseAccountEmail } as AccountEmail;
    message.email = object.email ?? "";
    message.verified = object.verified ?? false;
    return message;
  },
};

const baseAccount: object = {
  accountId: 0,
  name: "",
  location: "",
  phone: "",
  isAdmin: false,
  notes: "",
  created: "",
};

export const Account = {
  encode(
    message: Account,
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
      AccountEmail.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.phone !== "") {
      writer.uint32(42).string(message.phone);
    }
    if (message.isAdmin === true) {
      writer.uint32(48).bool(message.isAdmin);
    }
    if (message.notes !== "") {
      writer.uint32(58).string(message.notes);
    }
    if (message.created !== "") {
      writer.uint32(66).string(message.created);
    }
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccount } as Account;
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
          message.emails.push(AccountEmail.decode(reader, reader.uint32()));
          break;
        case 5:
          message.phone = reader.string();
          break;
        case 6:
          message.isAdmin = reader.bool();
          break;
        case 7:
          message.notes = reader.string();
          break;
        case 8:
          message.created = reader.string();
          break;
        case 9:
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

  fromJSON(object: any): Account {
    const message = { ...baseAccount } as Account;
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
      AccountEmail.fromJSON(e)
    );
    message.phone =
      object.phone !== undefined && object.phone !== null
        ? String(object.phone)
        : "";
    message.isAdmin =
      object.isAdmin !== undefined && object.isAdmin !== null
        ? Boolean(object.isAdmin)
        : false;
    message.notes =
      object.notes !== undefined && object.notes !== null
        ? String(object.notes)
        : "";
    message.created =
      object.created !== undefined && object.created !== null
        ? String(object.created)
        : "";
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.name !== undefined && (obj.name = message.name);
    message.location !== undefined && (obj.location = message.location);
    if (message.emails) {
      obj.emails = message.emails.map((e) =>
        e ? AccountEmail.toJSON(e) : undefined
      );
    } else {
      obj.emails = [];
    }
    message.phone !== undefined && (obj.phone = message.phone);
    message.isAdmin !== undefined && (obj.isAdmin = message.isAdmin);
    message.notes !== undefined && (obj.notes = message.notes);
    message.created !== undefined && (obj.created = message.created);
    if (message.characters) {
      obj.characters = message.characters.map((e) =>
        e ? CharacterSummary.toJSON(e) : undefined
      );
    } else {
      obj.characters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = { ...baseAccount } as Account;
    message.accountId = object.accountId ?? 0;
    message.name = object.name ?? "";
    message.location = object.location ?? "";
    message.emails =
      object.emails?.map((e) => AccountEmail.fromPartial(e)) || [];
    message.phone = object.phone ?? "";
    message.isAdmin = object.isAdmin ?? false;
    message.notes = object.notes ?? "";
    message.created = object.created ?? "";
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
  accountId: 0,
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
    if (message.accountId !== 0) {
      writer.uint32(56).int32(message.accountId);
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
        case 7:
          message.accountId = reader.int32();
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
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : 0;
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
    message.accountId !== undefined && (obj.accountId = message.accountId);
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
    message.accountId = object.accountId ?? 0;
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

const baseCharacterUpdate: object = { characterId: "" };

export const CharacterUpdate = {
  encode(
    message: CharacterUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.characterId !== "") {
      writer.uint32(10).string(message.characterId);
    }
    Object.entries(message.fields).forEach(([key, value]) => {
      CharacterUpdate_FieldsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CharacterUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCharacterUpdate } as CharacterUpdate;
    message.fields = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characterId = reader.string();
          break;
        case 2:
          const entry2 = CharacterUpdate_FieldsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.fields[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CharacterUpdate {
    const message = { ...baseCharacterUpdate } as CharacterUpdate;
    message.characterId =
      object.characterId !== undefined && object.characterId !== null
        ? String(object.characterId)
        : "";
    message.fields = Object.entries(object.fields ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {});
    return message;
  },

  toJSON(message: CharacterUpdate): unknown {
    const obj: any = {};
    message.characterId !== undefined &&
      (obj.characterId = message.characterId);
    obj.fields = {};
    if (message.fields) {
      Object.entries(message.fields).forEach(([k, v]) => {
        obj.fields[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CharacterUpdate>, I>>(
    object: I
  ): CharacterUpdate {
    const message = { ...baseCharacterUpdate } as CharacterUpdate;
    message.characterId = object.characterId ?? "";
    message.fields = Object.entries(object.fields ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

const baseCharacterUpdate_FieldsEntry: object = { key: "", value: "" };

export const CharacterUpdate_FieldsEntry = {
  encode(
    message: CharacterUpdate_FieldsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CharacterUpdate_FieldsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCharacterUpdate_FieldsEntry,
    } as CharacterUpdate_FieldsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
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

  fromJSON(object: any): CharacterUpdate_FieldsEntry {
    const message = {
      ...baseCharacterUpdate_FieldsEntry,
    } as CharacterUpdate_FieldsEntry;
    message.key =
      object.key !== undefined && object.key !== null ? String(object.key) : "";
    message.value =
      object.value !== undefined && object.value !== null
        ? String(object.value)
        : "";
    return message;
  },

  toJSON(message: CharacterUpdate_FieldsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CharacterUpdate_FieldsEntry>, I>>(
    object: I
  ): CharacterUpdate_FieldsEntry {
    const message = {
      ...baseCharacterUpdate_FieldsEntry,
    } as CharacterUpdate_FieldsEntry;
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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

const baseNoResponse: object = {};

export const NoResponse = {
  encode(_: NoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNoResponse } as NoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): NoResponse {
    const message = { ...baseNoResponse } as NoResponse;
    return message;
  },

  toJSON(_: NoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NoResponse>, I>>(_: I): NoResponse {
    const message = { ...baseNoResponse } as NoResponse;
    return message;
  },
};

const baseBasicRequest: object = {};

export const BasicRequest = {
  encode(
    message: BasicRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBasicRequest } as BasicRequest;
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

  fromJSON(object: any): BasicRequest {
    const message = { ...baseBasicRequest } as BasicRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    return message;
  },

  toJSON(message: BasicRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BasicRequest>, I>>(
    object: I
  ): BasicRequest {
    const message = { ...baseBasicRequest } as BasicRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    return message;
  },
};

const baseAccountResponse: object = {};

export const AccountResponse = {
  encode(
    message: AccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.profile !== undefined) {
      Account.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountResponse } as AccountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountResponse {
    const message = { ...baseAccountResponse } as AccountResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Account.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: AccountResponse): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Account.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountResponse>, I>>(
    object: I
  ): AccountResponse {
    const message = { ...baseAccountResponse } as AccountResponse;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Account.fromPartial(object.profile)
        : undefined;
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
      Account.encode(message.profile, writer.uint32(34).fork()).ldelim();
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
          message.profile = Account.decode(reader, reader.uint32());
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
        ? Account.fromJSON(object.profile)
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
        ? Account.toJSON(message.profile)
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
        ? Account.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseUpdateAccountRequest: object = { value: "" };

export const UpdateAccountRequest = {
  encode(
    message: UpdateAccountRequest,
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
  ): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
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

  fromJSON(object: any): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
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

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(
    object: I
  ): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.value = object.value ?? "";
    return message;
  },
};

const baseManageAccountRequest: object = {};

export const ManageAccountRequest = {
  encode(
    message: ManageAccountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.profile !== undefined) {
      Account.encode(message.profile, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManageAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseManageAccountRequest } as ManageAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.profile = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManageAccountRequest {
    const message = { ...baseManageAccountRequest } as ManageAccountRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Account.fromJSON(object.profile)
        : undefined;
    return message;
  },

  toJSON(message: ManageAccountRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? Account.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManageAccountRequest>, I>>(
    object: I
  ): ManageAccountRequest {
    const message = { ...baseManageAccountRequest } as ManageAccountRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? Account.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

const baseCharactersResponse: object = {};

export const CharactersResponse = {
  encode(
    message: CharactersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.characters) {
      CharacterSummary.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CharactersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCharactersResponse } as CharactersResponse;
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

  fromJSON(object: any): CharactersResponse {
    const message = { ...baseCharactersResponse } as CharactersResponse;
    message.characters = (object.characters ?? []).map((e: any) =>
      CharacterSummary.fromJSON(e)
    );
    return message;
  },

  toJSON(message: CharactersResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<CharactersResponse>, I>>(
    object: I
  ): CharactersResponse {
    const message = { ...baseCharactersResponse } as CharactersResponse;
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

const baseAdminCommandRequest: object = { command: "", arguments: "" };

export const AdminCommandRequest = {
  encode(
    message: AdminCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.command !== "") {
      writer.uint32(18).string(message.command);
    }
    for (const v of message.arguments) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdminCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAdminCommandRequest } as AdminCommandRequest;
    message.arguments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.command = reader.string();
          break;
        case 3:
          message.arguments.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AdminCommandRequest {
    const message = { ...baseAdminCommandRequest } as AdminCommandRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.command =
      object.command !== undefined && object.command !== null
        ? String(object.command)
        : "";
    message.arguments = (object.arguments ?? []).map((e: any) => String(e));
    return message;
  },

  toJSON(message: AdminCommandRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.command !== undefined && (obj.command = message.command);
    if (message.arguments) {
      obj.arguments = message.arguments.map((e) => e);
    } else {
      obj.arguments = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AdminCommandRequest>, I>>(
    object: I
  ): AdminCommandRequest {
    const message = { ...baseAdminCommandRequest } as AdminCommandRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.command = object.command ?? "";
    message.arguments = object.arguments?.map((e) => e) || [];
    return message;
  },
};

const baseAdminCommandResponse: object = { outputs: "" };

export const AdminCommandResponse = {
  encode(
    message: AdminCommandResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.outputs) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AdminCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAdminCommandResponse } as AdminCommandResponse;
    message.outputs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.outputs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AdminCommandResponse {
    const message = { ...baseAdminCommandResponse } as AdminCommandResponse;
    message.outputs = (object.outputs ?? []).map((e: any) => String(e));
    return message;
  },

  toJSON(message: AdminCommandResponse): unknown {
    const obj: any = {};
    if (message.outputs) {
      obj.outputs = message.outputs.map((e) => e);
    } else {
      obj.outputs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AdminCommandResponse>, I>>(
    object: I
  ): AdminCommandResponse {
    const message = { ...baseAdminCommandResponse } as AdminCommandResponse;
    message.outputs = object.outputs?.map((e) => e) || [];
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
      Account.encode(v!, writer.uint32(10).fork()).ldelim();
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
          message.profiles.push(Account.decode(reader, reader.uint32()));
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
      Account.fromJSON(e)
    );
    return message;
  },

  toJSON(message: SearchAccountsResponse): unknown {
    const obj: any = {};
    if (message.profiles) {
      obj.profiles = message.profiles.map((e) =>
        e ? Account.toJSON(e) : undefined
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
      object.profiles?.map((e) => Account.fromPartial(e)) || [];
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

const baseEventRequest: object = {};

export const EventRequest = {
  encode(
    message: EventRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventRequest } as EventRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.event = Event.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRequest {
    const message = { ...baseEventRequest } as EventRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromJSON(object.event)
        : undefined;
    return message;
  },

  toJSON(message: EventRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.event !== undefined &&
      (obj.event = message.event ? Event.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRequest>, I>>(
    object: I
  ): EventRequest {
    const message = { ...baseEventRequest } as EventRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromPartial(object.event)
        : undefined;
    return message;
  },
};

const baseEventIdRequest: object = { eventId: 0 };

export const EventIdRequest = {
  encode(
    message: EventIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.eventId !== 0) {
      writer.uint32(16).int32(message.eventId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventIdRequest } as EventIdRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.eventId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventIdRequest {
    const message = { ...baseEventIdRequest } as EventIdRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.eventId =
      object.eventId !== undefined && object.eventId !== null
        ? Number(object.eventId)
        : 0;
    return message;
  },

  toJSON(message: EventIdRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.eventId !== undefined && (obj.eventId = message.eventId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventIdRequest>, I>>(
    object: I
  ): EventIdRequest {
    const message = { ...baseEventIdRequest } as EventIdRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.eventId = object.eventId ?? 0;
    return message;
  },
};

const baseEventResponse: object = {};

export const EventResponse = {
  encode(
    message: EventResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventResponse } as EventResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = Event.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventResponse {
    const message = { ...baseEventResponse } as EventResponse;
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromJSON(object.event)
        : undefined;
    return message;
  },

  toJSON(message: EventResponse): unknown {
    const obj: any = {};
    message.event !== undefined &&
      (obj.event = message.event ? Event.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventResponse>, I>>(
    object: I
  ): EventResponse {
    const message = { ...baseEventResponse } as EventResponse;
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromPartial(object.event)
        : undefined;
    return message;
  },
};

const baseEventsResponse: object = {};

export const EventsResponse = {
  encode(
    message: EventsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventsResponse } as EventsResponse;
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventsResponse {
    const message = { ...baseEventsResponse } as EventsResponse;
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    return message;
  },

  toJSON(message: EventsResponse): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventsResponse>, I>>(
    object: I
  ): EventsResponse {
    const message = { ...baseEventsResponse } as EventsResponse;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

const baseRsvpRequest: object = { eventId: 0, rsvp: 0 };

export const RsvpRequest = {
  encode(
    message: RsvpRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      SessionIdentifier.encode(
        message.session,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.eventId !== 0) {
      writer.uint32(16).int32(message.eventId);
    }
    if (message.accountId !== undefined) {
      writer.uint32(24).int32(message.accountId);
    }
    if (message.rsvp !== 0) {
      writer.uint32(32).int32(message.rsvp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RsvpRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRsvpRequest } as RsvpRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = SessionIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.eventId = reader.int32();
          break;
        case 3:
          message.accountId = reader.int32();
          break;
        case 4:
          message.rsvp = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RsvpRequest {
    const message = { ...baseRsvpRequest } as RsvpRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromJSON(object.session)
        : undefined;
    message.eventId =
      object.eventId !== undefined && object.eventId !== null
        ? Number(object.eventId)
        : 0;
    message.accountId =
      object.accountId !== undefined && object.accountId !== null
        ? Number(object.accountId)
        : undefined;
    message.rsvp =
      object.rsvp !== undefined && object.rsvp !== null
        ? eventRsvpFromJSON(object.rsvp)
        : 0;
    return message;
  },

  toJSON(message: RsvpRequest): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? SessionIdentifier.toJSON(message.session)
        : undefined);
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.rsvp !== undefined && (obj.rsvp = eventRsvpToJSON(message.rsvp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RsvpRequest>, I>>(
    object: I
  ): RsvpRequest {
    const message = { ...baseRsvpRequest } as RsvpRequest;
    message.session =
      object.session !== undefined && object.session !== null
        ? SessionIdentifier.fromPartial(object.session)
        : undefined;
    message.eventId = object.eventId ?? 0;
    message.accountId = object.accountId ?? undefined;
    message.rsvp = object.rsvp ?? 0;
    return message;
  },
};

export interface LarpAuthentication {
  InitiateLogin(
    request: DeepPartial<InitiateLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<InitiateLoginResponse>;
  ConfirmLogin(
    request: DeepPartial<ConfirmLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<ConfirmLoginResponse>;
}

export class LarpAuthenticationClientImpl implements LarpAuthentication {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InitiateLogin = this.InitiateLogin.bind(this);
    this.ConfirmLogin = this.ConfirmLogin.bind(this);
  }

  InitiateLogin(
    request: DeepPartial<InitiateLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<InitiateLoginResponse> {
    return this.rpc.unary(
      LarpAuthenticationInitiateLoginDesc,
      InitiateLoginRequest.fromPartial(request),
      metadata
    );
  }

  ConfirmLogin(
    request: DeepPartial<ConfirmLoginRequest>,
    metadata?: grpc.Metadata
  ): Promise<ConfirmLoginResponse> {
    return this.rpc.unary(
      LarpAuthenticationConfirmLoginDesc,
      ConfirmLoginRequest.fromPartial(request),
      metadata
    );
  }
}

export const LarpAuthenticationDesc = {
  serviceName: "larp.LarpAuthentication",
};

export const LarpAuthenticationInitiateLoginDesc: UnaryMethodDefinitionish = {
  methodName: "InitiateLogin",
  service: LarpAuthenticationDesc,
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

export const LarpAuthenticationConfirmLoginDesc: UnaryMethodDefinitionish = {
  methodName: "ConfirmLogin",
  service: LarpAuthenticationDesc,
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

export interface LarpAccount {
  GetAccount(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  SetAccountName(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  SetAccountLocation(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  SetAccountPhone(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  AddAccountEmail(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  RemoveAccountEmail(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  GetCharacters(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharactersResponse>;
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
  GetEvent(
    request: DeepPartial<EventIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse>;
  GetEvents(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventsResponse>;
  SetRsvp(
    request: DeepPartial<RsvpRequest>,
    metadata?: grpc.Metadata
  ): Promise<NoResponse>;
}

export class LarpAccountClientImpl implements LarpAccount {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAccount = this.GetAccount.bind(this);
    this.SetAccountName = this.SetAccountName.bind(this);
    this.SetAccountLocation = this.SetAccountLocation.bind(this);
    this.SetAccountPhone = this.SetAccountPhone.bind(this);
    this.AddAccountEmail = this.AddAccountEmail.bind(this);
    this.RemoveAccountEmail = this.RemoveAccountEmail.bind(this);
    this.GetCharacters = this.GetCharacters.bind(this);
    this.GetCharacter = this.GetCharacter.bind(this);
    this.CreateCharacterDraft = this.CreateCharacterDraft.bind(this);
    this.UpdateCharacterDraft = this.UpdateCharacterDraft.bind(this);
    this.UpdateCharacterInReview = this.UpdateCharacterInReview.bind(this);
    this.GetEvent = this.GetEvent.bind(this);
    this.GetEvents = this.GetEvents.bind(this);
    this.SetRsvp = this.SetRsvp.bind(this);
  }

  GetAccount(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountGetAccountDesc,
      BasicRequest.fromPartial(request),
      metadata
    );
  }

  SetAccountName(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountSetAccountNameDesc,
      UpdateAccountRequest.fromPartial(request),
      metadata
    );
  }

  SetAccountLocation(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountSetAccountLocationDesc,
      UpdateAccountRequest.fromPartial(request),
      metadata
    );
  }

  SetAccountPhone(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountSetAccountPhoneDesc,
      UpdateAccountRequest.fromPartial(request),
      metadata
    );
  }

  AddAccountEmail(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountAddAccountEmailDesc,
      UpdateAccountRequest.fromPartial(request),
      metadata
    );
  }

  RemoveAccountEmail(
    request: DeepPartial<UpdateAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpAccountRemoveAccountEmailDesc,
      UpdateAccountRequest.fromPartial(request),
      metadata
    );
  }

  GetCharacters(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharactersResponse> {
    return this.rpc.unary(
      LarpAccountGetCharactersDesc,
      BasicRequest.fromPartial(request),
      metadata
    );
  }

  GetCharacter(
    request: DeepPartial<GetCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpAccountGetCharacterDesc,
      GetCharacterRequest.fromPartial(request),
      metadata
    );
  }

  CreateCharacterDraft(
    request: DeepPartial<CreateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpAccountCreateCharacterDraftDesc,
      CreateCharacterRequest.fromPartial(request),
      metadata
    );
  }

  UpdateCharacterDraft(
    request: DeepPartial<UpdateCharacterRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpAccountUpdateCharacterDraftDesc,
      UpdateCharacterRequest.fromPartial(request),
      metadata
    );
  }

  UpdateCharacterInReview(
    request: DeepPartial<UpdateCharacterInReviewRequest>,
    metadata?: grpc.Metadata
  ): Promise<CharacterResponse> {
    return this.rpc.unary(
      LarpAccountUpdateCharacterInReviewDesc,
      UpdateCharacterInReviewRequest.fromPartial(request),
      metadata
    );
  }

  GetEvent(
    request: DeepPartial<EventIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse> {
    return this.rpc.unary(
      LarpAccountGetEventDesc,
      EventIdRequest.fromPartial(request),
      metadata
    );
  }

  GetEvents(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventsResponse> {
    return this.rpc.unary(
      LarpAccountGetEventsDesc,
      BasicRequest.fromPartial(request),
      metadata
    );
  }

  SetRsvp(
    request: DeepPartial<RsvpRequest>,
    metadata?: grpc.Metadata
  ): Promise<NoResponse> {
    return this.rpc.unary(
      LarpAccountSetRsvpDesc,
      RsvpRequest.fromPartial(request),
      metadata
    );
  }
}

export const LarpAccountDesc = {
  serviceName: "larp.LarpAccount",
};

export const LarpAccountGetAccountDesc: UnaryMethodDefinitionish = {
  methodName: "GetAccount",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BasicRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountSetAccountNameDesc: UnaryMethodDefinitionish = {
  methodName: "SetAccountName",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountSetAccountLocationDesc: UnaryMethodDefinitionish = {
  methodName: "SetAccountLocation",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountSetAccountPhoneDesc: UnaryMethodDefinitionish = {
  methodName: "SetAccountPhone",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountAddAccountEmailDesc: UnaryMethodDefinitionish = {
  methodName: "AddAccountEmail",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountRemoveAccountEmailDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveAccountEmail",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountGetCharactersDesc: UnaryMethodDefinitionish = {
  methodName: "GetCharacters",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BasicRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CharactersResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountGetCharacterDesc: UnaryMethodDefinitionish = {
  methodName: "GetCharacter",
  service: LarpAccountDesc,
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

export const LarpAccountCreateCharacterDraftDesc: UnaryMethodDefinitionish = {
  methodName: "CreateCharacterDraft",
  service: LarpAccountDesc,
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

export const LarpAccountUpdateCharacterDraftDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCharacterDraft",
  service: LarpAccountDesc,
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

export const LarpAccountUpdateCharacterInReviewDesc: UnaryMethodDefinitionish =
  {
    methodName: "UpdateCharacterInReview",
    service: LarpAccountDesc,
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

export const LarpAccountGetEventDesc: UnaryMethodDefinitionish = {
  methodName: "GetEvent",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return EventIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...EventResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountGetEventsDesc: UnaryMethodDefinitionish = {
  methodName: "GetEvents",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BasicRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...EventsResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpAccountSetRsvpDesc: UnaryMethodDefinitionish = {
  methodName: "SetRsvp",
  service: LarpAccountDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RsvpRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...NoResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export interface LarpManage {
  AdminCommand(
    request: DeepPartial<AdminCommandRequest>,
    metadata?: grpc.Metadata
  ): Promise<AdminCommandResponse>;
  GetAccount(
    request: DeepPartial<GetAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  UpdateAccount(
    request: DeepPartial<ManageAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  SearchAccounts(
    request: DeepPartial<SearchAccountsRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchAccountsResponse>;
  SetAdmin(
    request: DeepPartial<SetAdminRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse>;
  SearchCharacters(
    request: DeepPartial<SearchCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchCharactersResponse>;
  GetEvents(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventsResponse>;
  AddEvent(
    request: DeepPartial<EventRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse>;
  UpdateEvent(
    request: DeepPartial<EventRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse>;
  SetRsvp(
    request: DeepPartial<RsvpRequest>,
    metadata?: grpc.Metadata
  ): Promise<NoResponse>;
}

export class LarpManageClientImpl implements LarpManage {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AdminCommand = this.AdminCommand.bind(this);
    this.GetAccount = this.GetAccount.bind(this);
    this.UpdateAccount = this.UpdateAccount.bind(this);
    this.SearchAccounts = this.SearchAccounts.bind(this);
    this.SetAdmin = this.SetAdmin.bind(this);
    this.SearchCharacters = this.SearchCharacters.bind(this);
    this.GetEvents = this.GetEvents.bind(this);
    this.AddEvent = this.AddEvent.bind(this);
    this.UpdateEvent = this.UpdateEvent.bind(this);
    this.SetRsvp = this.SetRsvp.bind(this);
  }

  AdminCommand(
    request: DeepPartial<AdminCommandRequest>,
    metadata?: grpc.Metadata
  ): Promise<AdminCommandResponse> {
    return this.rpc.unary(
      LarpManageAdminCommandDesc,
      AdminCommandRequest.fromPartial(request),
      metadata
    );
  }

  GetAccount(
    request: DeepPartial<GetAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpManageGetAccountDesc,
      GetAccountRequest.fromPartial(request),
      metadata
    );
  }

  UpdateAccount(
    request: DeepPartial<ManageAccountRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpManageUpdateAccountDesc,
      ManageAccountRequest.fromPartial(request),
      metadata
    );
  }

  SearchAccounts(
    request: DeepPartial<SearchAccountsRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchAccountsResponse> {
    return this.rpc.unary(
      LarpManageSearchAccountsDesc,
      SearchAccountsRequest.fromPartial(request),
      metadata
    );
  }

  SetAdmin(
    request: DeepPartial<SetAdminRequest>,
    metadata?: grpc.Metadata
  ): Promise<AccountResponse> {
    return this.rpc.unary(
      LarpManageSetAdminDesc,
      SetAdminRequest.fromPartial(request),
      metadata
    );
  }

  SearchCharacters(
    request: DeepPartial<SearchCharactersRequest>,
    metadata?: grpc.Metadata
  ): Promise<SearchCharactersResponse> {
    return this.rpc.unary(
      LarpManageSearchCharactersDesc,
      SearchCharactersRequest.fromPartial(request),
      metadata
    );
  }

  GetEvents(
    request: DeepPartial<BasicRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventsResponse> {
    return this.rpc.unary(
      LarpManageGetEventsDesc,
      BasicRequest.fromPartial(request),
      metadata
    );
  }

  AddEvent(
    request: DeepPartial<EventRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse> {
    return this.rpc.unary(
      LarpManageAddEventDesc,
      EventRequest.fromPartial(request),
      metadata
    );
  }

  UpdateEvent(
    request: DeepPartial<EventRequest>,
    metadata?: grpc.Metadata
  ): Promise<EventResponse> {
    return this.rpc.unary(
      LarpManageUpdateEventDesc,
      EventRequest.fromPartial(request),
      metadata
    );
  }

  SetRsvp(
    request: DeepPartial<RsvpRequest>,
    metadata?: grpc.Metadata
  ): Promise<NoResponse> {
    return this.rpc.unary(
      LarpManageSetRsvpDesc,
      RsvpRequest.fromPartial(request),
      metadata
    );
  }
}

export const LarpManageDesc = {
  serviceName: "larp.LarpManage",
};

export const LarpManageAdminCommandDesc: UnaryMethodDefinitionish = {
  methodName: "AdminCommand",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AdminCommandRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AdminCommandResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageGetAccountDesc: UnaryMethodDefinitionish = {
  methodName: "GetAccount",
  service: LarpManageDesc,
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
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageUpdateAccountDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateAccount",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ManageAccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageSearchAccountsDesc: UnaryMethodDefinitionish = {
  methodName: "SearchAccounts",
  service: LarpManageDesc,
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

export const LarpManageSetAdminDesc: UnaryMethodDefinitionish = {
  methodName: "SetAdmin",
  service: LarpManageDesc,
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
        ...AccountResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageSearchCharactersDesc: UnaryMethodDefinitionish = {
  methodName: "SearchCharacters",
  service: LarpManageDesc,
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

export const LarpManageGetEventsDesc: UnaryMethodDefinitionish = {
  methodName: "GetEvents",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BasicRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...EventsResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageAddEventDesc: UnaryMethodDefinitionish = {
  methodName: "AddEvent",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return EventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...EventResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageUpdateEventDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateEvent",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return EventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...EventResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const LarpManageSetRsvpDesc: UnaryMethodDefinitionish = {
  methodName: "SetRsvp",
  service: LarpManageDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RsvpRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...NoResponse.decode(data),
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
