/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.vesting.v2";
/**
 * EventCreateClawbackVestingAccount defines the event type
 * for creating a clawback vesting account
 */
export interface EventCreateClawbackVestingAccount {
  /** funder is the address of the funder */
  funder: string;
  /** vesting_account is the address of the created vesting account */
  vestingAccount: string;
}
/** EventFundVestingAccount defines the event type for funding a vesting account */
export interface EventFundVestingAccount {
  /** funder is the address of the funder */
  funder: string;
  /** coins to be vested */
  coins: string;
  /** start_time is the time when the coins start to vest */
  startTime: string;
  /** vesting_account is the address of the recipient */
  vestingAccount: string;
}
/** EventClawback defines the event type for clawback */
export interface EventClawback {
  /** funder is the address of the funder */
  funder: string;
  /** account is the address of the account */
  account: string;
  /** destination is the address of the destination */
  destination: string;
}
/** EventUpdateVestingFunder defines the event type for updating the vesting funder */
export interface EventUpdateVestingFunder {
  /** funder is the address of the funder */
  funder: string;
  /** account is the address of the account */
  account: string;
  /** new_funder is the address of the new funder */
  newFunder: string;
}
function createBaseEventCreateClawbackVestingAccount(): EventCreateClawbackVestingAccount {
  return {
    funder: "",
    vestingAccount: "",
  };
}
export const EventCreateClawbackVestingAccount = {
  typeUrl: "/evmos.vesting.v2.EventCreateClawbackVestingAccount",
  encode(
    message: EventCreateClawbackVestingAccount,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.funder !== "") {
      writer.uint32(10).string(message.funder);
    }
    if (message.vestingAccount !== "") {
      writer.uint32(18).string(message.vestingAccount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateClawbackVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateClawbackVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funder = reader.string();
          break;
        case 2:
          message.vestingAccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventCreateClawbackVestingAccount {
    const obj = createBaseEventCreateClawbackVestingAccount();
    if (isSet(object.funder)) obj.funder = String(object.funder);
    if (isSet(object.vestingAccount)) obj.vestingAccount = String(object.vestingAccount);
    return obj;
  },
  toJSON(message: EventCreateClawbackVestingAccount): unknown {
    const obj: any = {};
    message.funder !== undefined && (obj.funder = message.funder);
    message.vestingAccount !== undefined && (obj.vestingAccount = message.vestingAccount);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventCreateClawbackVestingAccount>, I>>(
    object: I,
  ): EventCreateClawbackVestingAccount {
    const message = createBaseEventCreateClawbackVestingAccount();
    message.funder = object.funder ?? "";
    message.vestingAccount = object.vestingAccount ?? "";
    return message;
  },
};
function createBaseEventFundVestingAccount(): EventFundVestingAccount {
  return {
    funder: "",
    coins: "",
    startTime: "",
    vestingAccount: "",
  };
}
export const EventFundVestingAccount = {
  typeUrl: "/evmos.vesting.v2.EventFundVestingAccount",
  encode(message: EventFundVestingAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funder !== "") {
      writer.uint32(10).string(message.funder);
    }
    if (message.coins !== "") {
      writer.uint32(18).string(message.coins);
    }
    if (message.startTime !== "") {
      writer.uint32(26).string(message.startTime);
    }
    if (message.vestingAccount !== "") {
      writer.uint32(42).string(message.vestingAccount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventFundVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFundVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funder = reader.string();
          break;
        case 2:
          message.coins = reader.string();
          break;
        case 3:
          message.startTime = reader.string();
          break;
        case 5:
          message.vestingAccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventFundVestingAccount {
    const obj = createBaseEventFundVestingAccount();
    if (isSet(object.funder)) obj.funder = String(object.funder);
    if (isSet(object.coins)) obj.coins = String(object.coins);
    if (isSet(object.startTime)) obj.startTime = String(object.startTime);
    if (isSet(object.vestingAccount)) obj.vestingAccount = String(object.vestingAccount);
    return obj;
  },
  toJSON(message: EventFundVestingAccount): unknown {
    const obj: any = {};
    message.funder !== undefined && (obj.funder = message.funder);
    message.coins !== undefined && (obj.coins = message.coins);
    message.startTime !== undefined && (obj.startTime = message.startTime);
    message.vestingAccount !== undefined && (obj.vestingAccount = message.vestingAccount);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventFundVestingAccount>, I>>(object: I): EventFundVestingAccount {
    const message = createBaseEventFundVestingAccount();
    message.funder = object.funder ?? "";
    message.coins = object.coins ?? "";
    message.startTime = object.startTime ?? "";
    message.vestingAccount = object.vestingAccount ?? "";
    return message;
  },
};
function createBaseEventClawback(): EventClawback {
  return {
    funder: "",
    account: "",
    destination: "",
  };
}
export const EventClawback = {
  typeUrl: "/evmos.vesting.v2.EventClawback",
  encode(message: EventClawback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funder !== "") {
      writer.uint32(10).string(message.funder);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.destination !== "") {
      writer.uint32(26).string(message.destination);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventClawback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClawback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funder = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.destination = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventClawback {
    const obj = createBaseEventClawback();
    if (isSet(object.funder)) obj.funder = String(object.funder);
    if (isSet(object.account)) obj.account = String(object.account);
    if (isSet(object.destination)) obj.destination = String(object.destination);
    return obj;
  },
  toJSON(message: EventClawback): unknown {
    const obj: any = {};
    message.funder !== undefined && (obj.funder = message.funder);
    message.account !== undefined && (obj.account = message.account);
    message.destination !== undefined && (obj.destination = message.destination);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventClawback>, I>>(object: I): EventClawback {
    const message = createBaseEventClawback();
    message.funder = object.funder ?? "";
    message.account = object.account ?? "";
    message.destination = object.destination ?? "";
    return message;
  },
};
function createBaseEventUpdateVestingFunder(): EventUpdateVestingFunder {
  return {
    funder: "",
    account: "",
    newFunder: "",
  };
}
export const EventUpdateVestingFunder = {
  typeUrl: "/evmos.vesting.v2.EventUpdateVestingFunder",
  encode(message: EventUpdateVestingFunder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funder !== "") {
      writer.uint32(10).string(message.funder);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.newFunder !== "") {
      writer.uint32(26).string(message.newFunder);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateVestingFunder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateVestingFunder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funder = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.newFunder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventUpdateVestingFunder {
    const obj = createBaseEventUpdateVestingFunder();
    if (isSet(object.funder)) obj.funder = String(object.funder);
    if (isSet(object.account)) obj.account = String(object.account);
    if (isSet(object.newFunder)) obj.newFunder = String(object.newFunder);
    return obj;
  },
  toJSON(message: EventUpdateVestingFunder): unknown {
    const obj: any = {};
    message.funder !== undefined && (obj.funder = message.funder);
    message.account !== undefined && (obj.account = message.account);
    message.newFunder !== undefined && (obj.newFunder = message.newFunder);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventUpdateVestingFunder>, I>>(
    object: I,
  ): EventUpdateVestingFunder {
    const message = createBaseEventUpdateVestingFunder();
    message.funder = object.funder ?? "";
    message.account = object.account ?? "";
    message.newFunder = object.newFunder ?? "";
    return message;
  },
};
