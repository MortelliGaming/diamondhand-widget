/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Period } from "../../../cosmos/vesting/v1beta1/vesting";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, fromJsonTimestamp, fromTimestamp, Rpc } from "../../../helpers";
export const protobufPackage = "evmos.vesting.v2";
/**
 * MsgCreateClawbackVestingAccount defines a message that enables creating a
 * ClawbackVestingAccount.
 */
export interface MsgCreateClawbackVestingAccount {
  /** funder_address specifies the account that will be able to fund the vesting account */
  funderAddress: string;
  /** vesting_address specifies the address that will receive the vesting tokens */
  vestingAddress: string;
  /** enable_gov_clawback specifies whether the governance module can clawback this account */
  enableGovClawback: boolean;
}
/**
 * MsgCreateClawbackVestingAccountResponse defines the
 * MsgCreateClawbackVestingAccount response type.
 */
export interface MsgCreateClawbackVestingAccountResponse {}
/**
 * MsgFundVestingAccount defines a message that enables funding an existing clawback
 * vesting account.
 */
export interface MsgFundVestingAccount {
  /** funder_address specifies the account that funds the vesting account */
  funderAddress: string;
  /** vesting_address specifies the account that receives the funds */
  vestingAddress: string;
  /** start_time defines the time at which the vesting period begins */
  startTime: Timestamp;
  /** lockup_periods defines the unlocking schedule relative to the start_time */
  lockupPeriods: Period[];
  /** vesting_periods defines the vesting schedule relative to the start_time */
  vestingPeriods: Period[];
}
/**
 * MsgFundVestingAccountResponse defines the
 * MsgFundVestingAccount response type.
 */
export interface MsgFundVestingAccountResponse {}
/**
 * MsgClawback defines a message that removes unvested tokens from a
 * ClawbackVestingAccount.
 */
export interface MsgClawback {
  /** funder_address is the address which funded the account */
  funderAddress: string;
  /**
   * account_address is the address of the ClawbackVestingAccount to claw back
   * from.
   */
  accountAddress: string;
  /**
   * dest_address specifies where the clawed-back tokens should be transferred
   * to. If empty, the tokens will be transferred back to the original funder of
   * the account.
   */
  destAddress: string;
}
/** MsgClawbackResponse defines the MsgClawback response type. */
export interface MsgClawbackResponse {
  /** coins is the slice of clawed back coins */
  coins: Coin[];
}
/**
 * MsgUpdateVestingFunder defines a message that updates the funder account of a
 * ClawbackVestingAccount.
 */
export interface MsgUpdateVestingFunder {
  /** funder_address is the current funder address of the ClawbackVestingAccount */
  funderAddress: string;
  /** new_funder_address is the new address to replace the existing funder_address */
  newFunderAddress: string;
  /** vesting_address is the address of the ClawbackVestingAccount being updated */
  vestingAddress: string;
}
/**
 * MsgUpdateVestingFunderResponse defines the MsgUpdateVestingFunder response
 * type.
 */
