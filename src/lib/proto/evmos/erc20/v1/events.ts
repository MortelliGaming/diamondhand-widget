/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.erc20.v1";
/** EventRegisterPair is an event emitted when a coin is registered. */
export interface EventRegisterPair {
  /** denom is the coin's denomination. */
  denom: string;
  /** erc20_address is the ERC20 contract address. */
  erc20Address: string;
}
/** EventToggleTokenConversion is an event emitted when a coin's token conversion is toggled. */
export interface EventToggleTokenConversion {
  /** denom is the coin's denomination. */
  denom: string;
  /** erc20_address is the ERC20 contract address. */
  erc20Address: string;
}
/** EventConvertCoin is an event emitted when a coin is converted. */
export interface EventConvertCoin {
  /** sender is the sender's address. */
  sender: string;
  /** receiver is the receiver's address. */
  receiver: string;
  /** amount is the amount of coins to be converted. */
  amount: string;
  /** denom is the coin's denomination. */
  denom: string;
  /** erc20_address is the ERC20 contract address. */
  erc20Address: string;
}
/** EventConvertERC20 is an event emitted when an ERC20 is converted. */
export interface EventConvertERC20 {
  /** sender is the sender's address. */
  sender: string;
  /** receiver is the receiver's address. */
  receiver: string;
  /** amount is the amount of coins to be converted. */
  amount: string;
  /** denom is the coin's denomination. */
  denom: string;
  /** contract_address of an ERC20 token contract, that is registered in a token pair */
  contractAddress: string;
}
function createBaseEventRegisterPair(): EventRegisterPair {
  return {
    denom: "",
    erc20Address: "",
  };
}
export const EventRegisterPair = {
  typeUrl: "/evmos.erc20.v1.EventRegisterPair",
  encode(message: EventRegisterPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.erc20Address !== "") {
      writer.uint32(18).string(message.erc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventRegisterPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRegisterPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.erc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventRegisterPair {
    const obj = createBaseEventRegisterPair();
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.erc20Address)) obj.erc20Address = String(object.erc20Address);
    return obj;
  },
  toJSON(message: EventRegisterPair): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.erc20Address !== undefined && (obj.erc20Address = message.erc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventRegisterPair>, I>>(object: I): EventRegisterPair {
    const message = createBaseEventRegisterPair();
    message.denom = object.denom ?? "";
    message.erc20Address = object.erc20Address ?? "";
    return message;
  },
};
function createBaseEventToggleTokenConversion(): EventToggleTokenConversion {
  return {
    denom: "",
    erc20Address: "",
  };
}
export const EventToggleTokenConversion = {
  typeUrl: "/evmos.erc20.v1.EventToggleTokenConversion",
  encode(message: EventToggleTokenConversion, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.erc20Address !== "") {
      writer.uint32(18).string(message.erc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventToggleTokenConversion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventToggleTokenConversion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.erc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventToggleTokenConversion {
    const obj = createBaseEventToggleTokenConversion();
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.erc20Address)) obj.erc20Address = String(object.erc20Address);
    return obj;
  },
  toJSON(message: EventToggleTokenConversion): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.erc20Address !== undefined && (obj.erc20Address = message.erc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventToggleTokenConversion>, I>>(
    object: I,
  ): EventToggleTokenConversion {
    const message = createBaseEventToggleTokenConversion();
    message.denom = object.denom ?? "";
    message.erc20Address = object.erc20Address ?? "";
    return message;
  },
};
function createBaseEventConvertCoin(): EventConvertCoin {
  return {
    sender: "",
    receiver: "",
    amount: "",
    denom: "",
    erc20Address: "",
  };
}
export const EventConvertCoin = {
  typeUrl: "/evmos.erc20.v1.EventConvertCoin",
  encode(message: EventConvertCoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.erc20Address !== "") {
      writer.uint32(42).string(message.erc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventConvertCoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventConvertCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.denom = reader.string();
          break;
        case 5:
          message.erc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventConvertCoin {
    const obj = createBaseEventConvertCoin();
    if (isSet(object.sender)) obj.sender = String(object.sender);
    if (isSet(object.receiver)) obj.receiver = String(object.receiver);
    if (isSet(object.amount)) obj.amount = String(object.amount);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.erc20Address)) obj.erc20Address = String(object.erc20Address);
    return obj;
  },
  toJSON(message: EventConvertCoin): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.amount !== undefined && (obj.amount = message.amount);
    message.denom !== undefined && (obj.denom = message.denom);
    message.erc20Address !== undefined && (obj.erc20Address = message.erc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventConvertCoin>, I>>(object: I): EventConvertCoin {
    const message = createBaseEventConvertCoin();
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.amount = object.amount ?? "";
    message.denom = object.denom ?? "";
    message.erc20Address = object.erc20Address ?? "";
    return message;
  },
};
function createBaseEventConvertERC20(): EventConvertERC20 {
  return {
    sender: "",
    receiver: "",
    amount: "",
    denom: "",
    contractAddress: "",
  };
}
export const EventConvertERC20 = {
  typeUrl: "/evmos.erc20.v1.EventConvertERC20",
  encode(message: EventConvertERC20, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.contractAddress !== "") {
      writer.uint32(42).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventConvertERC20 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventConvertERC20();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.denom = reader.string();
          break;
        case 5:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventConvertERC20 {
    const obj = createBaseEventConvertERC20();
    if (isSet(object.sender)) obj.sender = String(object.sender);
    if (isSet(object.receiver)) obj.receiver = String(object.receiver);
    if (isSet(object.amount)) obj.amount = String(object.amount);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.contractAddress)) obj.contractAddress = String(object.contractAddress);
    return obj;
  },
  toJSON(message: EventConvertERC20): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.amount !== undefined && (obj.amount = message.amount);
    message.denom !== undefined && (obj.denom = message.denom);
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventConvertERC20>, I>>(object: I): EventConvertERC20 {
    const message = createBaseEventConvertERC20();
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.amount = object.amount ?? "";
    message.denom = object.denom ?? "";
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
};
