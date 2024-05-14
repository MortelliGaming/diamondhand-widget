/* eslint-disable */
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { EpochInfo } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
export const protobufPackage = "evmos.epochs.v1";
/**
 * QueryEpochsInfoRequest is the request type for the Query/EpochInfos RPC
 * method.
 */
export interface QueryEpochsInfoRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/**
 * QueryEpochsInfoResponse is the response type for the Query/EpochInfos RPC
 * method.
 */
export interface QueryEpochsInfoResponse {
  /** epochs is a slice of all EpochInfos */
  epochs: EpochInfo[];
  /** pagination defines an optional pagination for the request. */
  pagination?: PageResponse;
}
/**
 * QueryCurrentEpochRequest is the request type for the Query/EpochInfos RPC
 * method.
 */
export interface QueryCurrentEpochRequest {
  /** identifier of the current epoch */
  identifier: string;
}
/**
 * QueryCurrentEpochResponse is the response type for the Query/EpochInfos RPC
 * method.
 */
export interface QueryCurrentEpochResponse {
  /** current_epoch is the number of the current epoch */
  currentEpoch: bigint;
}
function createBaseQueryEpochsInfoRequest(): QueryEpochsInfoRequest {
  return {
    pagination: undefined,
  };
}
export const QueryEpochsInfoRequest = {
  typeUrl: "/evmos.epochs.v1.QueryEpochsInfoRequest",
  encode(message: QueryEpochsInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochsInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochsInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryEpochsInfoRequest {
    const obj = createBaseQueryEpochsInfoRequest();
    if (isSet(object.pagination)) obj.pagination = PageRequest.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryEpochsInfoRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochsInfoRequest>, I>>(object: I): QueryEpochsInfoRequest {
    const message = createBaseQueryEpochsInfoRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryEpochsInfoResponse(): QueryEpochsInfoResponse {
  return {
    epochs: [],
    pagination: undefined,
  };
}
export const QueryEpochsInfoResponse = {
  typeUrl: "/evmos.epochs.v1.QueryEpochsInfoResponse",
  encode(message: QueryEpochsInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.epochs) {
      EpochInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochsInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochsInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochs.push(EpochInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryEpochsInfoResponse {
    const obj = createBaseQueryEpochsInfoResponse();
    if (Array.isArray(object?.epochs)) obj.epochs = object.epochs.map((e: any) => EpochInfo.fromJSON(e));
    if (isSet(object.pagination)) obj.pagination = PageResponse.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryEpochsInfoResponse): unknown {
    const obj: any = {};
    if (message.epochs) {
      obj.epochs = message.epochs.map((e) => (e ? EpochInfo.toJSON(e) : undefined));
    } else {
      obj.epochs = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochsInfoResponse>, I>>(object: I): QueryEpochsInfoResponse {
    const message = createBaseQueryEpochsInfoResponse();
    message.epochs = object.epochs?.map((e) => EpochInfo.fromPartial(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryCurrentEpochRequest(): QueryCurrentEpochRequest {
  return {
    identifier: "",
  };
}
export const QueryCurrentEpochRequest = {
  typeUrl: "/evmos.epochs.v1.QueryCurrentEpochRequest",
  encode(message: QueryCurrentEpochRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentEpochRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCurrentEpochRequest {
    const obj = createBaseQueryCurrentEpochRequest();
    if (isSet(object.identifier)) obj.identifier = String(object.identifier);
    return obj;
  },
  toJSON(message: QueryCurrentEpochRequest): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentEpochRequest>, I>>(
    object: I,
  ): QueryCurrentEpochRequest {
    const message = createBaseQueryCurrentEpochRequest();
    message.identifier = object.identifier ?? "";
    return message;
  },
};
function createBaseQueryCurrentEpochResponse(): QueryCurrentEpochResponse {
  return {
    currentEpoch: BigInt(0),
  };
}
export const QueryCurrentEpochResponse = {
  typeUrl: "/evmos.epochs.v1.QueryCurrentEpochResponse",
  encode(message: QueryCurrentEpochResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currentEpoch !== BigInt(0)) {
      writer.uint32(8).int64(message.currentEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentEpochResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentEpoch = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCurrentEpochResponse {
    const obj = createBaseQueryCurrentEpochResponse();
    if (isSet(object.currentEpoch)) obj.currentEpoch = BigInt(object.currentEpoch.toString());
    return obj;
  },
  toJSON(message: QueryCurrentEpochResponse): unknown {
    const obj: any = {};
    message.currentEpoch !== undefined && (obj.currentEpoch = (message.currentEpoch || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentEpochResponse>, I>>(
    object: I,
  ): QueryCurrentEpochResponse {
    const message = createBaseQueryCurrentEpochResponse();
    if (object.currentEpoch !== undefined && object.currentEpoch !== null) {
      message.currentEpoch = BigInt(object.currentEpoch.toString());
    }
    return message;
  },
};
/** Query defines the gRPC querier service. */
export interface Query {
  /** EpochInfos provide running epochInfos */
  EpochInfos(request?: QueryEpochsInfoRequest): Promise<QueryEpochsInfoResponse>;
  /** CurrentEpoch provide current epoch of specified identifier */
  CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.EpochInfos = this.EpochInfos.bind(this);
    this.CurrentEpoch = this.CurrentEpoch.bind(this);
  }
  EpochInfos(
    request: QueryEpochsInfoRequest = {
      pagination: PageRequest.fromPartial({}),
    },
  ): Promise<QueryEpochsInfoResponse> {
    const data = QueryEpochsInfoRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.epochs.v1.Query", "EpochInfos", data);
    return promise.then((data) => QueryEpochsInfoResponse.decode(new BinaryReader(data)));
  }
  CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse> {
    const data = QueryCurrentEpochRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.epochs.v1.Query", "CurrentEpoch", data);
    return promise.then((data) => QueryCurrentEpochResponse.decode(new BinaryReader(data)));
  }
}
