/* eslint-disable */
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, Exact, isSet, Rpc } from "../../../helpers";
export const protobufPackage = "evmos.inflation.v1";
/** QueryPeriodRequest is the request type for the Query/Period RPC method. */
export interface QueryPeriodRequest {}
/** QueryPeriodResponse is the response type for the Query/Period RPC method. */
export interface QueryPeriodResponse {
  /** period is the current minting per epoch provision value. */
  period: bigint;
}
/**
 * QueryEpochMintProvisionRequest is the request type for the
 * Query/EpochMintProvision RPC method.
 */
export interface QueryEpochMintProvisionRequest {}
/**
 * QueryEpochMintProvisionResponse is the response type for the
 * Query/EpochMintProvision RPC method.
 */
export interface QueryEpochMintProvisionResponse {
  /** epoch_mint_provision is the current minting per epoch provision value. */
  epochMintProvision: DecCoin;
}
/**
 * QuerySkippedEpochsRequest is the request type for the Query/SkippedEpochs RPC
 * method.
 */
export interface QuerySkippedEpochsRequest {}
/**
 * QuerySkippedEpochsResponse is the response type for the Query/SkippedEpochs
 * RPC method.
 */
export interface QuerySkippedEpochsResponse {
  /** skipped_epochs is the number of epochs that the inflation module has been disabled. */
  skippedEpochs: bigint;
}
/**
 * QueryCirculatingSupplyRequest is the request type for the
 * Query/CirculatingSupply RPC method.
 */
export interface QueryCirculatingSupplyRequest {}
/**
 * QueryCirculatingSupplyResponse is the response type for the
 * Query/CirculatingSupply RPC method.
 */
export interface QueryCirculatingSupplyResponse {
  /** circulating_supply is the total amount of coins in circulation */
  circulatingSupply: DecCoin;
}
/**
 * QueryInflationRateRequest is the request type for the Query/InflationRate RPC
 * method.
 */
export interface QueryInflationRateRequest {}
/**
 * QueryInflationRateResponse is the response type for the Query/InflationRate
 * RPC method.
 */
