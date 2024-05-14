/* eslint-disable */
import { BaseVestingAccount, Period } from "../../../cosmos/vesting/v1beta1/vesting";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, fromJsonTimestamp, fromTimestamp, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.vesting.v2";
/**
 * ClawbackVestingAccount implements the VestingAccount interface. It provides
 * an account that can hold contributions subject to "lockup" (like a
 * PeriodicVestingAccount), or vesting which is subject to clawback
 * of unvested tokens, or a combination (tokens vest, but are still locked).
 */
export interface ClawbackVestingAccount {
  /**
   * base_vesting_account implements the VestingAccount interface. It contains
   * all the necessary fields needed for any vesting account implementation
   */
  baseVestingAccount?: BaseVestingAccount;
  /** funder_address specifies the account which can perform clawback */
  funderAddress: string;
  /** start_time defines the time at which the vesting period begins */
  startTime: Timestamp;
  /** lockup_periods defines the unlocking schedule relative to the start_time */
  lockupPeriods: Period[];
  /** vesting_periods defines the vesting schedule relative to the start_time */
  vestingPeriods: Period[];
}
/**
 * ClawbackProposal is a gov Content type to clawback funds
 * from a vesting account that has this functionality enabled.
 */
export interface ClawbackProposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
  /**
   * address is the vesting account address
   * to clawback the funds from
   */
  address: string;
  /**
   * destination_address is the address that will receive
   * the clawbacked funds from the given vesting account. When
   * empty, proposal will return the coins to the vesting
   * account funder.
   */
  destinationAddress: string;
}
function createBaseClawbackVestingAccount(): ClawbackVestingAccount {
  return {
    baseVestingAccount: undefined,
    funderAddress: "",
    startTime: Timestamp.fromPartial({}),
    lockupPeriods: [],
    vestingPeriods: [],
  };
}
export const ClawbackVestingAccount = {
  typeUrl: "/evmos.vesting.v2.ClawbackVestingAccount",
  encode(message: ClawbackVestingAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
    }
    if (message.funderAddress !== "") {
      writer.uint32(18).string(message.funderAddress);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(message.startTime, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.lockupPeriods) {
      Period.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.vestingPeriods) {
      Period.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClawbackVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawbackVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.funderAddress = reader.string();
          break;
        case 3:
          message.startTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 4:
          message.lockupPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        case 5:
          message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClawbackVestingAccount {
    const obj = createBaseClawbackVestingAccount();
    if (isSet(object.baseVestingAccount))
      obj.baseVestingAccount = BaseVestingAccount.fromJSON(object.baseVestingAccount);
    if (isSet(object.funderAddress)) obj.funderAddress = String(object.funderAddress);
    if (isSet(object.startTime)) obj.startTime = fromJsonTimestamp(object.startTime);
    if (Array.isArray(object?.lockupPeriods))
      obj.lockupPeriods = object.lockupPeriods.map((e: any) => Period.fromJSON(e));
    if (Array.isArray(object?.vestingPeriods))
      obj.vestingPeriods = object.vestingPeriods.map((e: any) => Period.fromJSON(e));
    return obj;
  },
  toJSON(message: ClawbackVestingAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    message.funderAddress !== undefined && (obj.funderAddress = message.funderAddress);
    message.startTime !== undefined && (obj.startTime = fromTimestamp(message.startTime).toISOString());
    if (message.lockupPeriods) {
      obj.lockupPeriods = message.lockupPeriods.map((e) => (e ? Period.toJSON(e) : undefined));
    } else {
      obj.lockupPeriods = [];
    }
    if (message.vestingPeriods) {
      obj.vestingPeriods = message.vestingPeriods.map((e) => (e ? Period.toJSON(e) : undefined));
    } else {
      obj.vestingPeriods = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ClawbackVestingAccount>, I>>(object: I): ClawbackVestingAccount {
    const message = createBaseClawbackVestingAccount();
    if (object.baseVestingAccount !== undefined && object.baseVestingAccount !== null) {
      message.baseVestingAccount = BaseVestingAccount.fromPartial(object.baseVestingAccount);
    }
    message.funderAddress = object.funderAddress ?? "";
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = Timestamp.fromPartial(object.startTime);
    }
    message.lockupPeriods = object.lockupPeriods?.map((e) => Period.fromPartial(e)) || [];
    message.vestingPeriods = object.vestingPeriods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
};
function createBaseClawbackProposal(): ClawbackProposal {
  return {
    title: "",
    description: "",
    address: "",
    destinationAddress: "",
  };
}
export const ClawbackProposal = {
  typeUrl: "/evmos.vesting.v2.ClawbackProposal",
  encode(message: ClawbackProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.destinationAddress !== "") {
      writer.uint32(34).string(message.destinationAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClawbackProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawbackProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.destinationAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClawbackProposal {
    const obj = createBaseClawbackProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.destinationAddress)) obj.destinationAddress = String(object.destinationAddress);
    return obj;
  },
  toJSON(message: ClawbackProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.address !== undefined && (obj.address = message.address);
    message.destinationAddress !== undefined && (obj.destinationAddress = message.destinationAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ClawbackProposal>, I>>(object: I): ClawbackProposal {
    const message = createBaseClawbackProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.address = object.address ?? "";
    message.destinationAddress = object.destinationAddress ?? "";
    return message;
  },
};
