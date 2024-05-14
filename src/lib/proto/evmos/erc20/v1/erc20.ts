/* eslint-disable */
import { Metadata } from "../../../cosmos/bank/v1beta1/bank";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.erc20.v1";
/** Owner enumerates the ownership of a ERC20 contract. */
export enum Owner {
  /** OWNER_UNSPECIFIED - OWNER_UNSPECIFIED defines an invalid/undefined owner. */
  OWNER_UNSPECIFIED = 0,
  /** OWNER_MODULE - OWNER_MODULE - erc20 is owned by the erc20 module account. */
  OWNER_MODULE = 1,
  /** OWNER_EXTERNAL - OWNER_EXTERNAL - erc20 is owned by an external account. */
  OWNER_EXTERNAL = 2,
  UNRECOGNIZED = -1,
}
export function ownerFromJSON(object: any): Owner {
  switch (object) {
    case 0:
    case "OWNER_UNSPECIFIED":
      return Owner.OWNER_UNSPECIFIED;
    case 1:
    case "OWNER_MODULE":
      return Owner.OWNER_MODULE;
    case 2:
    case "OWNER_EXTERNAL":
      return Owner.OWNER_EXTERNAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Owner.UNRECOGNIZED;
  }
}
export function ownerToJSON(object: Owner): string {
  switch (object) {
    case Owner.OWNER_UNSPECIFIED:
      return "OWNER_UNSPECIFIED";
    case Owner.OWNER_MODULE:
      return "OWNER_MODULE";
    case Owner.OWNER_EXTERNAL:
      return "OWNER_EXTERNAL";
    case Owner.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * TokenPair defines an instance that records a pairing consisting of a native
 * Cosmos Coin and an ERC20 token address.
 */
export interface TokenPair {
  /** erc20_address is the hex address of ERC20 contract token */
  erc20Address: string;
  /** denom defines the cosmos base denomination to be mapped to */
  denom: string;
  /** enabled defines the token mapping enable status */
  enabled: boolean;
  /** contract_owner is the an ENUM specifying the type of ERC20 owner (0 invalid, 1 ModuleAccount, 2 external address) */
  contractOwner: Owner;
}
/**
 * Deprecated: RegisterCoinProposal is a gov Content type to register a token pair for a
 * native Cosmos coin. We're keeping it to remove the existing proposals from
 * store. After that, remove this message.
 */
export interface RegisterCoinProposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
  /** metadata slice of the native Cosmos coins */
  metadata: Metadata[];
}
/**
 * Deprecated: ProposalMetadata is used to parse a slice of denom metadata and generate
 * the RegisterCoinProposal content. We're keeping it to remove the existing proposals from
 * store. After that, remove this message.
 */
export interface ProposalMetadata {
  /** metadata slice of the native Cosmos coins */
  metadata: Metadata[];
}
/**
 * RegisterERC20Proposal is a gov Content type to register a token pair for an
 * ERC20 token
 */
export interface RegisterERC20Proposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
  /** erc20addresses is a slice of  ERC20 token contract addresses */
  erc20addresses: string[];
}
/**
 * ToggleTokenConversionProposal is a gov Content type to toggle the conversion
 * of a token pair.
 */