export interface QueryInflationRateResponse {
  /** inflation_rate by which the total supply increases within one period */
  inflationRate: string;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params;
}
function createBaseQueryPeriodRequest(): QueryPeriodRequest {
  return {};
}
export const QueryPeriodRequest = {
  typeUrl: "/evmos.inflation.v1.QueryPeriodRequest",
  encode(_: QueryPeriodRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPeriodRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPeriodRequest();
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
  fromJSON(_: any): QueryPeriodRequest {
    const obj = createBaseQueryPeriodRequest();
    return obj;
  },
  toJSON(_: QueryPeriodRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPeriodRequest>, I>>(_: I): QueryPeriodRequest {
    const message = createBaseQueryPeriodRequest();
    return message;
  },
};
function createBaseQueryPeriodResponse(): QueryPeriodResponse {
  return {
    period: BigInt(0),
  };
}
export const QueryPeriodResponse = {
  typeUrl: "/evmos.inflation.v1.QueryPeriodResponse",
  encode(message: QueryPeriodResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.period !== BigInt(0)) {
      writer.uint32(8).uint64(message.period);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPeriodResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPeriodResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.period = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPeriodResponse {
    const obj = createBaseQueryPeriodResponse();
    if (isSet(object.period)) obj.period = BigInt(object.period.toString());
    return obj;
  },
  toJSON(message: QueryPeriodResponse): unknown {
    const obj: any = {};
    message.period !== undefined && (obj.period = (message.period || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPeriodResponse>, I>>(object: I): QueryPeriodResponse {
    const message = createBaseQueryPeriodResponse();
    if (object.period !== undefined && object.period !== null) {
      message.period = BigInt(object.period.toString());
    }
    return message;
  },
};
function createBaseQueryEpochMintProvisionRequest(): QueryEpochMintProvisionRequest {
  return {};
}
export const QueryEpochMintProvisionRequest = {
  typeUrl: "/evmos.inflation.v1.QueryEpochMintProvisionRequest",
  encode(_: QueryEpochMintProvisionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochMintProvisionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochMintProvisionRequest();
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
  fromJSON(_: any): QueryEpochMintProvisionRequest {
    const obj = createBaseQueryEpochMintProvisionRequest();
    return obj;
  },
  toJSON(_: QueryEpochMintProvisionRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochMintProvisionRequest>, I>>(
    _: I,
  ): QueryEpochMintProvisionRequest {
    const message = createBaseQueryEpochMintProvisionRequest();
    return message;
  },
};
function createBaseQueryEpochMintProvisionResponse(): QueryEpochMintProvisionResponse {
  return {
    epochMintProvision: DecCoin.fromPartial({}),
  };
}
export const QueryEpochMintProvisionResponse = {
  typeUrl: "/evmos.inflation.v1.QueryEpochMintProvisionResponse",
  encode(
    message: QueryEpochMintProvisionResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.epochMintProvision !== undefined) {
      DecCoin.encode(message.epochMintProvision, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEpochMintProvisionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochMintProvisionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochMintProvision = DecCoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryEpochMintProvisionResponse {
    const obj = createBaseQueryEpochMintProvisionResponse();
    if (isSet(object.epochMintProvision))
      obj.epochMintProvision = DecCoin.fromJSON(object.epochMintProvision);
    return obj;
  },
  toJSON(message: QueryEpochMintProvisionResponse): unknown {
    const obj: any = {};
    message.epochMintProvision !== undefined &&
      (obj.epochMintProvision = message.epochMintProvision
        ? DecCoin.toJSON(message.epochMintProvision)
        : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochMintProvisionResponse>, I>>(
    object: I,
  ): QueryEpochMintProvisionResponse {
    const message = createBaseQueryEpochMintProvisionResponse();
    if (object.epochMintProvision !== undefined && object.epochMintProvision !== null) {
      message.epochMintProvision = DecCoin.fromPartial(object.epochMintProvision);
    }
    return message;
  },
};
function createBaseQuerySkippedEpochsRequest(): QuerySkippedEpochsRequest {
  return {};
}
export const QuerySkippedEpochsRequest = {
  typeUrl: "/evmos.inflation.v1.QuerySkippedEpochsRequest",
  encode(_: QuerySkippedEpochsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySkippedEpochsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySkippedEpochsRequest();
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
  fromJSON(_: any): QuerySkippedEpochsRequest {
    const obj = createBaseQuerySkippedEpochsRequest();
    return obj;
  },
  toJSON(_: QuerySkippedEpochsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySkippedEpochsRequest>, I>>(_: I): QuerySkippedEpochsRequest {
    const message = createBaseQuerySkippedEpochsRequest();
    return message;
  },
};
function createBaseQuerySkippedEpochsResponse(): QuerySkippedEpochsResponse {
  return {
    skippedEpochs: BigInt(0),
  };
}
export const QuerySkippedEpochsResponse = {
  typeUrl: "/evmos.inflation.v1.QuerySkippedEpochsResponse",
  encode(message: QuerySkippedEpochsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.skippedEpochs !== BigInt(0)) {
      writer.uint32(8).uint64(message.skippedEpochs);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySkippedEpochsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySkippedEpochsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skippedEpochs = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySkippedEpochsResponse {
    const obj = createBaseQuerySkippedEpochsResponse();
    if (isSet(object.skippedEpochs)) obj.skippedEpochs = BigInt(object.skippedEpochs.toString());
    return obj;
  },
  toJSON(message: QuerySkippedEpochsResponse): unknown {
    const obj: any = {};
    message.skippedEpochs !== undefined &&
      (obj.skippedEpochs = (message.skippedEpochs || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QuerySkippedEpochsResponse>, I>>(
    object: I,
  ): QuerySkippedEpochsResponse {
    const message = createBaseQuerySkippedEpochsResponse();
    if (object.skippedEpochs !== undefined && object.skippedEpochs !== null) {
      message.skippedEpochs = BigInt(object.skippedEpochs.toString());
    }
    return message;
  },
};
function createBaseQueryCirculatingSupplyRequest(): QueryCirculatingSupplyRequest {
  return {};
}
export const QueryCirculatingSupplyRequest = {
  typeUrl: "/evmos.inflation.v1.QueryCirculatingSupplyRequest",
  encode(_: QueryCirculatingSupplyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCirculatingSupplyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCirculatingSupplyRequest();
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
  fromJSON(_: any): QueryCirculatingSupplyRequest {
    const obj = createBaseQueryCirculatingSupplyRequest();
    return obj;
  },
  toJSON(_: QueryCirculatingSupplyRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCirculatingSupplyRequest>, I>>(
    _: I,
  ): QueryCirculatingSupplyRequest {
    const message = createBaseQueryCirculatingSupplyRequest();
    return message;
  },
};
function createBaseQueryCirculatingSupplyResponse(): QueryCirculatingSupplyResponse {
  return {
    circulatingSupply: DecCoin.fromPartial({}),
  };
}
export const QueryCirculatingSupplyResponse = {
  typeUrl: "/evmos.inflation.v1.QueryCirculatingSupplyResponse",
  encode(
    message: QueryCirculatingSupplyResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.circulatingSupply !== undefined) {
      DecCoin.encode(message.circulatingSupply, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCirculatingSupplyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCirculatingSupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.circulatingSupply = DecCoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCirculatingSupplyResponse {
    const obj = createBaseQueryCirculatingSupplyResponse();
    if (isSet(object.circulatingSupply)) obj.circulatingSupply = DecCoin.fromJSON(object.circulatingSupply);
    return obj;
  },
  toJSON(message: QueryCirculatingSupplyResponse): unknown {
    const obj: any = {};
    message.circulatingSupply !== undefined &&
      (obj.circulatingSupply = message.circulatingSupply
        ? DecCoin.toJSON(message.circulatingSupply)
        : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCirculatingSupplyResponse>, I>>(
    object: I,
  ): QueryCirculatingSupplyResponse {
    const message = createBaseQueryCirculatingSupplyResponse();
    if (object.circulatingSupply !== undefined && object.circulatingSupply !== null) {
      message.circulatingSupply = DecCoin.fromPartial(object.circulatingSupply);
    }
    return message;
  },
};
function createBaseQueryInflationRateRequest(): QueryInflationRateRequest {
  return {};
}
export const QueryInflationRateRequest = {
  typeUrl: "/evmos.inflation.v1.QueryInflationRateRequest",
  encode(_: QueryInflationRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryInflationRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRateRequest();
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
  fromJSON(_: any): QueryInflationRateRequest {
    const obj = createBaseQueryInflationRateRequest();
    return obj;
  },
  toJSON(_: QueryInflationRateRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRateRequest>, I>>(_: I): QueryInflationRateRequest {
    const message = createBaseQueryInflationRateRequest();
    return message;
  },
};
function createBaseQueryInflationRateResponse(): QueryInflationRateResponse {
  return {
    inflationRate: "",
  };
}
export const QueryInflationRateResponse = {
  typeUrl: "/evmos.inflation.v1.QueryInflationRateResponse",
  encode(message: QueryInflationRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.inflationRate !== "") {
      writer.uint32(10).string(message.inflationRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryInflationRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inflationRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryInflationRateResponse {
    const obj = createBaseQueryInflationRateResponse();
    if (isSet(object.inflationRate)) obj.inflationRate = String(object.inflationRate);
    return obj;
  },
  toJSON(message: QueryInflationRateResponse): unknown {
    const obj: any = {};
    message.inflationRate !== undefined && (obj.inflationRate = message.inflationRate);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRateResponse>, I>>(
    object: I,
  ): QueryInflationRateResponse {
    const message = createBaseQueryInflationRateResponse();
    message.inflationRate = object.inflationRate ?? "";
    return message;
  },
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/evmos.inflation.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromJSON(_: any): QueryParamsRequest {
    const obj = createBaseQueryParamsRequest();
    return obj;
  },
  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({}),
  };
}
export const QueryParamsResponse = {
  typeUrl: "/evmos.inflation.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    const obj = createBaseQueryParamsResponse();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Period retrieves current period. */
  Period(request?: QueryPeriodRequest): Promise<QueryPeriodResponse>;
  /** EpochMintProvision retrieves current minting epoch provision value. */
  EpochMintProvision(request?: QueryEpochMintProvisionRequest): Promise<QueryEpochMintProvisionResponse>;
  /** SkippedEpochs retrieves the total number of skipped epochs. */
  SkippedEpochs(request?: QuerySkippedEpochsRequest): Promise<QuerySkippedEpochsResponse>;
  /**
   * CirculatingSupply retrieves the total number of tokens that are in
   * circulation (i.e. excluding unvested tokens).
   */
  CirculatingSupply(request?: QueryCirculatingSupplyRequest): Promise<QueryCirculatingSupplyResponse>;
  /** InflationRate retrieves the inflation rate of the current period. */
  InflationRate(request?: QueryInflationRateRequest): Promise<QueryInflationRateResponse>;
  /** Params retrieves the total set of minting parameters. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Period = this.Period.bind(this);
    this.EpochMintProvision = this.EpochMintProvision.bind(this);
    this.SkippedEpochs = this.SkippedEpochs.bind(this);
    this.CirculatingSupply = this.CirculatingSupply.bind(this);
    this.InflationRate = this.InflationRate.bind(this);
    this.Params = this.Params.bind(this);
  }
  Period(request: QueryPeriodRequest = {}): Promise<QueryPeriodResponse> {
    const data = QueryPeriodRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "Period", data);
    return promise.then((data) => QueryPeriodResponse.decode(new BinaryReader(data)));
  }
  EpochMintProvision(request: QueryEpochMintProvisionRequest = {}): Promise<QueryEpochMintProvisionResponse> {
    const data = QueryEpochMintProvisionRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "EpochMintProvision", data);
    return promise.then((data) => QueryEpochMintProvisionResponse.decode(new BinaryReader(data)));
  }
  SkippedEpochs(request: QuerySkippedEpochsRequest = {}): Promise<QuerySkippedEpochsResponse> {
    const data = QuerySkippedEpochsRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "SkippedEpochs", data);
    return promise.then((data) => QuerySkippedEpochsResponse.decode(new BinaryReader(data)));
  }
  CirculatingSupply(request: QueryCirculatingSupplyRequest = {}): Promise<QueryCirculatingSupplyResponse> {
    const data = QueryCirculatingSupplyRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "CirculatingSupply", data);
    return promise.then((data) => QueryCirculatingSupplyResponse.decode(new BinaryReader(data)));
  }
  InflationRate(request: QueryInflationRateRequest = {}): Promise<QueryInflationRateResponse> {
    const data = QueryInflationRateRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "InflationRate", data);
    return promise.then((data) => QueryInflationRateResponse.decode(new BinaryReader(data)));
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.inflation.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
}