export interface MsgUpdateVestingFunderResponse {}
/** MsgConvertVestingAccount defines a message that enables converting a vesting account to an eth account */
export interface MsgConvertVestingAccount {
  /** vesting_address is the address of the vesting account to convert */
  vestingAddress: string;
}
/** MsgConvertVestingAccountResponse defines the MsgConvertVestingAccount response type. */
export interface MsgConvertVestingAccountResponse {}
function createBaseMsgCreateClawbackVestingAccount(): MsgCreateClawbackVestingAccount {
  return {
    funderAddress: "",
    vestingAddress: "",
    enableGovClawback: false,
  };
}
export const MsgCreateClawbackVestingAccount = {
  typeUrl: "/evmos.vesting.v2.MsgCreateClawbackVestingAccount",
  encode(
    message: MsgCreateClawbackVestingAccount,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.funderAddress !== "") {
      writer.uint32(10).string(message.funderAddress);
    }
    if (message.vestingAddress !== "") {
      writer.uint32(18).string(message.vestingAddress);
    }
    if (message.enableGovClawback === true) {
      writer.uint32(24).bool(message.enableGovClawback);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateClawbackVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClawbackVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funderAddress = reader.string();
          break;
        case 2:
          message.vestingAddress = reader.string();
          break;
        case 3:
          message.enableGovClawback = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateClawbackVestingAccount {
    const obj = createBaseMsgCreateClawbackVestingAccount();
    if (isSet(object.funderAddress)) obj.funderAddress = String(object.funderAddress);
    if (isSet(object.vestingAddress)) obj.vestingAddress = String(object.vestingAddress);
    if (isSet(object.enableGovClawback)) obj.enableGovClawback = Boolean(object.enableGovClawback);
    return obj;
  },
  toJSON(message: MsgCreateClawbackVestingAccount): unknown {
    const obj: any = {};
    message.funderAddress !== undefined && (obj.funderAddress = message.funderAddress);
    message.vestingAddress !== undefined && (obj.vestingAddress = message.vestingAddress);
    message.enableGovClawback !== undefined && (obj.enableGovClawback = message.enableGovClawback);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateClawbackVestingAccount>, I>>(
    object: I,
  ): MsgCreateClawbackVestingAccount {
    const message = createBaseMsgCreateClawbackVestingAccount();
    message.funderAddress = object.funderAddress ?? "";
    message.vestingAddress = object.vestingAddress ?? "";
    message.enableGovClawback = object.enableGovClawback ?? false;
    return message;
  },
};
function createBaseMsgCreateClawbackVestingAccountResponse(): MsgCreateClawbackVestingAccountResponse {
  return {};
}
export const MsgCreateClawbackVestingAccountResponse = {
  typeUrl: "/evmos.vesting.v2.MsgCreateClawbackVestingAccountResponse",
  encode(
    _: MsgCreateClawbackVestingAccountResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateClawbackVestingAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClawbackVestingAccountResponse();
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
  fromJSON(_: any): MsgCreateClawbackVestingAccountResponse {
    const obj = createBaseMsgCreateClawbackVestingAccountResponse();
    return obj;
  },
  toJSON(_: MsgCreateClawbackVestingAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateClawbackVestingAccountResponse>, I>>(
    _: I,
  ): MsgCreateClawbackVestingAccountResponse {
    const message = createBaseMsgCreateClawbackVestingAccountResponse();
    return message;
  },
};
function createBaseMsgFundVestingAccount(): MsgFundVestingAccount {
  return {
    funderAddress: "",
    vestingAddress: "",
    startTime: Timestamp.fromPartial({}),
    lockupPeriods: [],
    vestingPeriods: [],
  };
}
export const MsgFundVestingAccount = {
  typeUrl: "/evmos.vesting.v2.MsgFundVestingAccount",
  encode(message: MsgFundVestingAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funderAddress !== "") {
      writer.uint32(10).string(message.funderAddress);
    }
    if (message.vestingAddress !== "") {
      writer.uint32(18).string(message.vestingAddress);
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFundVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funderAddress = reader.string();
          break;
        case 2:
          message.vestingAddress = reader.string();
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
  fromJSON(object: any): MsgFundVestingAccount {
    const obj = createBaseMsgFundVestingAccount();
    if (isSet(object.funderAddress)) obj.funderAddress = String(object.funderAddress);
    if (isSet(object.vestingAddress)) obj.vestingAddress = String(object.vestingAddress);
    if (isSet(object.startTime)) obj.startTime = fromJsonTimestamp(object.startTime);
    if (Array.isArray(object?.lockupPeriods))
      obj.lockupPeriods = object.lockupPeriods.map((e: any) => Period.fromJSON(e));
    if (Array.isArray(object?.vestingPeriods))
      obj.vestingPeriods = object.vestingPeriods.map((e: any) => Period.fromJSON(e));
    return obj;
  },
  toJSON(message: MsgFundVestingAccount): unknown {
    const obj: any = {};
    message.funderAddress !== undefined && (obj.funderAddress = message.funderAddress);
    message.vestingAddress !== undefined && (obj.vestingAddress = message.vestingAddress);
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
  fromPartial<I extends Exact<DeepPartial<MsgFundVestingAccount>, I>>(object: I): MsgFundVestingAccount {
    const message = createBaseMsgFundVestingAccount();
    message.funderAddress = object.funderAddress ?? "";
    message.vestingAddress = object.vestingAddress ?? "";
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = Timestamp.fromPartial(object.startTime);
    }
    message.lockupPeriods = object.lockupPeriods?.map((e) => Period.fromPartial(e)) || [];
    message.vestingPeriods = object.vestingPeriods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
};
function createBaseMsgFundVestingAccountResponse(): MsgFundVestingAccountResponse {
  return {};
}
export const MsgFundVestingAccountResponse = {
  typeUrl: "/evmos.vesting.v2.MsgFundVestingAccountResponse",
  encode(_: MsgFundVestingAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgFundVestingAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundVestingAccountResponse();
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
  fromJSON(_: any): MsgFundVestingAccountResponse {
    const obj = createBaseMsgFundVestingAccountResponse();
    return obj;
  },
  toJSON(_: MsgFundVestingAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgFundVestingAccountResponse>, I>>(
    _: I,
  ): MsgFundVestingAccountResponse {
    const message = createBaseMsgFundVestingAccountResponse();
    return message;
  },
};
function createBaseMsgClawback(): MsgClawback {
  return {
    funderAddress: "",
    accountAddress: "",
    destAddress: "",
  };
}
export const MsgClawback = {
  typeUrl: "/evmos.vesting.v2.MsgClawback",
  encode(message: MsgClawback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funderAddress !== "") {
      writer.uint32(10).string(message.funderAddress);
    }
    if (message.accountAddress !== "") {
      writer.uint32(18).string(message.accountAddress);
    }
    if (message.destAddress !== "") {
      writer.uint32(26).string(message.destAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClawback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClawback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funderAddress = reader.string();
          break;
        case 2:
          message.accountAddress = reader.string();
          break;
        case 3:
          message.destAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgClawback {
    const obj = createBaseMsgClawback();
    if (isSet(object.funderAddress)) obj.funderAddress = String(object.funderAddress);
    if (isSet(object.accountAddress)) obj.accountAddress = String(object.accountAddress);
    if (isSet(object.destAddress)) obj.destAddress = String(object.destAddress);
    return obj;
  },
  toJSON(message: MsgClawback): unknown {
    const obj: any = {};
    message.funderAddress !== undefined && (obj.funderAddress = message.funderAddress);
    message.accountAddress !== undefined && (obj.accountAddress = message.accountAddress);
    message.destAddress !== undefined && (obj.destAddress = message.destAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgClawback>, I>>(object: I): MsgClawback {
    const message = createBaseMsgClawback();
    message.funderAddress = object.funderAddress ?? "";
    message.accountAddress = object.accountAddress ?? "";
    message.destAddress = object.destAddress ?? "";
    return message;
  },
};
function createBaseMsgClawbackResponse(): MsgClawbackResponse {
  return {
    coins: [],
  };
}
export const MsgClawbackResponse = {
  typeUrl: "/evmos.vesting.v2.MsgClawbackResponse",
  encode(message: MsgClawbackResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgClawbackResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClawbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgClawbackResponse {
    const obj = createBaseMsgClawbackResponse();
    if (Array.isArray(object?.coins)) obj.coins = object.coins.map((e: any) => Coin.fromJSON(e));
    return obj;
  },
  toJSON(message: MsgClawbackResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgClawbackResponse>, I>>(object: I): MsgClawbackResponse {
    const message = createBaseMsgClawbackResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};
function createBaseMsgUpdateVestingFunder(): MsgUpdateVestingFunder {
  return {
    funderAddress: "",
    newFunderAddress: "",
    vestingAddress: "",
  };
}
export const MsgUpdateVestingFunder = {
  typeUrl: "/evmos.vesting.v2.MsgUpdateVestingFunder",
  encode(message: MsgUpdateVestingFunder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.funderAddress !== "") {
      writer.uint32(10).string(message.funderAddress);
    }
    if (message.newFunderAddress !== "") {
      writer.uint32(18).string(message.newFunderAddress);
    }
    if (message.vestingAddress !== "") {
      writer.uint32(26).string(message.vestingAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateVestingFunder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateVestingFunder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funderAddress = reader.string();
          break;
        case 2:
          message.newFunderAddress = reader.string();
          break;
        case 3:
          message.vestingAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateVestingFunder {
    const obj = createBaseMsgUpdateVestingFunder();
    if (isSet(object.funderAddress)) obj.funderAddress = String(object.funderAddress);
    if (isSet(object.newFunderAddress)) obj.newFunderAddress = String(object.newFunderAddress);
    if (isSet(object.vestingAddress)) obj.vestingAddress = String(object.vestingAddress);
    return obj;
  },
  toJSON(message: MsgUpdateVestingFunder): unknown {
    const obj: any = {};
    message.funderAddress !== undefined && (obj.funderAddress = message.funderAddress);
    message.newFunderAddress !== undefined && (obj.newFunderAddress = message.newFunderAddress);
    message.vestingAddress !== undefined && (obj.vestingAddress = message.vestingAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateVestingFunder>, I>>(object: I): MsgUpdateVestingFunder {
    const message = createBaseMsgUpdateVestingFunder();
    message.funderAddress = object.funderAddress ?? "";
    message.newFunderAddress = object.newFunderAddress ?? "";
    message.vestingAddress = object.vestingAddress ?? "";
    return message;
  },
};
function createBaseMsgUpdateVestingFunderResponse(): MsgUpdateVestingFunderResponse {
  return {};
}
export const MsgUpdateVestingFunderResponse = {
  typeUrl: "/evmos.vesting.v2.MsgUpdateVestingFunderResponse",
  encode(_: MsgUpdateVestingFunderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateVestingFunderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateVestingFunderResponse();
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
  fromJSON(_: any): MsgUpdateVestingFunderResponse {
    const obj = createBaseMsgUpdateVestingFunderResponse();
    return obj;
  },
  toJSON(_: MsgUpdateVestingFunderResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateVestingFunderResponse>, I>>(
    _: I,
  ): MsgUpdateVestingFunderResponse {
    const message = createBaseMsgUpdateVestingFunderResponse();
    return message;
  },
};
function createBaseMsgConvertVestingAccount(): MsgConvertVestingAccount {
  return {
    vestingAddress: "",
  };
}
export const MsgConvertVestingAccount = {
  typeUrl: "/evmos.vesting.v2.MsgConvertVestingAccount",
  encode(message: MsgConvertVestingAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vestingAddress !== "") {
      writer.uint32(10).string(message.vestingAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vestingAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConvertVestingAccount {
    const obj = createBaseMsgConvertVestingAccount();
    if (isSet(object.vestingAddress)) obj.vestingAddress = String(object.vestingAddress);
    return obj;
  },
  toJSON(message: MsgConvertVestingAccount): unknown {
    const obj: any = {};
    message.vestingAddress !== undefined && (obj.vestingAddress = message.vestingAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertVestingAccount>, I>>(
    object: I,
  ): MsgConvertVestingAccount {
    const message = createBaseMsgConvertVestingAccount();
    message.vestingAddress = object.vestingAddress ?? "";
    return message;
  },
};
function createBaseMsgConvertVestingAccountResponse(): MsgConvertVestingAccountResponse {
  return {};
}
export const MsgConvertVestingAccountResponse = {
  typeUrl: "/evmos.vesting.v2.MsgConvertVestingAccountResponse",
  encode(_: MsgConvertVestingAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertVestingAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertVestingAccountResponse();
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
  fromJSON(_: any): MsgConvertVestingAccountResponse {
    const obj = createBaseMsgConvertVestingAccountResponse();
    return obj;
  },
  toJSON(_: MsgConvertVestingAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertVestingAccountResponse>, I>>(
    _: I,
  ): MsgConvertVestingAccountResponse {
    const message = createBaseMsgConvertVestingAccountResponse();
    return message;
  },
};
/** Msg defines the vesting Msg service. */
export interface Msg {
  /** CreateClawbackVestingAccount creats a vesting account that is subject to clawback. */
  CreateClawbackVestingAccount(
    request: MsgCreateClawbackVestingAccount,
  ): Promise<MsgCreateClawbackVestingAccountResponse>;
  /**
   * FundVestingAccount funds an existing ClawbackVestingAccount with tokens
   * according to the vesting and lockup schedules.
   */
  FundVestingAccount(request: MsgFundVestingAccount): Promise<MsgFundVestingAccountResponse>;
  /** Clawback removes the unvested tokens from a ClawbackVestingAccount. */
  Clawback(request: MsgClawback): Promise<MsgClawbackResponse>;
  /**
   * UpdateVestingFunder updates the funder address of an existing
   * ClawbackVestingAccount.
   */
  UpdateVestingFunder(request: MsgUpdateVestingFunder): Promise<MsgUpdateVestingFunderResponse>;
  /** ConvertVestingAccount converts a ClawbackVestingAccount to an Eth account */
  ConvertVestingAccount(request: MsgConvertVestingAccount): Promise<MsgConvertVestingAccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateClawbackVestingAccount = this.CreateClawbackVestingAccount.bind(this);
    this.FundVestingAccount = this.FundVestingAccount.bind(this);
    this.Clawback = this.Clawback.bind(this);
    this.UpdateVestingFunder = this.UpdateVestingFunder.bind(this);
    this.ConvertVestingAccount = this.ConvertVestingAccount.bind(this);
  }
  CreateClawbackVestingAccount(
    request: MsgCreateClawbackVestingAccount,
  ): Promise<MsgCreateClawbackVestingAccountResponse> {
    const data = MsgCreateClawbackVestingAccount.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Msg", "CreateClawbackVestingAccount", data);
    return promise.then((data) => MsgCreateClawbackVestingAccountResponse.decode(new BinaryReader(data)));
  }
  FundVestingAccount(request: MsgFundVestingAccount): Promise<MsgFundVestingAccountResponse> {
    const data = MsgFundVestingAccount.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Msg", "FundVestingAccount", data);
    return promise.then((data) => MsgFundVestingAccountResponse.decode(new BinaryReader(data)));
  }
  Clawback(request: MsgClawback): Promise<MsgClawbackResponse> {
    const data = MsgClawback.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Msg", "Clawback", data);
    return promise.then((data) => MsgClawbackResponse.decode(new BinaryReader(data)));
  }
  UpdateVestingFunder(request: MsgUpdateVestingFunder): Promise<MsgUpdateVestingFunderResponse> {
    const data = MsgUpdateVestingFunder.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Msg", "UpdateVestingFunder", data);
    return promise.then((data) => MsgUpdateVestingFunderResponse.decode(new BinaryReader(data)));
  }
  ConvertVestingAccount(request: MsgConvertVestingAccount): Promise<MsgConvertVestingAccountResponse> {
    const data = MsgConvertVestingAccount.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Msg", "ConvertVestingAccount", data);
    return promise.then((data) => MsgConvertVestingAccountResponse.decode(new BinaryReader(data)));
  }
}