export interface ToggleTokenConversionProposal {
  /** title of the proposal */
  title: string;
  /** description of the proposal */
  description: string;
  /**
   * token identifier can be either the hex contract address of the ERC20 or the
   * Cosmos base denomination
   */
  token: string;
}
function createBaseTokenPair(): TokenPair {
  return {
    erc20Address: "",
    denom: "",
    enabled: false,
    contractOwner: 0,
  };
}
export const TokenPair = {
  typeUrl: "/evmos.erc20.v1.TokenPair",
  encode(message: TokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.erc20Address !== "") {
      writer.uint32(10).string(message.erc20Address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    if (message.contractOwner !== 0) {
      writer.uint32(32).int32(message.contractOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.erc20Address = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.enabled = reader.bool();
          break;
        case 4:
          message.contractOwner = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TokenPair {
    const obj = createBaseTokenPair();
    if (isSet(object.erc20Address)) obj.erc20Address = String(object.erc20Address);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.enabled)) obj.enabled = Boolean(object.enabled);
    if (isSet(object.contractOwner)) obj.contractOwner = ownerFromJSON(object.contractOwner);
    return obj;
  },
  toJSON(message: TokenPair): unknown {
    const obj: any = {};
    message.erc20Address !== undefined && (obj.erc20Address = message.erc20Address);
    message.denom !== undefined && (obj.denom = message.denom);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.contractOwner !== undefined && (obj.contractOwner = ownerToJSON(message.contractOwner));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<TokenPair>, I>>(object: I): TokenPair {
    const message = createBaseTokenPair();
    message.erc20Address = object.erc20Address ?? "";
    message.denom = object.denom ?? "";
    message.enabled = object.enabled ?? false;
    message.contractOwner = object.contractOwner ?? 0;
    return message;
  },
};
function createBaseRegisterCoinProposal(): RegisterCoinProposal {
  return {
    title: "",
    description: "",
    metadata: [],
  };
}
export const RegisterCoinProposal = {
  typeUrl: "/evmos.erc20.v1.RegisterCoinProposal",
  encode(message: RegisterCoinProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.metadata) {
      Metadata.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RegisterCoinProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterCoinProposal();
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
          message.metadata.push(Metadata.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterCoinProposal {
    const obj = createBaseRegisterCoinProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (Array.isArray(object?.metadata)) obj.metadata = object.metadata.map((e: any) => Metadata.fromJSON(e));
    return obj;
  },
  toJSON(message: RegisterCoinProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.metadata) {
      obj.metadata = message.metadata.map((e) => (e ? Metadata.toJSON(e) : undefined));
    } else {
      obj.metadata = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<RegisterCoinProposal>, I>>(object: I): RegisterCoinProposal {
    const message = createBaseRegisterCoinProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.metadata = object.metadata?.map((e) => Metadata.fromPartial(e)) || [];
    return message;
  },
};
function createBaseProposalMetadata(): ProposalMetadata {
  return {
    metadata: [],
  };
}
export const ProposalMetadata = {
  typeUrl: "/evmos.erc20.v1.ProposalMetadata",
  encode(message: ProposalMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.metadata) {
      Metadata.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProposalMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposalMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata.push(Metadata.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProposalMetadata {
    const obj = createBaseProposalMetadata();
    if (Array.isArray(object?.metadata)) obj.metadata = object.metadata.map((e: any) => Metadata.fromJSON(e));
    return obj;
  },
  toJSON(message: ProposalMetadata): unknown {
    const obj: any = {};
    if (message.metadata) {
      obj.metadata = message.metadata.map((e) => (e ? Metadata.toJSON(e) : undefined));
    } else {
      obj.metadata = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ProposalMetadata>, I>>(object: I): ProposalMetadata {
    const message = createBaseProposalMetadata();
    message.metadata = object.metadata?.map((e) => Metadata.fromPartial(e)) || [];
    return message;
  },
};
function createBaseRegisterERC20Proposal(): RegisterERC20Proposal {
  return {
    title: "",
    description: "",
    erc20addresses: [],
  };
}
export const RegisterERC20Proposal = {
  typeUrl: "/evmos.erc20.v1.RegisterERC20Proposal",
  encode(message: RegisterERC20Proposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.erc20addresses) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RegisterERC20Proposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterERC20Proposal();
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
          message.erc20addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterERC20Proposal {
    const obj = createBaseRegisterERC20Proposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (Array.isArray(object?.erc20addresses))
      obj.erc20addresses = object.erc20addresses.map((e: any) => String(e));
    return obj;
  },
  toJSON(message: RegisterERC20Proposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.erc20addresses) {
      obj.erc20addresses = message.erc20addresses.map((e) => e);
    } else {
      obj.erc20addresses = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<RegisterERC20Proposal>, I>>(object: I): RegisterERC20Proposal {
    const message = createBaseRegisterERC20Proposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.erc20addresses = object.erc20addresses?.map((e) => e) || [];
    return message;
  },
};
function createBaseToggleTokenConversionProposal(): ToggleTokenConversionProposal {
  return {
    title: "",
    description: "",
    token: "",
  };
}
export const ToggleTokenConversionProposal = {
  typeUrl: "/evmos.erc20.v1.ToggleTokenConversionProposal",
  encode(message: ToggleTokenConversionProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ToggleTokenConversionProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToggleTokenConversionProposal();
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
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ToggleTokenConversionProposal {
    const obj = createBaseToggleTokenConversionProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.token)) obj.token = String(object.token);
    return obj;
  },
  toJSON(message: ToggleTokenConversionProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ToggleTokenConversionProposal>, I>>(
    object: I,
  ): ToggleTokenConversionProposal {
    const message = createBaseToggleTokenConversionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.token = object.token ?? "";
    return message;
  },
};
